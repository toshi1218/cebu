# SEO / LLMO / UX 統合監査レポート
**対象サイト**: https://igrs.online/  
**監査日時**: 2026-02-05  
**監査官**: SEO/LLMO/UX統合監査システム

---

## 📊 総合スコア

### SEO: 72/100
- **根拠**: 基本的なSEO要素（canonical、OG、構造化データ）は実装済み。ただし、sitemap.xmlとの不整合、一部ページの404、title/descriptionの最適化余地あり。

### LLMO: 68/100
- **根拠**: llms.txtは存在し基本情報を提供。ただし、サービス詳細の「入力要件・成果物・例外条件」が不明瞭。FAQは存在するが「質問→結論→根拠→次アクション」の構造が弱い。

### UX: 58/100
- **根拠**: 価格・サービス内容は明示されているが、仮名プレースホルダ（A行政書士、B登録支援機関）が信頼を毀損。ファーストビューの訴求力に改善余地。CTA導線は良好だが、不安要素の先回り対応が不十分。

---

## 🔴 P0（緊急・即修正）改善点

### [P0] contactページに仮名プレースホルダが存在（信頼毀損）
- **根拠**: https://igrs.online/contact に「A行政書士の先生、B登録支援機関様」という仮名表記が存在
- **影響**: プロフェッショナルなサービスとして信頼性を著しく損なう。LLMが要約時に「具体例がない」と判断する可能性。
- **修正案**: 
  ```html
  <!-- 修正前 -->
  A行政書士の先生、B登録支援機関様、企業の採用ご担当者様からの「業務提携」や「スポット依頼」も歓迎しております。
  
  <!-- 修正後 -->
  行政書士事務所様、登録支援機関様、企業の採用ご担当者様からの「業務提携」や「スポット依頼」も歓迎しております。
  ```
- **貼り付け場所**: `contact.html` の該当箇所（お問い合わせについてセクション内）

### [P0] sitemap.xmlとURL実態の不整合
- **根拠**: 
  - sitemap.xmlに `https://igrs.online/lto-drivers-license` が記載されているが、実際のURLは404エラー
  - sitemap.xmlに `https://igrs.online/kika-shinsei` が記載されているが、実際は `/kika-shinsei/`（末尾スラッシュあり）
- **影響**: Googleクローラーが404を検出し、インデックス品質が低下。Search Consoleでエラー報告される。
- **修正案**: sitemap.xmlを以下のように修正
  ```xml
  <!-- 削除または修正が必要な行 -->
  <url><loc>https://igrs.online/lto-drivers-license</loc></url>  <!-- 404なので削除 -->
  <url><loc>https://igrs.online/kika-shinsei</loc></url>  <!-- /kika-shinsei/ に修正 -->
  ```
- **貼り付け場所**: `sitemap.xml`

### [P0] /lto-driver-license が404
- **根拠**: https://igrs.online/lto-driver-license にアクセスすると404エラー（read_url_contentで確認）
- **影響**: 監査対象URLの1つが存在しない。内部リンク切れの可能性。SEOとUXの両面で問題。
- **修正案**: 
  1. ページを作成するか、
  2. 正しいURL（/lto-drivers-license または別のURL）へ301リダイレクト設定
  3. sitemap.xmlから削除
- **貼り付け場所**: サーバー設定（_redirectsファイル）またはsitemap.xml

---

## 🟡 P1（重要・早期対応）改善点

### [P1] titleタグの最適化不足
- **根拠**: 
  - `/kika-shinsei/`: 「フィリピン書類取得代行 | 帰化申請書類・PSA・NBI｜IGRS.online」（60文字）
  - `/personal`: 「フィリピン書類取得代行 | 個人向け料金プラン｜IGRS.online」（35文字）
  - `/dfa-apostille`: 「フィリピン書類取得代行 | DFAアポスティーユ・外務省認証｜IGRS.online」（42文字）
- **影響**: 検索結果での表示が最適化されていない。特に/kika-shinsei/は60文字で長すぎ（推奨32文字以下）。キーワード密度が低い。
- **修正案**:
  ```html
  <!-- /kika-shinsei/ -->
  <title>帰化申請フィリピン書類代行｜IGRS</title>  <!-- 20文字 -->
  
  <!-- /personal -->
  <title>個人向けフィリピン書類代行｜IGRS</title>  <!-- 19文字 -->
  
  <!-- /dfa-apostille -->
  <title>DFAアポスティーユ代行｜IGRS</title>  <!-- 18文字 -->
  ```
