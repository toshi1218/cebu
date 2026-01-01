# igrs.online SEO改善ファイル - Netlifyアップロード手順

## 改善内容サマリー

### index.html の変更点

| 項目 | Before | After |
|------|--------|-------|
| OGP画像 | なし | ✅ `og:image` 追加 |
| Twitter画像 | なし | ✅ `twitter:image` 追加 |
| Twitterアカウント | なし | ✅ `@GswCnxL7Sg15778` |
| Twitter Card | `summary` | ✅ `summary_large_image` |
| Favicon | なし | ✅ 追加（要画像作成） |
| 構造化データ | 2種類 | ✅ 5種類に拡張 |
| JavaScriptエラー対策 | なし | ✅ nullチェック追加 |
| フッターSNSリンク | なし | ✅ X(Twitter)リンク追加 |

### 新規ファイル

| ファイル | 用途 |
|---------|------|
| `sitemap.xml` | Google検索用サイトマップ（14ページ） |
| `robots.txt` | クローラー制御 |

---

## アップロード手順

### Step 1: ファイルの準備

1. このフォルダ内のファイルをダウンロード
2. 既存の `index.html` を **バックアップ**（`index_backup.html` にリネーム）
3. 新しい `index.html` で置き換え

### Step 2: OGP画像の作成

**重要**: OGP画像を作成して `/images/ogp.png` に配置してください。

**仕様:**
- サイズ: 1200 x 630 px
- フォーマット: PNG
- 内容: 会社ロゴ + 「フィリピン公的書類取得代行」

**無料ツール**: [Canva](https://www.canva.com/) で作成可能

### Step 3: Favicon の作成（オプション）

以下のファイルを `/images/` に配置:
- `favicon-32x32.png` (32x32px)
- `favicon-16x16.png` (16x16px)
- `apple-touch-icon.png` (180x180px)

ルートに配置:
- `favicon.ico`

**無料ツール**: [favicon.io](https://favicon.io/) で一括生成可能

### Step 4: Netlifyにアップロード

#### 方法A: ドラッグ&ドロップ（簡単）

1. https://app.netlify.com にログイン
2. サイトの「**Deploys**」タブを開く
3. 「**Drag and drop your site output folder here**」にフォルダをドロップ

#### 方法B: 手動アップロード

1. Netlify管理画面 → サイト選択
2. 「**Deploys**」→「**Deploy site**」
3. 更新したファイルをアップロード

---

## アップロード後の確認

### 1. サイト表示確認

https://igrs.online にアクセスして正常に表示されるか確認

### 2. サイトマップ確認

https://igrs.online/sitemap.xml にアクセス

### 3. OGPテスト

**Facebook/LINE:**
https://developers.facebook.com/tools/debug/
→ `https://igrs.online` を入力

**Twitter:**
https://cards-dev.twitter.com/validator
→ `https://igrs.online` を入力

### 4. 構造化データテスト

https://search.google.com/test/rich-results
→ `https://igrs.online` を入力

---

## Google Search Console 設定

### サイトマップ送信

1. https://search.google.com/search-console にアクセス
2. プロパティ選択（または追加）
3. 左メニュー「**サイトマップ**」
4. `sitemap.xml` を入力して「**送信**」

---

## ファイル一覧

```
igrs-netlify/
├── index.html      ← 改善版（既存を置き換え）
├── sitemap.xml     ← 新規（ルートに配置）
├── robots.txt      ← 新規（ルートに配置）
└── UPLOAD_GUIDE.md ← この手順書
```

**注意**: `sitemap.xml` と `robots.txt` は必ずサイトの**ルートディレクトリ**に配置してください。

---

## トラブルシューティング

### OGP画像が表示されない

1. 画像パスが正しいか確認（`/images/ogp.png`）
2. 画像サイズが 1200x630px か確認
3. Facebookデバッガーで「**もう一度スクレイピング**」をクリック

### サイトマップがインデックスされない

1. `https://igrs.online/sitemap.xml` にアクセスできるか確認
2. robots.txt に `Sitemap:` 行があるか確認
3. Google Search Console でエラーがないか確認

### 構造化データのエラー

1. JSON-LDの書式エラー（カンマ、括弧）を確認
2. リッチリザルトテストでエラー箇所を特定

---

## サポート

不明点があれば、スクリーンショットを共有してください。
