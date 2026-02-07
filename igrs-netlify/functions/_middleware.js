
export async function onRequest(context) {
    const url = new URL(context.request.url);
    const { pathname, search, protocol, hostname } = url;

    // Define canonical host
    const canonicalHost = 'igrs.online';

    // Logic: Combine all redirects into one step
    let shouldRedirect = false;
    let newProtocol = protocol;
    let newHostname = hostname;
    let newPathname = pathname;

    // 1. Force HTTPS
    if (protocol === 'http:') {
        newProtocol = 'https:';
        shouldRedirect = true;
    }

    // 2. Remove WWW (Canonical Host)
    if (hostname === 'www.igrs.online') {
        newHostname = canonicalHost;
        shouldRedirect = true;
    }

    // 3. Remove .html extension (Generic Strip)
    // Skip for non-GET requests to avoid data loss
    if (context.request.method === 'GET' || context.request.method === 'HEAD') {
        if (pathname.endsWith('/index.html')) {
            newPathname = pathname.substring(0, pathname.length - 10);
            if (newPathname === '') newPathname = '/';
            shouldRedirect = true;
        } else if (pathname.endsWith('.html')) {
            newPathname = pathname.substring(0, pathname.length - 5);
            shouldRedirect = true;
        }
    }

    // Construct new URL
    if (shouldRedirect) {
        // Avoid double slashes if any
        const finalUrl = `${newProtocol}//${newHostname}${newPathname}${search}`;
        return Response.redirect(finalUrl, 301);
    }

    return context.next();
}
