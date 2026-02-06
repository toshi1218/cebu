# IGRS.online Google Search Console 仕上げマニュアル
**作成日**: 2026年2月6日  
**対象**: CEO（GSC操作担当者）  
**所要時間**: 3分

---

## ✅ 3分で終わるチェックリスト

```
□ 1. GSCにログイン（https://search.google.com/search-console）
□ 2. プロパティ「igrs.online」を選択
□ 3. サイトマップを送信（sitemap.xml）
□ 4. 主要19URLのインデックス登録リクエスト
□ 5. ページレポートで未登録理由を確認
□ 6. 完了
```

---

## 📋 GSC操作手順（クリック順）

### ステップ1: プロパティ選択

1. Google Search Console（https://search.google.com/search-console）を開く
2. 画面左上のプロパティ選択ドロップダウンをクリック
3. **「igrs.online」**を選択
   - ドメインプロパティ（`igrs.online`）または URLプレフィックス（`https://igrs.online`）のどちらでもOK
   - 両方ある場合は「ドメインプロパティ」を推奨

---

### ステップ2: サイトマップ送信

1. 画面左側のメニューから**「サイトマップ」**をクリック
2. 「新しいサイトマップの追加」欄に **`sitemap.xml`** と入力
3. **「送信」**ボタンをクリック
4. 送信完了後、以下を確認：
   - **ステータス**: 「成功しました」（緑色のチェックマーク）
   - **最終読み込み**: 日時が表示される（数分〜数時間かかる場合あり）
   - **検出されたURL**: 18（sitemap内のURL数）

**⚠️ 注意**:
- 「取得できませんでした」と表示された場合 → 5分待って再送信
- 「見つかりませんでした」と表示された場合 → URLを `sitemap.xml` と再確認

---

### ステップ3: URL検査 → インデックス登録リクエスト

以下の19URLを**順番に**処理してください。

#### 処理手順（各URLで繰り返し）:

1. 画面上部の検索バー（「URLを検査」）に以下のURLを1つずつ貼り付け
2. **Enterキー**を押す
3. 数秒待つと結果が表示される
4. 結果に応じて以下のいずれかを実行：

---

#### パターンA: 「URLがGoogleに登録されていません」

**表示内容**:
```
URLがGoogleに登録されていません
クロール済み - 現在未登録
```

**対処**:
1. **「インデックス登録をリクエスト」**ボタンをクリック
2. 「公開URLをテストしています...」と表示される（1〜2分）
3. 「インデックス登録をリクエスト済み」と表示されたら完了
4. 次のURLへ進む

---

#### パターンB: 「URLはGoogleに登録されています」

**表示内容**:
```
URLはGoogleに登録されています
カバレッジ: 送信して登録されました
```

**対処**:
1. 何もしない（既にインデックス済み）
2. 次のURLへ進む

---

#### パターンC: 「重複しています。ユーザーにより、正規ページとして選択されていません」

**表示内容**:
```
重複しています。ユーザーにより、正規ページとして選択されていません
Googleが選択した正規URL: https://igrs.online/xxx
```

**対処**:
1. 「Googleが選択した正規URL」を確認
2. もし正規URLが `https://www.igrs.online/xxx`（wwwあり）の場合:
   - **何もしない**（現在の設定で自動的にwwwなしにリダイレクトされる）
3. もし正規URLが全く別のURLの場合:
   - **スキップ**して次のURLへ（後で技術担当に報告）

---

#### パターンD: 「noindexタグによって除外されました」

**表示内容**:
```
URLがGoogleに登録されていません
noindexタグによって除外されました
```

**対処**:
1. **即座に技術担当に連絡**（このマニュアル作成時点では発生しないはず）
2. このURLをスキップして次へ

---

### 📝 インデックス登録リクエスト対象URL（19件）

以下を順番にコピー＆ペーストしてください：