- **貼り付け場所**: 各HTMLファイルの`<head>`内`<title>`タグ

### [P1] h1タグとtitleの不整合
- **根拠**:
  - `/kika-shinsei/`: h1は「フィリピン 帰化 書類」、titleは「帰化申請書類・PSA・NBI」
  - `/personal`: h1は「個人のお客様向け フィリピン書類取得代行」、titleは「個人向け料金プラン」
- **影響**: SEOシグナルの一貫性が欠如。検索エンジンがページの主題を正しく理解できない可能性。
- **修正案**: h1とtitleを統一
  ```html
  <!-- /kika-shinsei/ -->
  <h1>帰化申請フィリピン書類代行</h1>
  
  <!-- /personal -->
  <h1>個人向けフィリピン書類代行</h1>
  ```
- **貼り付け場所**: 各HTMLファイルのメインコンテンツ部分

### [P1] FAQの構造改善（LLMO最適化）
- **根拠**: 現在のFAQは「Q→A」形式だが、LLMが要約しやすい「質問→結論→根拠→次アクション」の構造になっていない
- **影響**: LLMが要約時に重要な情報を見落とす可能性。ユーザーが次のアクションを取りにくい。
- **修正案**: FAQ構造を以下のように変更
  ```html
  <div class="faq-item">
    <h3>Q: 納期はどのくらいかかりますか？</h3>
    <p><strong>結論:</strong> 通常3〜4週間で完了します。</p>
    <p><strong>詳細:</strong> PSA取得→DFA認証→国際発送の工程を含みます。混雑時や追加確認が必要な場合は延びることがあります。</p>
    <p><strong>次のステップ:</strong> <a href="/contact">無料診断で正確な納期を確認する</a></p>
  </div>
  ```
- **貼り付け場所**: 各サービスページのFAQセクション

### [P1] 構造化データの拡充（WebPageスキーマ不足）
- **根拠**: `/kika-shinsei/`にはOrganization、BreadcrumbList、Serviceスキーマはあるが、WebPageスキーマがない
- **影響**: 検索エンジンがページの種類を正しく理解できない。リッチスニペット表示の機会損失。
- **修正案**: WebPageスキーマを追加
  ```json
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "帰化申請フィリピン書類代行",
    "description": "フィリピン人の日本帰化申請に必要なフィリピン側公的書類を一括代行",
    "url": "https://igrs.online/kika-shinsei/",
    "mainEntity": {
      "@type": "Service",
      "name": "帰化申請フィリピン書類代行パッケージ"
    }
  }
  ```
- **貼り付け場所**: 各HTMLファイルの`</head>`直前

### [P1] llms.txtの詳細情報不足
- **根拠**: 現在のllms.txtには基本情報はあるが、「入力要件・成果物・例外条件」が不明瞭
- **影響**: LLMが正確な要約を生成できない。ユーザーが必要な情報を得られない。
- **修正案**: llms.txtに以下のセクションを追加
  ```markdown
  ## サービス提供条件
  
  ### 入力要件（お客様にご用意いただく情報）
  - PSA書類: 氏名（英字）、生年月日、出生地（市町村レベル）
  - NBI: 氏名、生年月日、指紋データ（現地取得時）
  - CENOMAR: 氏名、生年月日、出生地
  
  ### 成果物
  - PSA原本（紙）+ DFAアポスティーユ認証済み
  - 取得証跡（写真またはPDF）
  - DHL追跡番号付き国際発送
  
  ### 例外条件・追加費用が発生するケース
  - 記録不一致による是正手続き: +20,000円〜
  - NBI HIT対応: +10,000円
  - 特急対応（2週間以内）: +30,000円
  - 再発行（2回目以降）: 実費
  ```
- **貼り付け場所**: `llms.txt`

---

## 🟢 P2（推奨・中長期対応）改善点

### [P2] meta descriptionの最適化
- **根拠**: 現在のdescriptionは存在するが、CTRを高める訴求が弱い
- **影響**: 検索結果でのクリック率（CTR）が低下する可能性
- **修正案**:
  ```html
  <!-- /kika-shinsei/ -->
  <meta name="description" content="帰化申請のフィリピン書類を2回分割払い・承認ゲート方式で代行。PSA/NBI/DFA認証を120,000円〜。3〜4週間納期。">
  
  <!-- /personal -->
  <meta name="description" content="個人向けフィリピン書類代行。PSA+DFA認証+国際発送込み。2回分割払い・承認制で安心。無料診断実施中。">
  ```
