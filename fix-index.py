import re

# Read the file
with open(r'C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the line with streetAddress
content = re.sub(r'\s*"streetAddress":\s*"新高町2-13",\s*\n', '', content)

# Write back
with open(r'C:\Users\toshiyuki\.gemini\antigravity\scratch\cebu-claude-igrs-code-review-5tzax\igrs-netlify\index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Successfully removed streetAddress from index.html")