```
https://igrs.online/
https://igrs.online/personal
https://igrs.online/business
https://igrs.online/company
https://igrs.online/contact
https://igrs.online/kokusai-kekkon
https://igrs.online/haigusha-visa
https://igrs.online/kika-shinsei
https://igrs.online/gaimen-kirikae
https://igrs.online/psa-birth-certificate
https://igrs.online/marriage-certificate
https://igrs.online/cenomar
https://igrs.online/nbi-clearance
https://igrs.online/lto-drivers-license
https://igrs.online/dfa-apostille
https://igrs.online/translation
https://igrs.online/blog
https://igrs.online/blog-philippines-japan-international-marriage-documents-2026
https://igrs.online/philippine-marriage-doc-cost-comparison
```

---

### ステップ4: ページのインデックス登録レポート確認

1. 画面左側のメニューから**「ページ」**をクリック
2. 「インデックス登録されなかった理由」セクションを確認
3. 以下の理由が表示された場合の対処:

---

#### 理由1: 「クロール済み - 現在未登録」

**意味**: Googlebotがページを見たが、まだインデックスに追加していない

**対処**:
- **何もしない**（ステップ3でリクエスト済みなら、数日〜1週間で自動的にインデックスされる）
- 1週間後も変わらない場合 → 技術担当に連絡

---

#### 理由2: 「重複しています。ユーザーにより、正規ページとして選択されていません」

**意味**: 同じ内容のページが複数あり、Googleが別のURLを正規版と判断した

**対処**:
- **何もしない**（wwwあり/なしの重複は自動的に解決される）
- 「Googleが選択した正規URL」が全く別のページの場合 → 技術担当に連絡

---

#### 理由3: 「noindexタグによって除外されました」

**意味**: ページに「インデックスしないで」という指示がある

**対処**:
- **即座に技術担当に連絡**（このマニュアル作成時点では発生しないはず）

---

#### 理由4: 「robots.txtによってブロックされました」

**意味**: robots.txtでGooglebotのアクセスが拒否されている

**対処**:
- **即座に技術担当に連絡**（このマニュアル作成時点では発生しないはず）

---

#### 理由5: 「見つかりませんでした（404）」

**意味**: ページが存在しない

**対処**:
- **何もしない**（意図的に削除したページの場合）
- 存在するはずのページの場合 → 技術担当に連絡

---

### 優先順位まとめ

| 理由 | 優先度 | 対処 |
|------|--------|------|
| クロール済み - 現在未登録 | 低 | 待つ（1週間） |
| 重複（wwwあり/なし） | 低 | 何もしない |
| 重複（別URL） | 中 | 技術担当に連絡 |
| noindex | **高** | **即座に技術担当に連絡** |
| robots.txt | **高** | **即座に技術担当に連絡** |
| 404 | 中 | 意図的か確認 |

---

## 🔍 技術検証コマンド集（コピペ用）

技術担当が問題を確認する際に使用するコマンドです。

### A) noindex検証（主要5ページ）

