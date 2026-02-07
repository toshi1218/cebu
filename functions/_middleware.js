export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  let changed = false;

  // https force
  if (url.protocol !== "https:") {
    url.protocol = "https:";
    changed = true;
  }

  // www -> non-www
  if (url.hostname === "www.igrs.online") {
    url.hostname = "igrs.online";
    changed = true;
  }

  let p = url.pathname;

  // index.html -> /
  if (p === "/index.html" || p.endsWith("/index.html")) {
    p = p.replace(/\/index\.html$/, "/");
    if (p === "") p = "/";
    changed = true;
  }

  // .html -> remove (even if static file exists)
  if (p.endsWith(".html")) {
    p = p.slice(0, -5);
    if (p === "") p = "/";
    changed = true;
  }

  // trailing slash remove (except "/")
  if (p.length > 1 && p.endsWith("/")) {
    p = p.slice(0, -1);
    changed = true;
  }

  // legacy map (minimum)
  const legacyMap = {
    "/lto-driver-license": "/lto-drivers-license",
    "/psa-certificate": "/psa-birth-certificate",
    "/contact-us": "/contact",
    "/about-us": "/company",
    "/services.html": "/services",
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
