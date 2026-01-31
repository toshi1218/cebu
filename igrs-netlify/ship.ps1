param([string]$name)

$ErrorActionPreference = "Stop"

# Check GitHub Auth
gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to GitHub."
    Write-Host "👉 Action: Run 'gh auth login' first and stop here."
    exit 1
}

$timestamp = Get-Date -Format "MMdd-HHmm"
$branch = "ag/$timestamp"
if ($name) { $branch = "ag/$name" }

Write-Host "🚀 Shipping to $branch..."

try {
    # 1. New Branch
    git checkout -b $branch
    if ($LASTEXITCODE -ne 0) { throw "Branch creation failed" }

    # 2. Commit (if changes exist)
    if (git status --porcelain) {
        git add .
        git commit -m "Update $timestamp"
        if ($LASTEXITCODE -ne 0) { throw "Commit failed" }
    }

    # 3. Push
    git push origin $branch
    if ($LASTEXITCODE -ne 0) { throw "Push failed" }

    # 4. PR
    # Use specific title and body=" " to avoid errors
    gh pr create --base master --head $branch --title "Update $timestamp" --body " "
    if ($LASTEXITCODE -ne 0) { throw "PR creation failed" }

    # 5. Auto-Merge
    gh pr merge --auto --merge
    if ($LASTEXITCODE -ne 0) { throw "Auto-merge set failed" }

    Write-Host "✅ Done! PR set to auto-merge."
}
catch {
    Write-Host "❌ Error: $_"
    Write-Host "👉 Fix: Check error above. Manually run: git push -> gh pr create -> gh pr merge"
    exit 1
}