```powershell
# トップページ
Write-Host "=== noindex検証: トップページ ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/" -UseBasicParsing
if ($response.Content -match 'name="robots"\s+content="[^"]*noindex') { 
    Write-Host "❌ NG: meta robots noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: meta robots noindex なし" -ForegroundColor Green 
}
if ($response.Headers['X-Robots-Tag'] -match 'noindex') { 
    Write-Host "❌ NG: X-Robots-Tag noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: X-Robots-Tag noindex なし" -ForegroundColor Green 
}

# /personal
Write-Host "=== noindex検証: /personal ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/personal" -UseBasicParsing
if ($response.Content -match 'name="robots"\s+content="[^"]*noindex') { 
    Write-Host "❌ NG: meta robots noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: meta robots noindex なし" -ForegroundColor Green 
}
if ($response.Headers['X-Robots-Tag'] -match 'noindex') { 
    Write-Host "❌ NG: X-Robots-Tag noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: X-Robots-Tag noindex なし" -ForegroundColor Green 
}

# /business
Write-Host "=== noindex検証: /business ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/business" -UseBasicParsing
if ($response.Content -match 'name="robots"\s+content="[^"]*noindex') { 
    Write-Host "❌ NG: meta robots noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: meta robots noindex なし" -ForegroundColor Green 
}
if ($response.Headers['X-Robots-Tag'] -match 'noindex') { 
    Write-Host "❌ NG: X-Robots-Tag noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: X-Robots-Tag noindex なし" -ForegroundColor Green 
}

# /cenomar
Write-Host "=== noindex検証: /cenomar ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/cenomar" -UseBasicParsing
if ($response.Content -match 'name="robots"\s+content="[^"]*noindex') { 
    Write-Host "❌ NG: meta robots noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: meta robots noindex なし" -ForegroundColor Green 
}
if ($response.Headers['X-Robots-Tag'] -match 'noindex') { 
    Write-Host "❌ NG: X-Robots-Tag noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: X-Robots-Tag noindex なし" -ForegroundColor Green 
}

# /contact
Write-Host "=== noindex検証: /contact ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/contact" -UseBasicParsing
if ($response.Content -match 'name="robots"\s+content="[^"]*noindex') { 
    Write-Host "❌ NG: meta robots noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: meta robots noindex なし" -ForegroundColor Green 
}
if ($response.Headers['X-Robots-Tag'] -match 'noindex') { 
    Write-Host "❌ NG: X-Robots-Tag noindex が存在" -ForegroundColor Red 
} else { 
    Write-Host "✅ OK: X-Robots-Tag noindex なし" -ForegroundColor Green 
}
```

**合格基準**: すべて「✅ OK」

---

### B) canonical検証（自己参照＆非www統一）

```powershell
# トップページ
Write-Host "=== canonical検証: トップページ ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/" -UseBasicParsing
if ($response.Content -match 'link rel="canonical"\s+href="([^"]+)"') { 
    $canonical = $matches[1]
    Write-Host "Canonical: $canonical" -ForegroundColor Yellow
    if ($canonical -eq "https://igrs.online/") { 
        Write-Host "✅ OK: 自己参照＆非www" -ForegroundColor Green 
    } else { 
        Write-Host "❌ NG: 不一致" -ForegroundColor Red 
    }
} else { 
    Write-Host "❌ NG: canonical なし" -ForegroundColor Red 
}

# /personal
Write-Host "=== canonical検証: /personal ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/personal" -UseBasicParsing
if ($response.Content -match 'link rel="canonical"\s+href="([^"]+)"') { 
    $canonical = $matches[1]
    Write-Host "Canonical: $canonical" -ForegroundColor Yellow
    if ($canonical -eq "https://igrs.online/personal") { 
        Write-Host "✅ OK: 自己参照＆非www" -ForegroundColor Green 
    } else { 
        Write-Host "❌ NG: 不一致" -ForegroundColor Red 
    }
} else { 
    Write-Host "❌ NG: canonical なし" -ForegroundColor Red 
}

# /cenomar
Write-Host "=== canonical検証: /cenomar ===" -ForegroundColor Cyan
$response = Invoke-WebRequest -Uri "https://igrs.online/cenomar" -UseBasicParsing
if ($response.Content -match 'link rel="canonical"\s+href="([^"]+)"') { 
    $canonical = $matches[1]
    Write-Host "Canonical: $canonical" -ForegroundColor Yellow
    if ($canonical -eq "https://igrs.online/cenomar") { 
        Write-Host "✅ OK: 自己参照＆非www" -ForegroundColor Green 
    } else { 
        Write-Host "❌ NG: 不一致" -ForegroundColor Red 
    }
} else { 
    Write-Host "❌ NG: canonical なし" -ForegroundColor Red 
}
```

**合格基準**: すべて「✅ OK: 自己参照＆非www」

---

### C) sitemap検証（410/404混入チェック）

