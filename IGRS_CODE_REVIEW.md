# igrs.online コードレビューレポート

**レビュー日**: 2026年1月1日
**対象サイト**: https://igrs.online
**サイト概要**: 株式会社IGRS - フィリピン公的書類取得・アポスティーユ認証BPOサービス

---

## 総合評価

| カテゴリ | 評価 | 説明 |
|---------|------|------|
| HTML/セマンティクス | ⭐⭐⭐☆☆ | 基本構造は良好だが改善余地あり |
| CSS/デザイン | ⭐⭐⭐⭐☆ | モダンな実装、細部に改善点 |
| JavaScript | ⭐⭐⭐☆☆ | 機能は実装、エラーハンドリング不足 |
| SEO | ⭐⭐⭐⭐☆ | 構造化データ充実、メタタグ要確認 |
| アクセシビリティ | ⭐⭐☆☆☆ | WCAG対応に課題あり |
| セキュリティ | ⭐⭐⭐☆☆ | 基本対策要確認 |

---

## 1. HTML/セマンティクス

### 良い点 ✅
- 見出し階層（H1〜H3）が適切に構造化されている
- 内部リンクが豊富でナビゲーションが充実
- Schema.org構造化データ（LocalBusiness, FAQPage）を実装

### 改善が必要な点 ⚠️

#### 1.1 セマンティックHTML要素の活用不足
```html
<!-- 現状 -->
<div class="service-card">...</div>

<!-- 推奨 -->
<article class="service-card">...</article>
```

#### 1.2 ランドマーク role 属性の欠如
```html
<!-- 追加推奨 -->
<header role="banner">...</header>
<main role="main">...</main>
<footer role="contentinfo">...</footer>
```

---

## 2. CSS/デザイン

### 良い点 ✅
- CSS変数を用いた色管理（`--primary-color`, `--white`など）
- グラデーション効果の洗練された使用
- CSSグリッドとFlexboxの適切な活用
- rem単位によるフォントサイズ管理

### 改善が必要な点 ⚠️

#### 2.1 レスポンシブブレークポイントの不足
```css
/* 現状のブレークポイント */
@media (max-width: 968px) { ... }
@media (max-width: 768px) { ... }

/* 追加推奨 */
@media (max-width: 600px) { ... }  /* 小型タブレット */
@media (max-width: 400px) { ... }  /* 小型スマートフォン */
@media (max-width: 320px) { ... }  /* 極小デバイス */
```

#### 2.2 パフォーマンス上の懸念
```css
/* backdrop-filterはGPU負荷が高い - 使用箇所を限定推奨 */
backdrop-filter: blur(10px);

/* 複数要素への適用を避ける */
```

#### 2.3 フォーカススタイルの欠如
```css
/* 追加推奨 */
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

---

## 3. JavaScript

### 現在のコード分析

```javascript
// モバイルナビゲーション制御
function toggleMobileNav() {
  document.getElementById('navMobile').classList.toggle('active');
}

function toggleMobileDropdown(button) {
  button.classList.toggle('open');
  const submenu = button.nextElementSibling;
  submenu.classList.toggle('open');
}

// スクロールアニメーション
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);
```

### 問題点と改善提案

#### 3.1 エラーハンドリングの欠如
```javascript
// 現状（エラーが発生する可能性あり）
function toggleMobileNav() {
  document.getElementById('navMobile').classList.toggle('active');
}

// 推奨（nullチェック付き）
function toggleMobileNav() {
  const nav = document.getElementById('navMobile');
  if (nav) {
    nav.classList.toggle('active');
  }
}
```

#### 3.2 インラインスタイルの使用
```javascript
// 現状（パフォーマンス低下の原因）
el.style.opacity = '0';
el.style.transform = 'translateY(30px)';
el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

