# igrs.online SEO正常化レポート
**実施日:** 2026-01-05  
**対象サイト:** https://igrs.online/  
**担当:** Anti-Gravity SEOエンジニア

---

## 📊 Executive Summary

igrs.onlineの検索エンジン最適化とサイト正常化作業を完了しました。主な成果として、**全ページへのcanonicalタグ追加**、**www→非www 301リダイレクトの設定**、**sitemap.xmlの更新**を実施し、SEO評価の統合とインデックス最適化を実現しました。

---

## ✅ Phase 1: Web監査結果

### 1.1 HTTPS/SSL検証
- **結果:** ✅ **合格**
- **SSL証明書:** 有効
- **セキュリティ警告:** なし
- **Mixed Content:** なし
- **ページタイトル:** `フィリピンの出生証明書・CENOMAR・NBIクリアランス・運転経歴証明書の取得代行｜株式会社IGRS`
- **メインヘッダー:** `フィリピンの公的書類を最短最速で取得します`

### 1.2 WWWリダイレクト検証
- **結果:** ✅ **合格**
- **テストURL:** `https://www.igrs.online`
- **リダイレクト先:** `https://igrs.online`
- **リダイレクトタイプ:** 301 Permanent Redirect（恒久的）
- **動作:** 正常に動作中

### 1.3 404エラーページ検証
- **結果:** ✅ **合格**
- **カスタム404ページ:** 実装済み
- **テストURL:** `https://igrs.online/non-existent-page-test`
- **レスポンス:** 404 Not Found（正常）
- **デザイン:** ユーザーフレンドリーなデザインで、トップページへの誘導あり

### 1.4 Canonical タグ監査

#### ✅ 正常なページ（14ページ）
すべてのメインページに正しいcanonicalタグが設定されています：

| ページ | Canonical URL |
|--------|---------------|
| トップページ | `https://igrs.online/` |
| サービス一覧 | `https://igrs.online/services.html` |
| 出生証明書 | `https://igrs.online/psa-birth-certificate.html` |
| 婚姻証明書 | `https://igrs.online/marriage-certificate.html` |
| 独身証明書 | `https://igrs.online/cenomar.html` |
| 無犯罪証明書 | `https://igrs.online/nbi-clearance.html` |
| 運転経歴証明書 | `https://igrs.online/lto-transaction-history.html` |
| アポスティーユ | `https://igrs.online/dfa-apostille.html` |
| 個人料金 | `https://igrs.online/personal.html` |
| 法人料金 | `https://igrs.online/business.html` |
| 会社概要 | `https://igrs.online/company.html` |
| お問い合わせ | `https://igrs.online/contact.html` |
| ブログ | `https://igrs.online/blog.html` |
| プライバシーポリシー | `https://igrs.online/privacy.html` |

#### ⚠️ 修正が必要だったページ（3ページ）→ ✅ **修正完了**
以下のページにcanonicalタグが欠落していたため、追加しました：

| ページ | 追加したCanonical URL | Robots Meta |
|--------|----------------------|-------------|
| 404エラーページ | `https://igrs.online/404.html` | `noindex, nofollow` |
| サンクスページ | `https://igrs.online/thank-you.html` | `noindex, nofollow` |
| 翻訳サービス | `https://igrs.online/translation.html` | - |

---

## ✅ Phase 2: ソースコード検証結果

### 2.1 リダイレクト設定（_redirects）

#### 修正前
```
/web /  301
```

#### 修正後 ✅
```
https://www.igrs.online/* https://igrs.online/:splat 301!
/web /  301
```

**変更内容:**
- www付きドメインから非wwwドメインへの**301恒久的リダイレクト**を追加
- `301!` フラグで強制リダイレクトを指定
- `:splat` でサブパスも含めてすべてリダイレクト

**SEO効果:**
- すべてのSEO評価が `https://igrs.online/` に統合されます
- 重複コンテンツ問題を解消
- Googleが正規URLを明確に認識

### 2.2 Sitemap.xml 検証

#### 検証結果: ✅ **合格（更新済み）**

**全URLの確認:**
- ✅ すべてのURLが `https://igrs.online/` で始まっている
- ✅ 旧ドメインのURLは含まれていない
- ✅ 削除したページのURLは含まれていない
- ✅ **translation.html を新規追加**

**更新内容:**
- `translation.html` をサイトマップに追加（priority: 0.7）
- lastmod日付を2026-01-05に更新

**サイトマップ統計:**
- **総ページ数:** 15ページ
- **最終更新日:** 2026-01-05
- **サイトマップURL:** `https://igrs.online/sitemap.xml`

### 2.3 Robots.txt 検証

#### 検証結果: ✅ **合格**

```
User-agent: *
Allow: /

Sitemap: https://igrs.online/sitemap.xml

Crawl-delay: 1
```

**確認事項:**
- ✅ Googlebotをブロックしていない
- ✅ サイトマップパスが正しい（`https://igrs.online/sitemap.xml`）
- ✅ クロール速度制限が適切（1秒）

---

## ✅ Phase 3: Google Search Console用アクションリスト

詳細は **`GSC_ACTION_LIST.md`** を参照してください。

### 削除申請すべきURL（コピペ用）
```
https://cheerful-platypus-b0a8db.netlify.app/
https://cheerful-platypus-b0a8db.netlify.app/*
https://www.igrs.online/
https://www.igrs.online/*
```

### 優先インデックス登録URL（最重要から順に）
```
https://igrs.online/
https://igrs.online/services.html
https://igrs.online/psa-birth-certificate.html
https://igrs.online/marriage-certificate.html
https://igrs.online/cenomar.html
https://igrs.online/nbi-clearance.html
https://igrs.online/lto-transaction-history.html
https://igrs.online/dfa-apostille.html
https://igrs.online/personal.html
https://igrs.online/business.html
https://igrs.online/translation.html
https://igrs.online/contact.html
https://igrs.online/company.html
https://igrs.online/blog.html
https://igrs.online/privacy.html
```

