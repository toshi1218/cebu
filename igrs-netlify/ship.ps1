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
    # 1. New Branch (from current state)
    # Use -C .. to execute git commands from the repository root
    git -C .. checkout -b $branch
    if ($LASTEXITCODE -ne 0) { throw "Branch creation failed" }

    # 2. Commit (if changes exist)
    if (git -C .. status --porcelain) {
        git -C .. add .
        git -C .. commit -m "Update $timestamp"
        if ($LASTEXITCODE -ne 0) { throw "Commit failed" }
    }

    # 3. Push
    git -C .. push origin $branch
    if ($LASTEXITCODE -ne 0) { throw "Push failed" }

    # 4. PR
    # gh automatically detects the repository root
    gh pr create --base master --head $branch --title "ship: $branch" --body " "
    if ($LASTEXITCODE -ne 0) { throw "PR creation failed" }

    # 5. Auto-Merge
    # Try multiple merge strategies or just use --merge. 
    # Warning: This requires 'Allow auto-merge' to be enabled in repo settings.
    gh pr merge --auto --merge --delete-branch
    if ($LASTEXITCODE -ne 0) { 
        Write-Host "⚠️ Auto-merge failed (Repo settings might disable it). Continuing..." 
    }
    else {
        Write-Host "✅ Done! PR set to auto-merge."
    }
}
catch {
    Write-Host "❌ Error: $_"
    Write-Host "👉 Fix: Check error above. Manually run: git push -> gh pr create -> gh pr merge"
    exit 1
}
