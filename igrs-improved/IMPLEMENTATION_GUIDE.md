# igrs.online SEO改善 導入ガイド

## ファイル一覧

| ファイル | 説明 |
|---------|------|
| `seo-head.html` | トップページ用の完全なheadセクション |
| `page-seo-templates.html` | 各ページ用のメタタグテンプレート |
| `sitemap.xml` | サイトマップ（Google Search Console用） |
| `robots.txt` | クローラー制御ファイル |
| `ogp-image-spec.md` | OGP画像の作成仕様書 |

---

## Step 1: 基本メタタグの追加

### 1.1 index.html の `<head>` セクションを更新

`seo-head.html` の内容を既存の `<head>` セクションにマージしてください。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <!-- ここに seo-head.html の内容を追加 -->

    <!-- 既存のCSS/JSはそのまま維持 -->
    <link rel="stylesheet" href="styles.css">
</head>
```

### 1.2 各ページのメタタグを更新

`page-seo-templates.html` を参照し、各ページに適切なメタタグを設定してください。

**チェックリスト:**
- [ ] index.html
- [ ] service.html
- [ ] price.html
- [ ] company.html
- [ ] contact.html
- [ ] privacy.html
- [ ] 各サービス詳細ページ

---

## Step 2: sitemap.xml と robots.txt の設置

### 2.1 ファイルをルートディレクトリに配置

```
/
├── index.html
├── sitemap.xml    ← ここに配置
├── robots.txt     ← ここに配置
└── ...
```

### 2.2 sitemap.xml の更新

**重要**: 実際のページ構成に合わせてURLを修正してください。

```xml
<!-- 存在しないページのURLは削除 -->
<!-- lastmod の日付は実際の更新日に変更 -->
<lastmod>2026-01-01</lastmod>
```

### 2.3 動作確認

- https://igrs.online/sitemap.xml にアクセスして表示確認
- https://igrs.online/robots.txt にアクセスして表示確認

---

## Step 3: OGP画像の作成と設置

### 3.1 OGP画像を作成

`ogp-image-spec.md` の仕様に従って画像を作成してください。

**推奨ツール**: Canva（無料）

### 3.2 画像を配置

```
/images/
├── ogp.png              # 1200x630px
├── favicon.ico
├── favicon-32x32.png
├── favicon-16x16.png
└── apple-touch-icon.png # 180x180px
```

---

## Step 4: Google Search Console への登録

### 4.1 サイトの所有権を確認

1. [Google Search Console](https://search.google.com/search-console) にアクセス
2. 「プロパティを追加」→ URL を入力
3. 所有権の確認（HTMLファイルまたはDNSレコード）

### 4.2 サイトマップを送信

1. 左メニュー「サイトマップ」をクリック
2. `sitemap.xml` を入力して送信

### 4.3 インデックス登録をリクエスト

1. 上部の検索バーに各ページのURLを入力
2. 「インデックス登録をリクエスト」をクリック

---

## Step 5: SNS共有テスト

### 5.1 OGPデバッガーでテスト

**Facebook/LINE:**
- https://developers.facebook.com/tools/debug/

**Twitter:**
- https://cards-dev.twitter.com/validator

### 5.2 確認項目

- [ ] タイトルが正しく表示される
- [ ] 説明文が正しく表示される
- [ ] OGP画像が正しく表示される
- [ ] URLが正しく表示される

---

## Step 6: 構造化データのテスト

### 6.1 リッチリザルトテスト

https://search.google.com/test/rich-results

**テスト項目:**
- [ ] LocalBusiness が正しく認識される
- [ ] FAQPage が正しく認識される
- [ ] エラーや警告がない

### 6.2 Schema.org バリデーター

https://validator.schema.org/

---

## チェックリスト（最終確認）

### 必須項目

- [ ] すべてのページに `<title>` タグがある
- [ ] すべてのページに `meta description` がある
- [ ] すべてのページに `canonical URL` がある
- [ ] OGPタグが設定されている
- [ ] Twitter Cardsタグが設定されている
- [ ] sitemap.xml がルートに配置されている
- [ ] robots.txt がルートに配置されている
- [ ] Google Search Console に登録されている

### 推奨項目

- [ ] すべての画像に `alt` 属性がある
- [ ] OGP画像が作成・設置されている
- [ ] ファビコンが設定されている
- [ ] ページ速度が最適化されている（PageSpeed Insights で確認）

---

## トラブルシューティング

### OGP画像が表示されない

1. 画像URLが正しいか確認
2. 画像サイズが1200x630pxか確認
3. 画像ファイルサイズが8MB以下か確認
4. キャッシュをクリア（Facebookデバッガーで「もう一度スクレイピング」）

### サイトマップがインデックスされない

1. robots.txt でブロックされていないか確認
2. sitemap.xml の書式が正しいか確認
3. URLがすべて200ステータスを返すか確認

### 構造化データのエラー

1. JSON-LDの書式が正しいか確認（カンマ、括弧）
2. 必須プロパティが含まれているか確認
3. URLが有効か確認

---

## 参考リンク

- [Google SEOスターターガイド](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
