
export async function onRequest(context) {
    const url = new URL(context.request.url);
    const { pathname, search, protocol, hostname } = url;

    // Skip non-GET/HEAD requests
    // HEAD requests are handled by Cloudflare automatically for GET, but good to be explicit for middleware?
    // User code explicitly allows GET and HEAD.
    if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
        return context.next();
    }

    let needsRedirect = false;
    let newProtocol = protocol;
    let newHostname = hostname;
    let newPathname = pathname;

    // 1. Force HTTPS
    if (protocol === 'http:') {
        newProtocol = 'https:';
        needsRedirect = true;
    }

    // 2. Remove WWW
    if (hostname === 'www.igrs.online') {
        newHostname = 'igrs.online';
        needsRedirect = true;
    }

    // 3. Remove .html extension
    if (newPathname.endsWith('/index.html')) {
        newPathname = newPathname.substring(0, newPathname.length - 10) || '/';
        needsRedirect = true;
    } else if (newPathname.endsWith('.html')) {
        newPathname = newPathname.substring(0, newPathname.length - 5);
        needsRedirect = true;
    }

    // 4. Legacy URL mappings
    // Map OLD path (WITHOUT .html if already stripped, or WITH .html if strictly matching?)
    // The logic below: `if (newPathname === oldPath || newPathname === oldPath + '.html')`
    // `newPathname` at this point has `.html` stripped by step 3.
    // So if original was `/lto-driver-license.html`, step 3 made it `/lto-driver-license`.
    // `oldPath` in map is `/lto-driver-license`.
    // So `newPathname === oldPath` will match.
    // If original was `/lto-driver-license` (no extension), step 3 did nothing.
    // `newPathname` is `/lto-driver-license`. Match.

    // Wait, legacy map keys in user prompt:
    // '/lto-driver-license': '/lto-drivers-license'
    // My check `newPathname === oldPath` covers `/lto-driver-license` (stripped or raw).

    const legacyMap = {
        '/lto-driver-license': '/lto-drivers-license',
        '/psa-certificate': '/psa-birth-certificate',
        '/contact-us': '/contact',
        '/about-us': '/company'
    };

    // Optimization: Direct lookup might be faster than iteration, but iteration with 4 items is negligible.
    // Code follows user prompt exactly.

    for (const [oldPath, newPath] of Object.entries(legacyMap)) {
        // Check if current path matches old path or old path + .html 
        // (Though step 3 already stripped .html, so usually just oldPath is enough if we trust step 3)
        // Actually, if step 3 runs, newPathname doesn't have .html.
        // So the check `newPathname === oldPath + '.html'` is redundant but harmless.
        if (newPathname === oldPath || newPathname === oldPath + '.html') {
            newPathname = newPath;
            needsRedirect = true;
            break;
        }
    }

    if (needsRedirect) {
        // Construct final URL
        // Ensure we don't double slash if newPathname starts with /
        // URL constructor handles protocol/host, but we are building string.
        // template: `${newProtocol}//${newHostname}${newPathname}${search}`
        // newProtocol has : (e.g. 'https:')
        // newHostname is 'igrs.online'
        // newPathname starts with / (e.g. '/blog')
        // search includes ? (e.g. '?foo=bar') or empty
        const finalUrl = `${newProtocol}//${newHostname}${newPathname}${search}`;
        return Response.redirect(finalUrl, 301);
    }

    return context.next();
}
