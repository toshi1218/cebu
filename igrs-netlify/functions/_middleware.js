export async function onRequest(context) {
    const req = context.request;
    const url = new URL(req.url);

    // Skip middleware if already processed (prevents rewrite loop)
    if (req.headers.get('X-Middleware-Processed')) {
        return context.next();
    }

    // --- 0) 410 Gone paths (only truly dead endpoints with no replacement)
    const gone = new Set([
        "/services.js",
        "/services.html.js",
    ]);
    if (gone.has(url.pathname)) {
        return new Response("Gone", { status: 410 });
    }

    let changed = false;

    // 1) Force HTTPS
    if (url.protocol !== "https:") {
        url.protocol = "https:";
        changed = true;
    }

    // 2) Remove www
    if (url.hostname === "www.igrs.online") {
        url.hostname = "igrs.online";
        changed = true;
    }

    // 3) Normalize path
    let p = url.pathname;

    // index.html -> /
    if (p === "/index.html" || p.endsWith("/index.html")) {
        p = p.replace(/\/index\.html$/, "/") || "/";
        changed = true;
    }

    // .html -> strip extension (301 redirect to clean URL)
    // The internal rewrite in step 5 adds .html back transparently;
    // X-Middleware-Processed header prevents re-processing the rewritten request.
    if (p.endsWith(".html")) {
        p = p.slice(0, -5) || "/";
        changed = true;
    }

    // trailing slash remove (except "/")
    if (p.length > 1 && p.endsWith("/")) {
        p = p.slice(0, -1);
        changed = true;
    }

    // legacy slugs — includes old English paths + Wix Japanese paths
    // NOTE: _redirects is NOT evaluated when middleware handles the request,
    //       so ALL redirect rules must live here.
    const legacyMap = {
        // English legacy
        "/lto-driver-license": "/lto-drivers-license",
        "/psa-certificate": "/psa-birth-certificate",
        "/contact-us": "/contact",
        "/about-us": "/company",
        "/about": "/company",
        "/services": "/personal",
        "/services-v2": "/personal",
        "/privacy-policy": "/privacy",
        "/anshin-pack": "/personal",
        "/premium-package": "/personal",
        "/kika_v2": "/kika-shinsei",
        // Wix Japanese paths (raw Unicode)
        "/\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8": "/company",
        "/\u6982\u8981": "/company",
        "/\u304A\u554F\u3044\u5408\u308F\u305B": "/contact",
        "/\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC": "/privacy",
        "/\u30D6\u30ED\u30B0": "/blog",
        "/\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB": "/company",
        "/\u30B5\u30FC\u30D3\u30B9\u5185\u5BB9\uFF0F\u6599\u91D1": "/personal",
        "/\u8A2D\u5B9A": "/",
        "/\u901A\u77E5": "/",
    };
    // Try lookup with raw path first, then decoded (for %E6%A6%82%E8%A6%81 → 概要 etc.)
    if (legacyMap[p]) {
        p = legacyMap[p];
        changed = true;
    } else {
        try {
            const decoded = decodeURIComponent(p);
            if (decoded !== p && legacyMap[decoded]) {
                p = legacyMap[decoded];
                changed = true;
            }
        } catch (e) { /* malformed URI — ignore */ }
    }

    // 4) If any canonical change is needed -> 301 (1 hop)
    if (changed) {
        url.pathname = p;
        return Response.redirect(url.toString(), 301);
    }

    // 5) Internal rewrite: /slug -> serve /slug.html (browser URL stays /slug)
    const path = url.pathname;
    const isExtensionless = !path.includes(".");
    if (path !== "/" && isExtensionless) {
        const rewriteUrl = new URL(url.toString());
        rewriteUrl.pathname = `${path}.html`;
        const headers = new Headers(req.headers);
        headers.set('X-Middleware-Processed', 'true');
        const rewriteReq = new Request(rewriteUrl.toString(), {
            method: req.method,
            headers: headers,
            body: req.body,
        });
        return context.next(rewriteReq);
    }

    return context.next();
}
