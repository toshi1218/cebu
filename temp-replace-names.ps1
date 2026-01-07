$content = [System.IO.File]::ReadAllText("C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\privacy.html", [System.Text.Encoding]::UTF8)
$content = $content.Replace('代表取締役　五十嵐俊之', '株式会社IGRS')
[System.IO.File]::WriteAllText("C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\privacy.html", $content, [System.Text.UTF8Encoding]::new($false))

$content2 = [System.IO.File]::ReadAllText("C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\company.html", [System.Text.Encoding]::UTF8)
$content2 = $content2.Replace('"founder": {
          "@type": "Person",
          "name": "五十嵐 俊之"
        },', '')
[System.IO.File]::WriteAllText("C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\company.html", $content2, [System.Text.UTF8Encoding]::new($false))

Write-Host "All replacements completed successfully"
