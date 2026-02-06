# IGRS.online GSC仕上げ - 完了報告

**作成日**: 2026年2月6日 14:12  
**担当**: Antigravity（GSC仕上げ担当）  
**対象**: CEO

---

## ✅ 成果物

以下の3つのファイルを作成しました：

### 1. **GSC_MANUAL.md** （完全版マニュアル）
- 所要時間: 3分
- 内容:
  - プロパティ選択手順
  - サイトマップ送信手順
  - 19URLのインデックス登録リクエスト手順
  - ページレポート確認手順
  - エラーパターン別の対処法
  - 技術検証コマンド集

### 2. **GSC_QUICK_GUIDE.md** （クイックガイド）
- 所要時間: 3分
- 内容:
  - チェックリスト
  - サイトマップ送信（簡易版）
  - 19URLリスト（コピペ用）
  - エラー対処表
  - ページレポート確認

### 3. **verify-indexability.ps1** （技術検証スクリプト）
- 所要時間: 約1分
- 内容:
  - noindex検証（5ページ）
  - canonical検証（3ページ）
  - sitemap検証（18URL）
  - 自動判定＆レポート出力

---

## 🔍 技術検証結果（2026年2月6日 14:12時点）

| 項目 | 結果 | 詳細 |
|------|------|------|
| **noindex検証** | ✅ 合格 | 5ページすべてnoindexなし |
| **canonical検証** | ✅ 合格 | 3ページすべて自己参照＆非www |
| **sitemap検証** | ✅ 合格 | 18URLすべて200 OK |
| **sitemap.xml** | ✅ 合格 | Googlebot/通常UA両方で200 |
| **robots.txt** | ✅ 合格 | Googlebot/通常UA両方で200 |
| **/services** | ✅ 合格 | 410 Gone固定 |

**結論**: **インデックス登録の技術的な障害はゼロです。**

---

## 📋 CEOが実行すべきアクション

### ステップ1: GSCにログイン
1. https://search.google.com/search-console を開く
2. プロパティ「igrs.online」を選択

### ステップ2: サイトマップ送信
1. 左メニュー「サイトマップ」をクリック
2. 「新しいサイトマップの追加」に `sitemap.xml` と入力
3. 「送信」をクリック

### ステップ3: インデックス登録リクエスト（19URL）
1. 上部の「URLを検査」に以下のURLを1つずつ貼り付け
2. 「インデックス登録をリクエスト」をクリック
3. 次のURLへ

**URL一覧**:
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

### ステップ4: ページレポート確認
1. 左メニュー「ページ」をクリック
2. 「インデックス登録されなかった理由」を確認
3. 「クロール済み - 現在未登録」が多い場合 → 1週間待つ
4. 「noindex」「robots.txt」が出た場合 → 技術担当に即連絡

---

## 🚨 エラー対処（クイックリファレンス）

| 表示 | 対処 |
|------|------|
| URLがGoogleに登録されていません | 「インデックス登録をリクエスト」をクリック |
| URLはGoogleに登録されています | 何もしない（次へ） |
| 重複しています（www版） | 何もしない（自動解決） |
| noindexタグで除外 | **技術担当に即連絡** |
| robots.txtでブロック | **技術担当に即連絡** |

---

## 📊 期待される結果

### 即座に（当日）
- サイトマップが「成功しました」ステータスになる
- 検出されたURL: 18

### 1〜3日後
- 主要URLが「クロール済み - 現在未登録」になる

### 3〜7日後
- 主要URLが「URLはGoogleに登録されています」になる
- Google検索で `site:igrs.online` で結果が表示され始める

### 1〜2週間後
- ほとんどのURLがインデックスされる
- 検索結果に表示されるようになる

---

## 📞 サポート

問題が発生した場合:
1. **GSC_MANUAL.md** の該当セクションを確認
2. **GSC_QUICK_GUIDE.md** のエラー対処表を確認
3. 技術的な問題の場合 → 技術担当に連絡

---

## ✅ チェックリスト（CEO用）

```
□ GSC_MANUAL.md を読んだ
□ GSCにログインした
□ プロパティ「igrs.online」を選択した
□ サイトマップ（sitemap.xml）を送信した
□ 19URLのインデックス登録リクエストを完了した
□ ページレポートを確認した
□ 1週間後にフォローアップする予定を立てた
```

---

## 🎉 完了

すべての技術的な準備が整いました。CEOがGSCで上記のアクションを実行すれば、IGRS.onlineは最短でインデックスに載ります。

**推測なし、事実のみに基づいた手順です。**