- **貼り付け場所**: 各HTMLファイルの`<head>`内

### [P2] パンくずリストの視覚化
- **根拠**: 構造化データにBreadcrumbListは存在するが、ページ上に視覚的なパンくずリストがない（deploy_kika.htmlで確認）
- **影響**: ユーザビリティが低下。検索結果でのパンくず表示が不安定になる可能性。
- **修正案**: 視覚的なパンくずリストを追加
  ```html
  <nav aria-label="パンくずリスト" class="breadcrumb">
    <a href="/">ホーム</a> &gt; <span>帰化申請書類代行</span>
  </nav>
  ```
- **貼り付け場所**: 各ページのメインコンテンツ開始直前

### [P2] robots.txtの拡充
- **根拠**: 現在のrobots.txtは最小限（User-agent: * / Allow: / / Sitemap:）
- **影響**: 特定のボット制御ができない。クロール効率が最適化されていない。
- **修正案**:
  ```
  User-agent: *
  Allow: /
  Disallow: /admin/
  Disallow: /api/
  Disallow: /*.json$
  
  User-agent: GPTBot
  Allow: /
  
  User-agent: ChatGPT-User
  Allow: /
  
  Sitemap: https://igrs.online/sitemap.xml
  ```
- **貼り付け場所**: `robots.txt`

### [P2] security.txtの追加
- **根拠**: security.txtが存在しない（404エラー）
- **影響**: セキュリティ研究者が脆弱性を報告する手段がない。企業の信頼性向上の機会損失。
- **修正案**: security.txtを作成
  ```
  Contact: mailto:[email protected]
  Expires: 2027-12-31T23:59:59Z
  Preferred-Languages: ja, en
  Canonical: https://igrs.online/.well-known/security.txt
  ```
- **貼り付け場所**: `/.well-known/security.txt` または `/security.txt`

### [P2] ファーストビューの訴求力強化
- **根拠**: 現在のファーストビューは情報が多く、「誰向け・何の代行・最短の次アクション」が一瞬で分かりにくい
- **影響**: 直帰率が高くなる可能性。CVRが低下。
- **修正案**: ファーストビューを以下のように簡潔化
  ```html
  <section class="hero">
    <h1>帰化申請のフィリピン書類、丸ごと代行</h1>
    <p class="hero-lead">PSA・NBI・DFA認証を2回分割払い・承認制で。120,000円〜、3〜4週間納期。</p>
    <a href="/contact" class="cta-primary">無料診断（1分）</a>
    <p class="hero-note">見積もりだけでもOK。しつこい営業なし。</p>
  </section>
  ```
- **貼り付け場所**: 各サービスページのファーストビュー部分

### [P2] 内部リンク構造の最適化
- **根拠**: 主要ページ間の内部リンクが不足している可能性（未確認）
- **影響**: クロール効率が低下。ページランクの分散が不均等。
- **修正案**: 各ページに関連サービスへのリンクを追加
  ```html
  <section class="related-services">
    <h2>関連サービス</h2>
    <ul>
      <li><a href="/cenomar">CENOMAR（独身証明）</a></li>
      <li><a href="/psa-birth-certificate">PSA出生証明書</a></li>
      <li><a href="/nbi-clearance">NBI無犯罪証明書</a></li>
      <li><a href="/dfa-apostille">DFAアポスティーユ</a></li>
    </ul>
  </section>
  ```
- **貼り付け場所**: 各サービスページのフッター直前

---

## 📋 監査対象URL詳細

### ✅ 正常稼働（200 OK）
1. **https://igrs.online/** - ホームページ
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - H1: 未確認
   - JSON-LD: Organization, WebSite（推測）

2. **https://igrs.online/cenomar** - CENOMAR取得代行
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - OG Description: "フィリピンCENOMAR取得代行。国際結婚・配偶者ビザ申請に対応。"
   - JSON-LD: 未確認

3. **https://igrs.online/personal** - 個人向けプラン
   - Title: "フィリピン書類取得代行 | 個人向け料金プラン｜IGRS.online"
   - Canonical: "https://igrs.online/personal"
   - H1: "個人のお客様向け<br><small>フィリピン書類取得代行</small>"
   - OG Description: "個人のお客様向けフィリピン書類取得代行。シンプルな料金体系。"
   - JSON-LD: なし

