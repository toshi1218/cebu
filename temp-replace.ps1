$content = [System.IO.File]::ReadAllText("C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\company.html", [System.Text.Encoding]::UTF8)
$content = $content.Replace('"streetAddress": "新高町2-13"', '"streetAddress": ""')
[System.IO.File]::WriteAllText("C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\company.html", $content, [System.Text.UTF8Encoding]::new($false))
Write-Host "Replacement completed successfully"
