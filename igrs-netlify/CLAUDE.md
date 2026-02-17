# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML website for **igrs.online** (フィリピン書類取得代行センター — Philippine document procurement service). Japanese-language B2B site hosted on Netlify (Cloudflare Pages integration). No build step, no npm, no framework — pure HTML/CSS/JS.

## Architecture

**Zero-build static site.** All HTML pages live at the repository root. There is no compilation, bundling, or package manager.

### Key Directories
- `functions/` — Netlify edge middleware (`_middleware.js`)
- `partials/` — Shared header/footer HTML fragments loaded by `js/layout-inject.js`
- `js/` — Vanilla JS: analytics tracking, mobile detection, nav, layout injection
- `css/` — Layered stylesheets: `style.css` (main), plus mobile/page-specific variants
- `ci/baseline/` — CI baseline files
- `.github/workflows/` — Quality gate CI

### Middleware (`functions/_middleware.js`)
Single edge middleware handles all URL canonicalization in one hop:
1. 410 Gone for dead endpoints (`/services.js` etc.)
2. HTTPS enforcement
3. www → non-www redirect
4. `/index.html` → `/`, strip `.html` extensions, remove trailing slashes
5. Legacy slug redirects — **all redirect rules must live here** (not in `_redirects`), because middleware runs before `_redirects` on Cloudflare Pages
6. `decodeURIComponent` fallback for percent-encoded legacy URLs (旧Wix日本語パス)
7. Internal rewrite: extensionless URLs serve the corresponding `.html` file

All canonical changes produce a single 301 redirect (SEO best practice).

### Dynamic Header/Footer
`js/layout-inject.js` fetches `partials/header.html` and `partials/footer.html` into `#site-header` and `#site-footer` divs on each page. This avoids duplicating nav/footer markup across 20+ pages.

### GA4 Tracking
Pages use `data-ga` and `data-cta` attributes on elements for Google Analytics event tracking. Scripts: `js/cta-tracking.js`, `js/ga-events.js`.

## Quality Gate / CI

No traditional build, lint, or test commands. The CI quality gate runs via GitHub Actions on PRs to `master`:

```
# Runs automatically — no local command needed
# .github/workflows/quality-gate.yml
```

The gate validates:
- `sitemap.xml` exists and has valid XML with non-empty `<loc>` elements
- `contact.html` has no CSS leaking outside `<style>` tags or into `<title>`

There is no linter, formatter, or test runner configured.

## Deployment

- **master** — main development branch
- **production** — Cloudflare Pages deploys from this branch
- **Auto-deploy**: `.github/workflows/auto-deploy.yml` automatically merges `master` → `production` on every push to master, then runs SEO smoke tests against the live site
- No manual merge to `production` is needed — just merge PRs to `master`
- Config files at root: `_routes.json`, `_headers`, `_redirects`
- **`_redirects` is fallback only** — all redirect rules must also be in `functions/_middleware.js` (middleware runs first on Cloudflare Pages)

### Post-deploy verification
- `scripts/seo-smoke.sh` runs automatically after deploy (via `auto-deploy.yml`)
- Checks: www→non-www, .html stripping, robots.txt, sitemap.xml, legacy URL redirects

## Conventions

- Smallest diff wins. No style refactors unless requested.
- All canonical URLs use `https://igrs.online/` (no www, no `.html`, no trailing slash).
- Every HTML page must have a `<link rel="canonical">` tag and OG/Twitter meta tags.
- Structured data (JSON-LD) is embedded inline in pages that need it.
- The `sitemap.xml` lists all public pages (currently 26) and must stay in sync with actual pages.
- Every HTML page must have `<meta name="robots" content="index,follow" />`.
- Shell scripts (`*.sh`) and workflow files (`*.yml`) must use LF line endings (enforced by `.gitattributes`).
