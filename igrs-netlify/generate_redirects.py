
pages = [
    "anshin-pack.html",
    "blog.html",
    "blog-data-verification-guide.html",
    "blog-granway-compliance.html",
    "blog-nbi-hit-guide.html",
    "blog-philippines-documents-complexity.html",
    "blog-philippines-japan-international-marriage-documents-2026.html",
    "business.html",
    "cenomar.html",
    "company.html",
    "contact.html",
    "dfa-apostille.html",
    "gaimen-kirikae.html",
    "gyoseishoshi.html",
    "haigusha-visa.html",
    "kika-shinsei.html",
    "kokusai-kekkon.html",
    "lto-drivers-license.html",
    "lto-transaction-history.html",
    "marriage-certificate.html",
    "nbi-clearance.html",
    "personal.html",
    "philippine-marriage-doc-cost-comparison.html",
    "privacy.html",
    "psa-birth-certificate.html",
    "thank-you.html",
    "track.html",
    "translation.html"
]

redirects = []

# Legacy 410s
redirects.append("/services / 410")
redirects.append("/services.html / 410")
redirects.append("/services-v2 / 410")
redirects.append("/services-v2.html / 410")
redirects.append("")

# Legacy Custom Redirects (Legacy URLs to current Canonical)
redirects.append("# Custom Legacy Redirects (Explicit 1-hop)")
redirects.append("/lto-driver-license.html https://igrs.online/lto-drivers-license 301")
redirects.append("/lto-driver-license https://igrs.online/lto-drivers-license 301")
redirects.append("/psa-certificate.html https://igrs.online/psa-birth-certificate 301")
redirects.append("/psa-certificate https://igrs.online/psa-birth-certificate 301")
redirects.append("/contact-us https://igrs.online/contact 301")
redirects.append("/about-us https://igrs.online/company 301")
redirects.append("")

# Explicit Rules for Core Pages (To ensure 1-hop)
redirects.append("# Explicit Canonicalization for Core Pages (1-hop guaranteed)")

# Index specific
redirects.append("http://www.igrs.online/index.html https://igrs.online/ 301")
redirects.append("http://igrs.online/index.html https://igrs.online/ 301")
redirects.append("https://www.igrs.online/index.html https://igrs.online/ 301")
redirects.append("https://igrs.online/index.html https://igrs.online/ 301")
redirects.append("http://www.igrs.online/ https://igrs.online/ 301")
redirects.append("https://www.igrs.online/ https://igrs.online/ 301")

for page in pages:
    slug = page.replace(".html", "")
    # http + www + .html
    redirects.append(f"http://www.igrs.online/{page} https://igrs.online/{slug} 301")
    # http + non-www + .html
    redirects.append(f"http://igrs.online/{page} https://igrs.online/{slug} 301")
    # https + www + .html
    redirects.append(f"https://www.igrs.online/{page} https://igrs.online/{slug} 301")
    # https + .html (Local/Internal link cleanup)
    redirects.append(f"/{page} https://igrs.online/{slug} 301")

redirects.append("")
redirects.append("# General Fallback Rules (For new pages or missed files)")
redirects.append("# 2. http + www -> https + root")
redirects.append("http://www.igrs.online/* https://igrs.online/:splat 301")
redirects.append("# 4. http -> https")
redirects.append("http://igrs.online/* https://igrs.online/:splat 301")
redirects.append("# 6. https + www -> https + root")
redirects.append("https://www.igrs.online/* https://igrs.online/:splat 301")
redirects.append("# 7. match .html extensions generally")
redirects.append("/*.html /:splat 301")

print("\n".join(redirects))