```powershell
Write-Host "=== sitemap検証: 410/404混入チェック ===" -ForegroundColor Cyan
$sitemap = Invoke-WebRequest -Uri "https://igrs.online/sitemap.xml" -UseBasicParsing
$urls = [regex]::Matches($sitemap.Content, '<loc>(https://[^<]+)</loc>') | ForEach-Object { $_.Groups[1].Value }
Write-Host "Sitemap内URL数: $($urls.Count)" -ForegroundColor Yellow

$errors = @()
foreach ($url in $urls) {
    try {
        $status = (Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -ErrorAction Stop).StatusCode
        if ($status -eq 404 -or $status -eq 410) {
            $errors += "$url → $status"
            Write-Host "❌ $url → $status" -ForegroundColor Red
        }
    } catch {
        $errors += "$url → エラー"
        Write-Host "❌ $url → エラー" -ForegroundColor Red
    }
}

if ($errors.Count -eq 0) {
    Write-Host "✅ OK: 全URL正常（200）" -ForegroundColor Green
} else {
    Write-Host "❌ NG: $($errors.Count)件のエラー" -ForegroundColor Red
}
```

**合格基準**: 「✅ OK: 全URL正常（200）」

---

## 🚨 失敗パターン別の次の一手

### パターン1: 「クロール済み - 現在未登録」が多数

**状況**: インデックス登録リクエストしたが、1週間経っても「クロール済み - 現在未登録」のまま

**次の一手**:
1. **何もしない**（Googleが自動的に判断するまで待つ）
2. 2週間経っても変わらない場合 → コンテンツの質を見直す（文字数、独自性、ユーザー価値）

---

### パターン2: 「重複しています。Googleが選択した正規URL: https://www.igrs.online/xxx」

**状況**: wwwあり版が正規URLとして選択されている

**次の一手**:
1. **何もしない**（現在の設定で自動的にwwwなしにリダイレクトされる）
2. 1週間後に再度URL検査を実行 → wwwなし版が正規URLになっているか確認

---

### パターン3: 「重複しています。Googleが選択した正規URL: 全く別のURL」

**状況**: 意図しない別のURLが正規版として選択されている

**次の一手**:
1. **技術担当に連絡**（canonical設定の見直しが必要）
2. 該当ページのcanonicalタグを確認 → 正しいURLを指しているか検証

---

### パターン4: 「noindexタグによって除外されました」

**状況**: ページに`<meta name="robots" content="noindex">`が含まれている

**次の一手**:
1. **即座に技術担当に連絡**（HTMLファイルからnoindexタグを削除する必要がある）
2. 削除後、再度インデックス登録リクエスト

---

### パターン5: 「robots.txtによってブロックされました」

**状況**: robots.txtでGooglebotのアクセスが拒否されている

**次の一手**:
1. **即座に技術担当に連絡**（robots.txtの設定を修正する必要がある）
2. 修正後、再度インデックス登録リクエスト

---

### パターン6: 「見つかりませんでした（404）」

**状況**: ページが存在しない

**次の一手**:
1. 意図的に削除したページの場合 → **何もしない**
2. 存在するはずのページの場合 → **技術担当に連絡**（URLの綴りミス、ファイルの配置ミスの可能性）

---

## ✅ 最終確認（2026年2月6日時点）

以下の技術検証はすべて合格済みです：

| 項目 | 結果 |
|------|------|
| noindex検証（5ページ） | ✅ すべてOK |
| canonical検証（3ページ） | ✅ すべて自己参照＆非www |
| sitemap検証（18URL） | ✅ すべて200 OK |
| sitemap.xml アクセス | ✅ Googlebot/通常UA両方で200 |
| robots.txt アクセス | ✅ Googlebot/通常UA両方で200 |
| /services 挙動 | ✅ 410 Gone固定 |

**結論**: インデックス登録の技術的な障害はゼロです。GSCでサイトマップ送信とインデックス登録リクエストを実行すれば、数日〜1週間でインデックスされます。

---

## 📞 サポート

問題が発生した場合は、このマニュアルの該当セクションを確認してください。技術的な問題の場合は、技術担当に連絡してください。