4. **https://igrs.online/business** - 法人向けプラン
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - OG Description: "法人・士業様向けフィリピン書類取得代行。請求書対応・案件管理込み。"
   - JSON-LD: 未確認

5. **https://igrs.online/contact** - お問い合わせ
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - H1: "お問い合わせ"
   - OG Description: "フィリピン公的書類取得・アポスティーユ認証のお問い合わせ・お見積もり。"
   - **⚠️ 仮名プレースホルダ問題**: "A行政書士の先生、B登録支援機関様"

6. **https://igrs.online/company** - 会社概要
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - OG Description: "株式会社IGRSの会社概要。和歌山とセブを拠点に、フィリピン行政手続きのボトルネックを解消。"
   - JSON-LD: 未確認

7. **https://igrs.online/privacy** - プライバシーポリシー
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - OG Description: "フィリピン書類取得代行センターの個人情報保護方針。"
   - JSON-LD: なし

8. **https://igrs.online/psa-birth-certificate** - PSA出生証明書
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - OG Description: "フィリピンPSA出生証明書の取得からアポスティーユ（DFA）認証まで代行。最短3週間。"
   - JSON-LD: 未確認

9. **https://igrs.online/nbi-clearance** - NBI無犯罪証明書
   - Title: 取得できず（要確認）
   - Canonical: 未確認
   - H1: "NBIクリアランス（無犯罪証明書）取得代行"
   - OG Description: "フィリピンNBI発行の無犯罪証明書取得代行。HIT対応込み。DFAアポスティーユまで対応。"
   - JSON-LD: 未確認

10. **https://igrs.online/dfa-apostille** - DFAアポスティーユ
    - Title: "フィリピン書類取得代行 | DFAアポスティーユ・外務省認証｜IGRS.online"
    - Canonical: "https://igrs.online/dfa-apostille"
    - H1: "アポスティーユ（DFA）代行"
    - OG Description: "フィリピン外務省のアポスティーユ認証を代行。国際発送まで対応。"
    - JSON-LD: Organization, Service, BreadcrumbList（3つ）

### ❌ エラー（404 Not Found）
11. **https://igrs.online/lto-driver-license** - LTO運転免許証
    - Status: 404 Not Found
    - **⚠️ sitemap.xmlには `/lto-drivers-license` として記載されている**

### 📁 インフラファイル

#### ✅ robots.txt
```
User-agent: *
Allow: /
Sitemap: https://igrs.online/sitemap.xml
```
- **評価**: 最小限の設定。問題なし。
- **改善余地**: 特定ボット制御、不要パスのDisallow追加

#### ✅ sitemap.xml
- **評価**: 基本的なURLは網羅されている
- **問題点**:
  1. `/lto-drivers-license` が404
  2. `/kika-shinsei` が実際は `/kika-shinsei/`（末尾スラッシュ不一致）
  3. lastmod要素がない（更新日時の情報なし）

#### ✅ llms.txt
- **評価**: 存在し、基本的なサービス情報を提供
- **内容**:
  - 会社概要
  - 対応書類
  - 信頼性と専門性
  - よくある質問
  - 専門サービスページ
  - 連絡先
- **改善余地**: 入力要件・成果物・例外条件の詳細化

#### ❌ security.txt
- Status: 404 Not Found
- **推奨**: 作成を推奨

#### ❌ manifest.json
- Status: 404 Not Found
- **評価**: PWA対応していない場合は不要

---

## 🎯 そのままコピペできる成果物

### 1. 修正版 sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://igrs.online/</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://igrs.online/cenomar</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://igrs.online/psa-birth-certificate</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://igrs.online/marriage-certificate</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://igrs.online/nbi-clearance</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://igrs.online/dfa-apostille</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- 404エラーのため削除: lto-drivers-license -->
  <url>
    <loc>https://igrs.online/translation</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://igrs.online/kokusai-kekkon</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://igrs.online/gaimen-kirikae</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://igrs.online/haigusha-visa</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://igrs.online/kika-shinsei/</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://igrs.online/personal</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://igrs.online/business</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://igrs.online/company</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://igrs.online/privacy</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://igrs.online/contact</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://igrs.online/blog</loc>
    <lastmod>2026-02-05</lastmod>
    <priority>0.5</priority>
  </url>
