# Tailwindなしで `style.css` を安全に小分けする実行プラン

## 目的
- `igrs-netlify/css/style.css`（約2,800行）を、**表示崩れを出さずに**段階的に分割する。
- Cloudflare Pages の静的運用を維持し、ビルド依存は追加しない。
- 既存の運用チェック（`npm run check`）を常に通しながら進める。

## 前提（安全策）
1. 1フェーズで触る責務は1つだけ（例: ナビだけ、フッターだけ）。
2. `index.html` の読み込み順は維持する（順序変更は最小化）。
3. 変更ごとに `npm run check` + 主要ページ目視確認を実施する。
4. 1PRあたりの変更行数を抑える（レビュー容易化）。

---

## 分割後の推奨構成（例）
`igrs-netlify/css/` 配下に以下を追加して、最終的に `style.css` はエントリ用途へ縮小。

- `tokens.css`  : 変数（`:root`）
- `base.css`    : `html/body/a/p/h*` など全体基礎
- `layout.css`  : `.container`, セクション間隔, グリッド基礎
- `components.css` : ボタン、カード、バッジ、汎用UI
- `header.css`  : ヘッダー/ナビ
- `footer.css`  : フッター
- `pages/personal.css` : personal向け固有スタイル
- `pages/services.css` : services向け固有スタイル

> 既存の `mobile-upgrade.css` / `mobile-pro.css` / `home-hero.css` / `contact.css` は当面維持し、重複だけ後で統合。

---

## 実装フェーズ（安全順）

### Phase 0: 現状固定
- `style.css` のバックアップタグを作成（例: `css-split-baseline`）。
- 主要画面をスクショで保存（PC・モバイル）:
  - `/`
  - `/services`
  - `/personal`
  - `/contact`

### Phase 1: Tokens/Baseの分離（低リスク）
- `:root` と全体タイポグラフィのみ `tokens.css` / `base.css` に移動。
- `style.css` から該当箇所を削除し、HTMLで読み込み追加。
- 見た目差分が出ないことを確認。

### Phase 2: Layoutの分離（中リスク）
- `.container`、共通セクション、共通グリッドを `layout.css` へ移動。
- ページ固有クラスはまだ触らない。

### Phase 3: Componentsの分離（中リスク）
- ボタン、カード、CTA、共通フォーム部品を `components.css` へ。
- 同名セレクタの重複を1箇所に統一。

### Phase 4: Header/Footer分離（中〜高）
- ナビゲーション、ハンバーガー、フッターを分離。
- JSと結合しているクラス名を変えない（変更時はJS同時修正）。

### Phase 5: ページ固有分離（高）
- personal/services などを `pages/*.css` に移す。
- ここで初めて「使っていないセレクタ」を削除する。

### Phase 6: 仕上げ
- `style.css` を薄い互換レイヤー化（必要最小限）。
- 読み込み順・重複ルールを最終整理。

---

## 毎フェーズのチェックリスト

### 自動チェック
```bash
npm run check
node scripts/check-links.js
node scripts/check-title-h1.js
node scripts/check-charset.js
```

### 表示チェック（必須）
- 画面幅 390px / 768px / 1280px でレイアウト崩れなし
- 文字サイズ、行間、ボタン高さが意図通り
- ナビ開閉、アンカー遷移、主要CTAリンクが正常

### 差分チェック
- PR内で「CSS移動」と「デザイン変更」を混ぜない
- 変更理由をPR本文に記録（どこからどこへ移したか）

---

## 具体的な進め方（1PR目の最小スコープ）
1. `tokens.css` と `base.css` を新規作成。
2. `style.css` から対応ブロックだけ削除。
3. `index.html` のCSS読込に2ファイル追加（既存順序は維持）。
4. `npm run check` 実行。
5. トップ/問い合わせをスクショ比較して差分ゼロ確認。

この1PRが安全に通れば、同じやり方で Phase 2以降を反復する。

---

## 注意点（今回のリポジトリ向け）
- `style.css` に NUL byte が含まれているため、編集時に文字化け検知を必ず実施する。
- 一部ページは歴史的な個別CSSがあるため、いきなり統合せず「先に分離、後で重複排除」を徹底する。
- Cloudflare Pages運用のため、ビルド必須ツール（Tailwind/PostCSS）は導入しない。
