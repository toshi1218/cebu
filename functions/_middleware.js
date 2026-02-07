export async function onRequest(context) {
    const req = context.request;
    const url = new URL(req.url);

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

    // .html -> remove
    if (p.endsWith(".html")) {
        p = p.slice(0, -5) || "/";
        changed = true;
    }

    // NOTE:
    // Do NOT force-remove trailing slash globally.
    // Cloudflare Pages may canonicalize real directories (e.g. /personal -> /personal/)
    // before this middleware, while this middleware used to canonicalize /personal/ -> /personal.
    // That opposite behavior can create a redirect loop in production.

    // legacy slugs
    const legacyMap = {
        "/lto-driver-license": "/lto-drivers-license",
        "/psa-certificate": "/psa-birth-certificate",
        "/contact-us": "/contact",
        "/about-us": "/company",
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

    // 5) Internal rewrite for static HTML on Cloudflare Pages
    //    /slug   -> /slug.html
    //    /slug/  -> /slug.html
    const path = url.pathname;
    const isExtensionless = !path.includes(".");
    if (path !== "/" && isExtensionless) {
        const rewriteUrl = new URL(url.toString());
        const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
        rewriteUrl.pathname = `${normalizedPath}.html`;
        const rewriteReq = new Request(rewriteUrl.toString(), req);
        return context.next(rewriteReq);
    }

    return context.next();
}
