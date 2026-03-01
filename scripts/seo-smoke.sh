#!/usr/bin/env bash
# SEO smoke test — verifies canonical URL behaviour after deploy.
# Exits non-zero on first failure so CI stops immediately.
set -euo pipefail

CANONICAL="${CANONICAL:-https://igrs.online}"
CURL_TIMEOUT="${CURL_TIMEOUT:-15}"

curl_final() {
  curl -sS -L --max-redirs 10 --connect-timeout "$CURL_TIMEOUT" \
    -o /dev/null -w "%{http_code} %{url_effective}" "$1"
}

# check_final: follow redirects, verify final code + URL prefix
check_final() {
  local url="$1" expect_code="$2" expect_prefix="${3:-}"
  local out code effective
  out="$(curl_final "$url")"
  code="$(awk '{print $1}' <<<"$out")"
  effective="$(awk '{print $2}' <<<"$out")"
  if [[ "$code" != "$expect_code" ]]; then
    echo "FAIL: $url -> $code (expected $expect_code) final=$effective"
    exit 1
  fi
  if [[ -n "$expect_prefix" && "$effective" != "$expect_prefix"* ]]; then
    echo "FAIL: $url -> final=$effective (expected prefix $expect_prefix)"
    exit 1
  fi
  echo "OK: $url -> $code $effective"
}

echo "=== SEO smoke test (Astro B2B site) ==="
echo "Canonical: $CANONICAL"

# 1) Root redirects to /ja/
check_final "${CANONICAL}/" "200" "${CANONICAL}/ja/"

# 2) Japanese pages
check_final "${CANONICAL}/ja/"         "200" ""
check_final "${CANONICAL}/ja/services" "200" ""
check_final "${CANONICAL}/ja/about"    "200" ""
check_final "${CANONICAL}/ja/contact"  "200" ""

# 3) English pages
check_final "${CANONICAL}/en/"         "200" ""
check_final "${CANONICAL}/en/services" "200" ""
check_final "${CANONICAL}/en/about"    "200" ""
check_final "${CANONICAL}/en/contact"  "200" ""

# 4) robots.txt reachable
check_final "${CANONICAL}/robots.txt"  "200" "${CANONICAL}/robots.txt"

# 5) sitemap.xml reachable
check_final "${CANONICAL}/sitemap.xml" "200" "${CANONICAL}/sitemap.xml"

echo "=== All checks passed ==="
