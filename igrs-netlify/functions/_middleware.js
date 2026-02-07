
export async function onRequest(context) {
    const url = new URL(context.request.url);
    let { protocol, hostname, pathname, search } = url;

    let redirect = false;

    // 1. Force HTTPS
    if (protocol === 'http:') {
        protocol = 'https:';
        redirect = true;
    }

    // 2. Remove WWW
    if (hostname === 'www.igrs.online') {
        hostname = 'igrs.online';
        redirect = true;
    }

    // 3. Remove .html
    if (pathname.endsWith('.html')) {
        pathname = pathname.slice(0, -5);
        redirect = true;
    }

    // 4. Legacy mappings
    const legacyMap = {
        '/lto-driver-license': '/lto-drivers-license',
        '/psa-certificate': '/psa-birth-certificate',
        '/contact-us': '/contact',
        '/about-us': '/company'
    };

    if (legacyMap[pathname]) {
        pathname = legacyMap[pathname];
        redirect = true;
    }

    if (redirect) {
        const newUrl = `${protocol}//${hostname}${pathname}${search}`;
        return Response.redirect(newUrl, 301);
    }

    return context.next();
}