### サイトマップ送信URL
```
https://igrs.online/sitemap.xml
```

---

## 📝 実施した修正内容まとめ

### 修正ファイル一覧

| ファイル | 修正内容 | 重要度 |
|---------|---------|--------|
| `404.html` | canonicalタグ追加 | 中 |
| `thank-you.html` | canonicalタグ追加 | 中 |
| `translation.html` | canonicalタグ追加 | 中 |
| `_redirects` | www→非www 301リダイレクト追加 | **高** |
| `sitemap.xml` | translation.html追加、日付更新 | 中 |

### Git差分サマリー

```diff
# 404.html
+ <link rel="canonical" href="https://igrs.online/404.html" />

# thank-you.html
+ <link rel="canonical" href="https://igrs.online/thank-you.html" />

# translation.html
+ <link rel="canonical" href="https://igrs.online/translation.html" />

# _redirects
+ https://www.igrs.online/* https://igrs.online/:splat 301!

# sitemap.xml
+ <url>
+   <loc>https://igrs.online/translation.html</loc>
+   <lastmod>2026-01-05</lastmod>
+   <changefreq>monthly</changefreq>
+   <priority>0.7</priority>
+ </url>
```

---

## 🎯 SEO改善効果（予測）

### 短期的効果（1-2週間）
1. **重複コンテンツの解消**
   - www/非wwwの統合により、SEO評価が分散しなくなる
   - Googleが正規URLを明確に認識

2. **インデックス精度の向上**
   - canonicalタグにより、検索エンジンが正しいURLを優先
   - 404ページやサンクスページの誤インデックスを防止

3. **クロール効率の改善**
   - サイトマップの更新により、新規ページが迅速にインデックス
   - 301リダイレクトにより、無駄なクロールを削減

### 中長期的効果（1-3ヶ月）
1. **検索順位の向上**
   - SEO評価の統合により、ドメインオーソリティが向上
   - 重複ペナルティのリスク解消

2. **オーガニックトラフィックの増加**
   - 正規URLへのトラフィック集約
   - 主要キーワードでの露出増加

3. **ユーザー体験の向上**
   - 一貫したURLでのアクセス
   - 404エラーの適切な処理

---

## ⚠️ 重要な注意事項

### 1. デプロイ前の確認
現在の修正はローカルリポジトリのみに適用されています。本番環境に反映するには：

```bash
# Gitコミット
git add .
git commit -m "SEO optimization: Add canonical tags, www redirect, update sitemap"

# Gitプッシュ（本番デプロイ）
git push origin master
```

### 2. Google Search Console作業
- **削除申請:** 旧NetlifyサイトとWWW付きURLを削除申請
- **インデックス登録:** 主要ページから優先的にリクエスト
- **サイトマップ送信:** sitemap.xmlを送信

### 3. モニタリング推奨期間
- **1週間後:** インデックス状況の確認
- **2週間後:** 検索順位の変動確認
- **1ヶ月後:** オーガニックトラフィックの変化確認

---

## 📊 技術的詳細

### Canonical タグの重要性
- **目的:** 検索エンジンに「このページの正規URLはこれです」と明示
- **効果:** 重複コンテンツ問題の解消、SEO評価の統合
- **必須ページ:** すべてのインデックス対象ページ
- **例外:** noindex設定のページ（404、thank-youなど）も設定推奨

### 301リダイレクトの重要性
- **目的:** 旧URLから新URLへのSEO評価の引き継ぎ
- **効果:** リンクジュースの保持、ユーザー体験の向上
- **永続性:** 301は「恒久的な移転」を意味し、Googleが評価を完全に移行

### Sitemap.xmlの役割
- **目的:** 検索エンジンにサイト構造を伝える
- **効果:** インデックス速度の向上、新規ページの迅速な発見
- **更新頻度:** コンテンツ追加・変更時に随時更新

---

## ✅ 完了チェックリスト

### 技術的修正
- [x] 404.htmlにcanonicalタグ追加
- [x] thank-you.htmlにcanonicalタグ追加
- [x] translation.htmlにcanonicalタグ追加
- [x] _redirectsにwww→非www 301リダイレクト追加
- [x] sitemap.xmlにtranslation.html追加
- [x] sitemap.xmlの日付更新
- [x] robots.txt検証（問題なし）

### ドキュメント作成
- [x] SEO正常化レポート作成（本ファイル）
- [x] Google Search Console作業用リスト作成

### 次のステップ（ユーザー作業）
- [ ] ローカル変更をGitコミット
- [ ] masterブランチにプッシュ（本番デプロイ）
- [ ] Netlifyデプロイ完了確認
- [ ] Google Search Consoleで削除申請
- [ ] Google Search Consoleでインデックス登録リクエスト
- [ ] Google Search Consoleでサイトマップ送信
- [ ] 1週間後のモニタリング

---

## 📞 サポート情報

### 問題が発生した場合
1. **デプロイエラー:** Netlifyのビルドログを確認
2. **リダイレクト不具合:** ブラウザキャッシュをクリア
3. **インデックス問題:** Google Search Consoleの「カバレッジ」レポート確認

### 参考リンク
- [Google Search Console](https://search.google.com/search-console)
- [Netlify Redirects Documentation](https://docs.netlify.com/routing/redirects/)
- [Google Canonical Tag Guide](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

---

**レポート作成者:** Anti-Gravity SEOエンジニア  
**最終更新:** 2026-01-05  
**ステータス:** ✅ 完了（デプロイ待ち）
