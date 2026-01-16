$schema = @"
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://igrs.online/#org",
      "name": "IGRS",
      "url": "https://igrs.online/",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "url": "https://igrs.online/contact",
          "availableLanguage": ["Japanese", "English"]
        }
      ],
      "areaServed": ["Japan", "Philippines"],
      "sameAs": ["https://twitter.com/GswCnxL7Sg15778"]
    },
    {
      "@type": "WebSite",
      "@id": "https://igrs.online/#website",
      "url": "https://igrs.online/",
      "name": "IGRS - フィリピン書類取得代行センター",
      "publisher": { "@id": "https://igrs.online/#org" },
      "inLanguage": "ja"
    }
  ]
}
</script>

"@

Get-ChildItem -Path "igrs-netlify" -Filter "*.html" | ForEach-Object {
  $content = Get-Content $_.FullName -Raw -Encoding UTF8
  if ($content -notmatch 'https://igrs\.online/#org') {
    $content = $content -replace '</head>', ($schema + "</head>")
    Set-Content -Path $_.FullName -Value $content -Encoding UTF8
    Write-Host ("Updated: " + $_.Name)
  } else {
    Write-Host ("Skipped: " + $_.Name)
  }
}