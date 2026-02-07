# IGRS Online (igrs.online)

フィリピン公的書類取得代行サービス - 株式会社IGRS

## 開発環境セットアップ

```bash
npm install
```

## 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run format` | Prettierでコードを整形 |
| `npm run format:check` | 整形チェック（CI用） |
| `npm run check` | 全チェック実行（charset/link/title-h1/jsonld） |
| `npm run check:charset` | charset宣言チェック |
| `npm run check:links` | 内部リンク切れチェック |
| `npm run check:title-h1` | title/H1タグチェック |
| `npm run check:jsonld` | JSON-LD構文チェック |
| `npm run lint` | format:check + check（全検証） |

## チェック項目

### 1. Charset宣言チェック
全HTMLファイルに `<meta charset="utf-8">` が存在することを確認。
文字化けを防止します。

### 2. 内部リンクチェック
`href="/..."` 形式の内部リンクが実在するファイルを指しているか確認。
404エラーを防止します。

### 3. Title/H1チェック
- `<title>` タグの存在確認
- `<h1>` タグの存在確認
- 同一ページ内での重複チェック

### 4. JSON-LDチェック
`<script type="application/ld+json">` 内のJSONが正しくパースできることを確認。
構造化データのエラーを防止します。

## 運用ルール

### デプロイフロー

```
[ローカル開発] → [Push] → [PR作成] → [CI自動チェック] → [Deploy Preview] → [レビュー] → [マージ] → [本番デプロイ]
```

1. **ブランチ作成**: `feature/xxx` または `fix/xxx` でブランチを作成
2. **ローカル開発**: `npm run format` で整形、`npm run check` でチェック
3. **Push & PR作成**: GitHub にプッシュし、Pull Request を作成
4. **自動チェック**: GitHub Actions で `npm run lint` が自動実行
5. **Deploy Preview**: Cloudflare Pages が自動的にプレビュー環境を作成
6. **レビュー**: プレビューを確認し、問題なければ承認
7. **マージ**: main ブランチにマージ
8. **本番デプロイ**: Cloudflare Pages が自動的に本番環境にデプロイ

### 禁止事項

- main/master への直接プッシュ
- CI チェック未通過でのマージ
- 本番環境への直接デプロイ

### ブランチ保護（推奨設定）

GitHub リポジトリ設定で以下を有効化することを推奨：

- Require a pull request before merging
- Require status checks to pass before merging
  - `CI Checks / Static Site Checks` を必須に設定
- Require branches to be up to date before merging

## ディレクトリ構成

```
cebu/
├── igrs-netlify/        # 静的サイト（Cloudflare Pagesデプロイ対象）
│   ├── css/             # スタイルシート
│   ├── images/          # 画像ファイル
│   └── *.html           # HTMLページ
├── scripts/             # チェックスクリプト
│   ├── lib/             # 共通ライブラリ
│   ├── check-all.js     # 全チェック実行
│   ├── check-charset.js # charset チェック
│   ├── check-links.js   # リンク切れチェック
│   ├── check-title-h1.js# title/H1 チェック
│   └── check-jsonld.js  # JSON-LD チェック
├── .github/workflows/   # GitHub Actions 設定
├── _redirects           # Cloudflare Pages 互換リダイレクト設定
├── package.json         # npm 設定
└── README.md            # このファイル
```

## Cloudflare Pages設定

- **Publish directory**: `igrs-netlify`
- **Build command**: `echo 'Static site - no build needed'`
- **Deploy Preview**: 有効（PRごとにプレビュー環境を自動生成）

## ライセンス

(C) 2026 株式会社IGRS All rights reserved.
