export async function onRequest(context) {
    const req = context.request;
    const url = new URL(req.url);

    // Skip middleware if already processed (prevents rewrite loop)
    if (req.headers.get('X-Middleware-Processed')) {
        return context.next();
    }

    // --- 0) 410 Gone paths
    const gone = new Set([
        "/services",
        "/services.html",
        "/services-v2",
        "/services-v2.html",
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

    // legacy slugs
    const legacyMap = {
        "/lto-driver-license": "/lto-drivers-license",
        "/psa-certificate": "/psa-birth-certificate",
        "/contact-us": "/contact",
        "/about-us": "/company",
        "/anshin-pack": "/personal",
        "/premium-package": "/personal",
    };
    if (legacyMap[p]) {
        p = legacyMap[p];
        changed = true;
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
