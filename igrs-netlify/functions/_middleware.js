export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);

    let changed = false;

    // 1. www -> non-www
    if (url.hostname === "www.igrs.online") {
        url.hostname = "igrs.online";
        changed = true;
    }

    let p = url.pathname;

    // 2. index.html -> parent /
    if (p === "/index.html" || p.endsWith("/index.html")) {
        p = p.replace(/\/index\.html$/, "/");
        if (p === "") p = "/";
        changed = true;
    }

    // 3. .html -> remove
    if (p.endsWith(".html")) {
        p = p.slice(0, -5);
        if (p === "") p = "/";
        changed = true;
    }

    // 4. trailing slash remove (except "/")
    if (p.length > 1 && p.endsWith("/")) {
        p = p.slice(0, -1);
        changed = true;
    }

    // 5. legacy slug map
    const legacyMap = {
        "/lto-driver-license": "/lto-drivers-license",
        "/psa-certificate": "/psa-birth-certificate",
        "/contact-us": "/contact",
        "/about-us": "/company",
        "/pages-sitemap.xml": "/sitemap.xml",
    };
    if (legacyMap[p]) {
        p = legacyMap[p];
        changed = true;
    }

    if (changed) {
        url.pathname = p;
        return Response.redirect(url.toString(), 301);
    }

    return next();
}
