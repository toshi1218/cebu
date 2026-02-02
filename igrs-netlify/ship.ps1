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
<<<<<<< HEAD
    # 0. Sync with Master (Robust)
    Write-Host "Syncing with master..."
    try {
        git -C .. switch master 2>$null
        if ($LASTEXITCODE -ne 0) { throw "Switch failed" }
        git -C .. pull --ff-only origin master
    }
    catch {
        Write-Host "Warning: Could not switch to master (dirty?). Proceeding from current branch."
    }

    # 1. New Branch
=======
    # 0. Sync with Master
    Write-Host "Syncing with master..."
    git -C .. switch master
    git -C .. pull --ff-only origin master
    if ($LASTEXITCODE -ne 0) { throw "Master sync failed" }

<<<<<<< HEAD
    # 1. New Branch (from current state)
    # Use -C .. to execute git commands from the repository root
>>>>>>> origin/ag/0201-0312
=======
    # 1. New Branch
>>>>>>> origin/ag/0201-0319
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
<<<<<<< HEAD
    try {
        gh pr merge $prNumber --auto --squash --delete-branch
        if ($LASTEXITCODE -ne 0) { throw "Auto-merge failed" }
        Write-Host "Done! PR set to auto-merge."
    }
    catch {
        Write-Host "Auto-merge disabled/failed. Switching to Wait & Merge..."
        
        Write-Host "Waiting for Quality Gate..."
        gh pr checks $prNumber --watch
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Gate Failed. Fix and Re-run."
            exit 1
        }
        
        Write-Host "Merging..."
        gh pr merge $prNumber --squash --delete-branch
        if ($LASTEXITCODE -ne 0) { throw "Merge failed" }
        
        Write-Host "Done! Merged."
=======
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
>>>>>>> origin/ag/0201-0319
    }
}
catch {
    Write-Host "Error: $_"
    Write-Host "Fix: Check error above. Manually run: git push -> gh pr create -> gh pr merge"
    exit 1
}
