param([string]$name)

$ErrorActionPreference = "Stop"

# Check GitHub Auth
gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] Not logged in to GitHub."
    Write-Host "Action: Run gh auth login first and stop here."
    exit 1
}

$timestamp = Get-Date -Format "MMdd-HHmm"
$branch = "ag/$timestamp"
if ($name) { $branch = "ag/$name" }

Write-Host "Shipping to $branch..."

try {
    # 0. Sync with Master
    Write-Host "Syncing with master..."
    git -C .. switch master
    git -C .. pull --ff-only origin master
    if ($LASTEXITCODE -ne 0) { throw "Master sync failed" }

    # 1. New Branch
    git -C .. checkout -b $branch
    if ($LASTEXITCODE -ne 0) { throw "Branch creation failed" }

    # 2. Commit
    if (git -C .. status --porcelain) {
        git -C .. add .
        git -C .. commit -m "update $timestamp"
        if ($LASTEXITCODE -ne 0) { throw "Commit failed" }
    }

    # 3. Push
    git -C .. push origin $branch
    if ($LASTEXITCODE -ne 0) { throw "Push failed" }

    # 4. PR
    gh pr create --base master --head $branch --title "ship: $branch" --body " "
    if ($LASTEXITCODE -ne 0) { throw "PR creation failed" }

    # Get PR number
    $prNumber = gh pr view --json number --jq '.number'
    
    # 5. Auto-Merge / Wait & Merge
    Write-Host "Attempting Auto-merge..."
    gh pr merge $prNumber --auto --squash --delete-branch 2>$null
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Auto-merge not enabled. Switching to Wait & Merge..."
        
        Write-Host "Waiting for Quality Gate..."
        gh pr checks $prNumber --watch
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[X] Gate Failed. Fix and Re-run."
            exit 1
        }
        
        Write-Host "Merging..."
        gh pr merge $prNumber --squash --delete-branch
        if ($LASTEXITCODE -ne 0) { throw "Merge failed" }
        
        Write-Host "Done! Merged."
    }
    else {
        Write-Host "Done! PR set to auto-merge."
    }
}
catch {
    Write-Host "Error: $_"
    Write-Host "Fix: Check error above. Manually run: git push -> gh pr create -> gh pr merge"
    exit 1
}
