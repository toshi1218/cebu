# IGRS.online 技術検証スクリプト
# 実行方法: PowerShellでこのファイルを実行
# 所要時間: 約1分

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "IGRS.online インデックス可能性検証" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# A) noindex検証
Write-Host "【A】noindex検証（5ページ）" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow

$pages = @(
    @{Name = "トップページ"; Url = "https://igrs.online/" },
    @{Name = "/personal"; Url = "https://igrs.online/personal" },
    @{Name = "/business"; Url = "https://igrs.online/business" },
    @{Name = "/cenomar"; Url = "https://igrs.online/cenomar" },
    @{Name = "/contact"; Url = "https://igrs.online/contact" }
)

$noindexErrors = 0
foreach ($page in $pages) {
    Write-Host "$($page.Name)..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $page.Url -UseBasicParsing -ErrorAction Stop
        
        $hasMetaNoindex = $response.Content -match 'name="robots"\s+content="[^"]*noindex'
        $hasHeaderNoindex = $response.Headers['X-Robots-Tag'] -match 'noindex'
        
        if ($hasMetaNoindex -or $hasHeaderNoindex) {
            Write-Host " ❌ NG (noindex検出)" -ForegroundColor Red
            $noindexErrors++
        }
        else {
            Write-Host " ✅ OK" -ForegroundColor Green
        }
    }
    catch {
        Write-Host " ❌ エラー" -ForegroundColor Red
        $noindexErrors++
    }
}

Write-Host ""

# B) canonical検証
Write-Host "【B】canonical検証（自己参照＆非www）" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow

$canonicalPages = @(
    @{Name = "トップページ"; Url = "https://igrs.online/"; Expected = "https://igrs.online/" },
    @{Name = "/personal"; Url = "https://igrs.online/personal"; Expected = "https://igrs.online/personal" },
    @{Name = "/cenomar"; Url = "https://igrs.online/cenomar"; Expected = "https://igrs.online/cenomar" }
)

$canonicalErrors = 0
foreach ($page in $canonicalPages) {
    Write-Host "$($page.Name)..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $page.Url -UseBasicParsing -ErrorAction Stop
        
        if ($response.Content -match 'link rel="canonical"\s+href="([^"]+)"') {
            $canonical = $matches[1]
            if ($canonical -eq $page.Expected) {
                Write-Host " ✅ OK ($canonical)" -ForegroundColor Green
            }
            else {
                Write-Host " ❌ NG (期待: $($page.Expected), 実際: $canonical)" -ForegroundColor Red
                $canonicalErrors++
            }
        }
        else {
            Write-Host " ❌ NG (canonical なし)" -ForegroundColor Red
            $canonicalErrors++
        }
    }
    catch {
        Write-Host " ❌ エラー" -ForegroundColor Red
        $canonicalErrors++
    }
}

Write-Host ""

# C) sitemap検証
Write-Host "【C】sitemap検証（410/404混入チェック）" -ForegroundColor Yellow
Write-Host "----------------------------------------" -ForegroundColor Yellow

try {
    $sitemap = Invoke-WebRequest -Uri "https://igrs.online/sitemap.xml" -UseBasicParsing -ErrorAction Stop
    $urls = [regex]::Matches($sitemap.Content, '<loc>(https://[^<]+)</loc>') | ForEach-Object { $_.Groups[1].Value }
    
    Write-Host "Sitemap内URL数: $($urls.Count)" -ForegroundColor Cyan
    
    $sitemapErrors = 0
    foreach ($url in $urls) {
        Write-Host "  $url..." -NoNewline
        try {
            $status = (Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -ErrorAction Stop).StatusCode
            if ($status -eq 404 -or $status -eq 410) {
                Write-Host " ❌ $status" -ForegroundColor Red
                $sitemapErrors++
            }
            else {
                Write-Host " ✅ $status" -ForegroundColor Green
            }
        }
        catch {
            Write-Host " ❌ エラー" -ForegroundColor Red
            $sitemapErrors++
        }
    }
}
catch {
    Write-Host "❌ sitemap.xml取得エラー" -ForegroundColor Red
    $sitemapErrors = 999
}

Write-Host ""

# 最終結果
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "検証結果サマリー" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($noindexErrors -eq 0) {
    Write-Host "【A】noindex検証: ✅ 合格（0件のエラー）" -ForegroundColor Green
}
else {
    Write-Host "【A】noindex検証: ❌ 不合格（$noindexErrors 件のエラー）" -ForegroundColor Red
}

if ($canonicalErrors -eq 0) {
    Write-Host "【B】canonical検証: ✅ 合格（0件のエラー）" -ForegroundColor Green
}
else {
    Write-Host "【B】canonical検証: ❌ 不合格（$canonicalErrors 件のエラー）" -ForegroundColor Red
}

if ($sitemapErrors -eq 0) {
    Write-Host "【C】sitemap検証: ✅ 合格（0件のエラー）" -ForegroundColor Green
}
else {
    Write-Host "【C】sitemap検証: ❌ 不合格（$sitemapErrors 件のエラー）" -ForegroundColor Red
}

Write-Host ""

$totalErrors = $noindexErrors + $canonicalErrors + $sitemapErrors
if ($totalErrors -eq 0) {
    Write-Host "🎉 すべての検証に合格しました！" -ForegroundColor Green
    Write-Host "インデックス登録の技術的な障害はゼロです。" -ForegroundColor Green
    Write-Host "GSCでサイトマップ送信とインデックス登録リクエストを実行してください。" -ForegroundColor Green
}
else {
    Write-Host "⚠️ $totalErrors 件のエラーが検出されました。" -ForegroundColor Red
    Write-Host "技術担当に連絡して修正してください。" -ForegroundColor Red
}

Write-Host ""
Write-Host "検証完了: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
