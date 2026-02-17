#!/usr/bin/env bash
# SEO smoke test — verifies canonical URL behaviour after deploy.
# Exits non-zero on first failure so CI stops immediately.
set -euo pipefail

CANONICAL="${CANONICAL:-https://igrs.online}"
WWW_URL="${WWW_URL:-https://www.igrs.online/}"
CURL_TIMEOUT="${CURL_TIMEOUT:-15}"

curl_final() {
  curl -sS -L --max-redirs 10 --connect-timeout "$CURL_TIMEOUT" \
    -o /dev/null -w "%{http_code} %{url_effective}" "$1"
}

curl_head_code() {
  curl -sS -I --max-redirs 0 --connect-timeout "$CURL_TIMEOUT" \
    -o /dev/null -w "%{http_code}" "$1" || true
}

# check_redirect: first hop must be 3xx
check_redirect() {
  local url="$1" code
  code="$(curl_head_code "$url")"
  case "$code" in
    301|302|307|308) echo "OK: $url -> initial $code" ;;
    *) echo "FAIL: $url -> $code (expected 3xx redirect)"; exit 1 ;;
  esac
}

# check_final: follow redirects, verify final code + URL prefix
check_final() {
  local url="$1" expect_code="$2" expect_prefix="$3"
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

echo "=== SEO smoke test ==="
echo "Canonical: $CANONICAL"

# 1) www -> non-www redirect
check_redirect "$WWW_URL"
check_final    "$WWW_URL" "200" "${CANONICAL}/"

# 2) /index.html -> / redirect
check_redirect "${CANONICAL}/index.html"
check_final    "${CANONICAL}/index.html" "200" "${CANONICAL}/"

# 3) robots.txt reachable
check_final "${CANONICAL}/robots.txt"    "200" "${CANONICAL}/robots.txt"

# 4) sitemap.xml reachable
check_final "${CANONICAL}/sitemap.xml"   "200" "${CANONICAL}/sitemap.xml"

# 5) Legacy Wix JP URLs redirect (spot check)
check_redirect "${CANONICAL}/%E6%A6%82%E8%A6%81"
check_final    "${CANONICAL}/%E6%A6%82%E8%A6%81" "200" "${CANONICAL}/company"

# 6) /services -> /personal (not 410)
check_redirect "${CANONICAL}/services"
check_final    "${CANONICAL}/services" "200" "${CANONICAL}/personal"

echo "=== All checks passed ==="
