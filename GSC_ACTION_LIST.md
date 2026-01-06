# Google Search Console 作業用リスト
**作成日:** 2026-01-05

---

## 📋 Phase 1: 削除申請すべき不要なURL

以下のURLは、Google Search Consoleの「削除」メニューから削除申請を行ってください。

### 旧Netlifyサイト（削除済み）
```
https://cheerful-platypus-b0a8db.netlify.app/
https://cheerful-platypus-b0a8db.netlify.app/*
```

### WWW付きURL（301リダイレクト設定済み）
```
https://www.igrs.online/
https://www.igrs.online/*
```

**注意:** www付きURLは301リダイレクトで正規化されているため、Googleが自動的に統合しますが、念のため削除申請を推奨します。

---

## ✅ Phase 2: 優先的にインデックス登録リクエストすべきURL

以下のURLは、Google Search Consoleの「URL検査」→「インデックス登録をリクエスト」で優先的に登録申請してください。

### 最重要ページ（Priority: 1.0 - 0.9）
```
https://igrs.online/
https://igrs.online/services.html
```

### 主要サービスページ（Priority: 0.8）
```
https://igrs.online/psa-birth-certificate.html
https://igrs.online/marriage-certificate.html
https://igrs.online/cenomar.html
https://igrs.online/nbi-clearance.html
https://igrs.online/lto-transaction-history.html
https://igrs.online/dfa-apostille.html
```

### 料金・翻訳ページ（Priority: 0.7）
```
https://igrs.online/personal.html
https://igrs.online/business.html
https://igrs.online/translation.html
https://igrs.online/contact.html
```

### その他のページ（Priority: 0.6 - 0.3）
```
https://igrs.online/company.html
https://igrs.online/blog.html
https://igrs.online/privacy.html
```

---

## 🔍 Phase 3: サイトマップ送信

Google Search Consoleの「サイトマップ」セクションで以下のURLを送信してください：

```
https://igrs.online/sitemap.xml
```

---

## 📝 作業手順

### 1. 削除申請（Phase 1）
1. Google Search Console にログイン
2. 左メニューから「削除」を選択
3. 「新しいリクエスト」をクリック
4. 上記の不要なURLを1つずつ入力して削除申請

### 2. インデックス登録リクエスト（Phase 2）
1. Google Search Console にログイン
2. 上部の検索バーにURLを入力
3. 「URL検査」を実行
4. 「インデックス登録をリクエスト」をクリック
5. 最重要ページから順に実施

### 3. サイトマップ送信（Phase 3）
1. Google Search Console にログイン
2. 左メニューから「サイトマップ」を選択
3. 「新しいサイトマップの追加」に `sitemap.xml` を入力
4. 「送信」をクリック

---

## ⚠️ 注意事項

- **削除申請は一時的なもの**: Googleが再クロールすると再度表示される可能性があります。301リダイレクトが正しく設定されていれば、時間とともに自然に統合されます。
- **インデックス登録は1日の上限あり**: 1日に数個程度しかリクエストできないため、最重要ページから優先的に実施してください。
- **サイトマップは自動更新**: サイトマップを一度送信すれば、Googleが定期的にクロールします。

---

## 📊 期待される効果

1. **重複コンテンツの解消**: www/非wwwの統合により、SEO評価が分散しなくなります
2. **旧サイトの削除**: 不要なNetlifyサイトがインデックスから削除されます
3. **正規URLの優先**: すべての評価が `https://igrs.online/` に集約されます
4. **インデックス速度の向上**: 主要ページが優先的にインデックスされます

---

## 🎯 完了チェックリスト

- [ ] Phase 1: 旧Netlifyサイトの削除申請完了
- [ ] Phase 1: www付きURLの削除申請完了（任意）
- [ ] Phase 2: トップページのインデックス登録リクエスト完了
- [ ] Phase 2: 主要サービスページのインデックス登録リクエスト完了
- [ ] Phase 2: 料金・翻訳ページのインデックス登録リクエスト完了
- [ ] Phase 3: サイトマップ送信完了
- [ ] 1週間後: インデックス状況の確認
- [ ] 1ヶ月後: 検索結果の改善確認