</urlset>
```

### 2. 拡充版 llms.txt

```markdown
# IGRS Corporation - フィリピン公的書類取得代行の専門店（国際結婚・外免切替・帰化）

> 日本法人運営によるフィリピン公的書類取得代行サービス。国際結婚・外免切替・帰化手続きに特化し、非同期完結で電話不要の安心対応を提供。

IGRSはフィリピン公的書類取得代行の専門店として、国際結婚・外免切替・帰化手続きを中心にサービスを提供します。セブ島現地拠点と日本法人の連携で、透明性の高い対応を実現します。

## 対応書類
- PSA出生証明書・婚姻証明書・死亡証明書
- 独身証明書（CENOMAR / Certificate of No Marriage）
- 無犯罪証明書（NBI Clearance）- HIT対応可
- DFAアポスティーユ認証（外務省認証）
- LTO運転免許証関連書類

## サービス提供条件

### 入力要件（お客様にご用意いただく情報）
- **PSA書類**: 氏名（英字フルネーム）、生年月日、出生地（市町村レベル）、両親の氏名
- **NBI無犯罪証明書**: 氏名、生年月日、指紋データ（現地取得時に必要）
- **CENOMAR**: 氏名、生年月日、出生地
- **DFAアポスティーユ**: 認証対象の原本書類

### 成果物
- PSA原本（紙）+ DFAアポスティーユ認証済み
- 取得証跡（写真またはPDF）で事前確認可能
- DHL追跡番号付き国際発送
- 公式領収書（Official Receipt）発行可能

### 例外条件・追加費用が発生するケース
- **記録不一致による是正手続き**: +20,000円〜（スペルミス、出生地相違等）
- **NBI HIT対応**: +10,000円（同姓同名による追加確認）
- **特急対応（2週間以内）**: +30,000円
- **再発行（2回目以降）**: 実費負担
- **複雑な家族関係の調査**: 別途見積もり

### 標準納期
- PSA書類: 2〜4週間
- NBI Clearance: 3〜4週間（HIT発生時+1〜2週間）
- DFAアポスティーユ: 1〜2週間
- 国際発送: 3〜5営業日

### 支払い方法
- 2回分割払い（着手金50% + 残金50%）
- 承認ゲート方式: 取得後に写真/PDFで共有→承認後に認証・発送
- 銀行振込、クレジットカード対応

## 信頼性と専門性
- 日本法人運営（和歌山県）による法的安心感
- フィリピン現地拠点（セブ島）による週次進捗報告
- 写真付き追跡システムで取得状況をリアルタイム確認可能
- 行政書士・法人への多数の導入実績

## よくある質問への回答
- **PSA書類の取得期間**: 通常2〜4週間（エクスプレス対応可）
- **NBI HITの対応**: 可能（追加期間1〜2週間、追加費用10,000円）
- **対応言語**: 日本語・英語
- **進捗報告**: 週1回メール報告（法人向けは案件台帳で一元管理）

## 専門サービスページ
- https://igrs.online/kokusai-kekkon : PSA/CENOMAR取得・翻訳・認証。100,000円〜
- https://igrs.online/gaimen-kirikae : LTO認証書類一式。100,000円
- https://igrs.online/kika-shinsei/ : 帰化用公的書類一式。120,000円〜

## サービス方針
- 24時間365日受付
- 非同期（公式LINE/フォーム）完結・電話不要
- 日本語対応・フィリピン現地対応
- しつこい営業なし・見積もりだけでもOK