// 推奨（CSSクラスの使用）
el.classList.add('fade-in-element');
```

```css
/* CSSで定義 */
.fade-in-element {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-element.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 4. SEO

### 良い点 ✅
- **構造化データ**: LocalBusinessとFAQPageスキーマを実装
- **見出し階層**: H1が適切に設定
- **内部リンク**: 充実したナビゲーション

### 改善が必要な点 ⚠️

#### 4.1 メタタグの確認が必要
```html
<!-- 以下が適切に設定されているか確認 -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="フィリピンの公的書類取得・アポスティーユ認証を代行。出生証明書、婚姻証明書、無犯罪証明書などを最短最速で取得します。">
<meta name="keywords" content="フィリピン,公的書類,アポスティーユ,出生証明書,婚姻証明書,CENOMAR">
<link rel="canonical" href="https://igrs.online/">
```

#### 4.2 OGP/Twitter Cards の追加
```html
<!-- Open Graph -->
<meta property="og:title" content="株式会社IGRS - フィリピン公的書類取得サービス">
<meta property="og:description" content="フィリピンの公的書類を最短最速で取得します">
<meta property="og:image" content="https://igrs.online/images/ogp.png">
<meta property="og:url" content="https://igrs.online/">
<meta property="og:type" content="website">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="株式会社IGRS">
<meta name="twitter:description" content="フィリピン公的書類取得・アポスティーユ認証BPOサービス">
```

#### 4.3 画像のalt属性
```html
<!-- すべての画像にalt属性を設定 -->
<img src="images/hero-bg.png" alt="フィリピン書類取得サービスのイメージ">
```

---

## 5. アクセシビリティ（WCAG 2.1）

### 重大な問題点 🚨

#### 5.1 ARIA属性の欠如
```html
<!-- 現状 -->
<button onclick="toggleMobileNav()">メニュー</button>

<!-- 推奨 -->
<button
  onclick="toggleMobileNav()"
  aria-expanded="false"
  aria-controls="navMobile"
  aria-label="メニューを開閉">
  メニュー
</button>
```

#### 5.2 ドロップダウンのアクセシビリティ
```html
<!-- 推奨実装 -->
<button
  class="dropdown-toggle"
  aria-expanded="false"
  aria-haspopup="true">
  サービス
</button>
<ul class="dropdown-menu" role="menu">
  <li role="menuitem"><a href="#">出生証明書</a></li>
</ul>
```

#### 5.3 キーボードナビゲーション
```javascript
// Escキーでメニューを閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllMenus();
  }
});

// フォーカストラップの実装が必要
```

#### 5.4 絵文字のアクセシビリティ
```html
<!-- 現状 -->
📄 出生証明書

<!-- 推奨 -->
<span role="img" aria-label="書類アイコン">📄</span> 出生証明書

<!-- より良い方法：SVGアイコンの使用 -->
<svg aria-hidden="true">...</svg>
<span>出生証明書</span>
```

---

## 6. セキュリティ

### 確認が必要な項目

#### 6.1 HTTPS
- HTTPSが有効になっているか確認
- HTTP→HTTPSリダイレクトの設定

#### 6.2 Content Security Policy（CSP）
```html
<!-- 推奨ヘッダー設定 -->
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

#### 6.3 外部リソース
- 外部CDNやサードパーティスクリプトの使用を最小限に
- 使用する場合はSRI（Subresource Integrity）を設定

---

## 7. パフォーマンス最適化の提案

### 7.1 画像の最適化
```html
<!-- WebP形式の使用 -->
<picture>
  <source srcset="images/hero-bg.webp" type="image/webp">
  <img src="images/hero-bg.png" alt="ヒーロー背景">
</picture>

<!-- 遅延読み込み -->
<img src="image.png" loading="lazy" alt="説明">
```

### 7.2 CSS/JSの最適化
- CSSとJavaScriptの圧縮（minify）
- クリティカルCSSのインライン化
- JavaScriptの遅延読み込み（`defer`属性）

### 7.3 Core Web Vitals対策
```html
<!-- LCP（Largest Contentful Paint）改善 -->
<link rel="preload" href="images/hero-bg.png" as="image">

<!-- CLS（Cumulative Layout Shift）防止 -->
<img src="image.png" width="800" height="600" alt="説明">
```

---

## 8. 優先度別改善ロードマップ

### 高優先度（すぐに対応）
1. メタタグ（description, viewport）の確認・追加
2. 画像のalt属性追加
3. JavaScriptのnullチェック追加
4. HTTPSの確認

### 中優先度（1〜2週間以内）
1. ARIA属性の追加
2. キーボードナビゲーション対応
3. OGP/Twitter Cards追加
4. フォーカススタイルの実装

### 低優先度（将来的に）
1. レスポンシブブレークポイントの追加
2. パフォーマンス最適化（画像WebP化など）
3. CSPヘッダーの設定
4. インラインスタイルのCSS化

---

## まとめ

igrs.online は、モダンなCSS技術（変数、グリッド、アニメーション）を活用した見栄えの良いサイトです。構造化データ（Schema.org）の実装も評価できます。

主な改善点は：
1. **アクセシビリティ**: ARIA属性とキーボード対応の強化
2. **JavaScript**: エラーハンドリングとCSSクラス化
3. **SEO**: メタタグとOGPの完備
4. **パフォーマンス**: 画像最適化とCSS/JS圧縮

これらの改善により、より堅牢でアクセシブル、SEOに強いサイトになります。