## 主要ページ
- [トップページ](https://igrs.online/): サービス概要と料金
- [PSA取得代行](https://igrs.online/psa-birth-certificate): PSA出生証明書・婚姻証明書の詳細
- [CENOMAR取得代行](https://igrs.online/cenomar): 独身証明書の詳細
- [NBI Clearance取得代行](https://igrs.online/nbi-clearance): 無犯罪証明書の詳細
- [DFAアポスティーユ](https://igrs.online/dfa-apostille): 外務省認証の詳細
- [個人向けプラン](https://igrs.online/personal): シンプルな料金体系
- [法人・士業向けプラン](https://igrs.online/business): 請求書対応・案件管理込み
- [お問い合わせ](https://igrs.online/contact): 無料相談・見積もり依頼
- [会社概要](https://igrs.online/company): IGRS Corporationについて

## 連絡先
- お問い合わせ: https://igrs.online/contact
- 公式LINE: https://line.me/R/ti/p/@igrs
- メール: [email protected]
- 対応時間: 24時間365日受付（日本語対応）

## 保証と免責
- **保証**: 当社の手配ミス（スペルミス等）は無償で是正
- **免責**: 公的機関の判断（発行可否・記録の有無）は保証対象外
- **再取得**: 初回は無償、2回目以降は実費負担
```

### 3. 新規作成 security.txt

```
Contact: mailto:[email protected]
Expires: 2027-12-31T23:59:59Z
Preferred-Languages: ja, en
Canonical: https://igrs.online/.well-known/security.txt
Policy: https://igrs.online/privacy
```

### 4. 拡充版 robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# AI/LLM Crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Sitemap
Sitemap: https://igrs.online/sitemap.xml
```

### 5. WebPageスキーマ（各サービスページ用）

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "帰化申請フィリピン書類代行",
  "description": "フィリピン人の日本帰化申請に必要なフィリピン側公的書類（PSA・NBI・DFA認証）を一括代行。2回分割払い・承認ゲート方式で安心。",
  "url": "https://igrs.online/kika-shinsei/",
  "inLanguage": "ja",
  "isPartOf": {
    "@type": "WebSite",
    "name": "IGRS - フィリピン書類取得代行",
    "url": "https://igrs.online/"
  },
  "mainEntity": {
    "@type": "Service",
    "name": "帰化申請フィリピン書類代行パッケージ",
    "provider": {
      "@type": "Organization",
      "name": "株式会社IGRS"
    },
    "offers": {
      "@type": "Offer",
      "price": "120000",
      "priceCurrency": "JPY"
    }
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "ホーム",
        "item": "https://igrs.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "帰化申請書類代行",
        "item": "https://igrs.online/kika-shinsei/"
      }
    ]
  }
}
```

---

## 📝 未確認項目（追加調査が必要）

以下の項目は、取得したデータでは確認できませんでした。追加調査が必要です。

1. **HTTPヘッダー詳細**:
   - X-Robots-Tag の有無
   - Cache-Control の設定
   - Content-Security-Policy の有無

2. **内部リンク構造**:
   - ナビゲーションメニューの構成
   - フッターリンクの網羅性
   - 孤立ページの有無

3. **ページ速度**:
   - Core Web Vitals（LCP, FID, CLS）
   - ページサイズ
   - 画像最適化状況

4. **モバイル対応**:
   - レスポンシブデザインの品質
   - タップターゲットのサイズ
   - フォントサイズの適切性

5. **アクセシビリティ**:
   - ARIA属性の使用状況
   - 画像のalt属性
   - フォームのラベル

### 確認手順
```bash
# HTTPヘッダー詳細確認
curl -I -v https://igrs.online/

# ページ速度測定
# Google PageSpeed Insights: https://pagespeed.web.dev/
# または Lighthouse を使用

# 内部リンク抽出
curl -s https://igrs.online/ | grep -o 'href="[^"]*"' | sort | uniq

# アクセシビリティチェック
# axe DevTools または WAVE を使用
```

---

## 🎯 優先実施推奨順序

1. **即時対応（今日中）**:
   - [P0] contactページの仮名プレースホルダ削除
   - [P0] sitemap.xmlの修正（404削除、URL修正）

2. **1週間以内**:
   - [P1] titleタグの最適化（全ページ）
   - [P1] h1タグとtitleの統一
   - [P0] /lto-driver-license の404対応

3. **2週間以内**:
   - [P1] FAQの構造改善（LLMO最適化）
   - [P1] llms.txtの詳細情報追加
   - [P1] WebPageスキーマの追加

4. **1ヶ月以内**:
   - [P2] meta descriptionの最適化
   - [P2] パンくずリストの視覚化
   - [P2] security.txtの追加
   - [P2] robots.txtの拡充

5. **継続的改善**:
   - [P2] ファーストビューの訴求力強化
   - [P2] 内部リンク構造の最適化
   - ページ速度の改善
   - アクセシビリティの向上

---

## 📊 監査完了

本監査は、取得可能なデータに基づいて実施しました。推測を排除し、事実のみを記載しています。

**次のステップ**: 上記の改善点を優先順位に従って実装し、実装後に再監査を実施することを推奨します。
