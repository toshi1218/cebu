export const languages = {
  ja: "日本語",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "ja";

export const ui = {
  ja: {
    // Site
    "site.title": "IGRS | フィリピン書類取得BPOパートナー",
    "site.description":
      "行政書士事務所・登録支援機関向け。フィリピン公的書類（PSA・NBI・LTO・DFA）の取得代行BPOサービス。",

    // Nav
    "nav.home": "ホーム",
    "nav.services": "サービス",
    "nav.cases": "対応案件",
    "nav.about": "会社概要",
    "nav.contact": "お問い合わせ",

    // Hero
    "hero.title": "フィリピン書類取得の",
    "hero.title.accent": "BPOパートナー",
    "hero.subtitle":
      "行政書士事務所・登録支援機関のフィリピン書類取得業務を一括代行。現地セブ島拠点の日本法人が、確実・迅速にお届けします。",
    "hero.cta": "無料相談・お見積もり",
    "hero.cta.secondary": "サービス詳細を見る",

    // Problems
    "problems.title": "このような課題をお持ちではありませんか？",
    "problems.1": "現地エージェントとの連絡が途絶え、進捗が見えない",
    "problems.2": "書類の不備で差戻しが発生し、案件が止まる",
    "problems.3": "複数名分の書類取得を一括で管理したい",
    "problems.4": "個人ブローカーとの取引に不安がある",
    "problems.5": "DFA認証まで含めた一括発注先を探している",

    // Why IGRS
    "why.title": "IGRSが選ばれる理由",
    "why.1.title": "現地一次情報へのアクセス",
    "why.1.text":
      "セブ島に実拠点を構え、PSA・NBI・LTO・DFA各窓口へ直接出向いて書類を取得します。オンラインでは取得できない書類や、窓口での交渉が必要なケースにも対応可能です。",
    "why.2.title": "日本法人としての信頼性",
    "why.2.text":
      "運営母体は日本法人（株式会社IGRS）です。請求書払い、案件台帳管理など、法人取引に必要な体制を整えています。",
    "why.3.title": "丸投げで完結する手軽さ",
    "why.3.text":
      "予約取得→窓口申請→受取→DFA認証→国際発送まで、すべて一括代行。必要情報をお送りいただくだけです。",
    "why.4.title": "進捗の可視化",
    "why.4.text":
      "週次での進捗報告を実施し、国際発送時には追跡番号を共有。受領確認まで責任を持って対応します。",

    // Services
    "services.title": "対応書類・サービス",
    "services.psa.title": "PSA証明書",
    "services.psa.desc": "出生証明書・婚姻証明書・CENOMAR（独身証明書）",
    "services.nbi.title": "NBI無犯罪証明書",
    "services.nbi.desc": "特定技能・就労ビザ申請に必要な無犯罪証明書",
    "services.lto.title": "LTO運転経歴証明書",
    "services.lto.desc": "外免切替に必要な運転経歴証明書・免許証",
    "services.dfa.title": "DFAアポスティーユ",
    "services.dfa.desc": "フィリピン外務省による公印確認・アポスティーユ認証",
    "services.translation.title": "翻訳サービス",
    "services.translation.desc": "フィリピン公文書の日本語翻訳",

    // Use Cases
    "usecases.title": "主な対応案件",
    "usecases.1.title": "国際結婚手続き",
    "usecases.1.desc":
      "婚姻届提出に必要なPSA出生証明書・CENOMAR・アポスティーユをまとめて取得",
    "usecases.2.title": "配偶者ビザ申請",
    "usecases.2.desc":
      "在留資格認定証明書交付申請に必要なフィリピン側書類をまとめて取得",
    "usecases.3.title": "帰化申請",
    "usecases.3.desc":
      "帰化許可申請に必要なPSA各種証明書・NBI無犯罪証明書の取得",
    "usecases.4.title": "外免切替",
    "usecases.4.desc":
      "フィリピン運転免許証の日本免許への切替に必要なLTO書類の取得",
    "usecases.5.title": "特定技能・技能実習",
    "usecases.5.desc":
      "フィリピン人材の受入れに必要なNBI無犯罪証明書・PSA書類の一括取得",

    // Pricing
    "pricing.title": "料金",
    "pricing.light.name": "ライトプラン",
    "pricing.light.price": "50,000",
    "pricing.light.unit": "円（税込）",
    "pricing.light.desc": "PSA書類1種 + DFAアポスティーユ + DHL発送",
    "pricing.pack.name": "パックプラン",
    "pricing.pack.price": "100,000",
    "pricing.pack.unit": "円（税込）",
    "pricing.pack.desc": "国際結婚/帰化申請/外免切替等の複合案件",
    "pricing.nbi.name": "NBI",
    "pricing.nbi.price": "55,000",
    "pricing.nbi.unit": "円（税込）",
    "pricing.nbi.desc": "NBI無犯罪証明書 + DFAアポスティーユ + DHL発送",
    "pricing.delivery": "納期：4週間",
    "pricing.note":
      "※10名以上の一括依頼は別途お見積もり。請求書払い対応可能。",

    // Flow
    "flow.title": "ご利用の流れ",
    "flow.1.title": "お問い合わせ",
    "flow.1.desc": "必要書類・人数・納期をお伺いします",
    "flow.2.title": "お見積もり",
    "flow.2.desc": "最適なプランをご提案いたします",
    "flow.3.title": "ご発注",
    "flow.3.desc": "必要情報をご提供いただきます",
    "flow.4.title": "取得代行・進捗報告",
    "flow.4.desc": "週次で進捗をご報告します",
    "flow.5.title": "納品",
    "flow.5.desc": "DHL国際便で日本へお届けします",

    // FAQ
    "faq.title": "よくあるご質問",
    "faq.1.q": "複数名分をまとめて依頼できますか？",
    "faq.1.a":
      "可能です。同梱発送で送料を抑え、案件台帳で一括管理いたします。10名以上の場合は別途お見積もりいたします。",
    "faq.2.q": "請求書払いは可能ですか？",
    "faq.2.a":
      "可能です。月末締め翌月末払い等、貴社の経理規定に合わせてご相談ください。",
    "faq.3.q": "継続的な取引は可能ですか？",
    "faq.3.a":
      "可能です。多くの行政書士事務所様・登録支援機関様から継続的にご依頼をいただいております。",
    "faq.4.q": "急ぎの案件に対応できますか？",
    "faq.4.a":
      "状況によります。まずはお問い合わせください。可能な限り対応いたします。",

    // CTA
    "cta.title": "無料相談・お見積もり",
    "cta.text":
      "提出先・期限・件数をお知らせいただければ、最適なプランをご提案します。",
    "cta.button": "無料相談・お見積もりはこちら",

    // About page
    "about.title": "会社概要",
    "about.subtitle": "株式会社IGRSについて",
    "about.info.title": "会社情報",
    "about.name.label": "商号",
    "about.name.value": "株式会社IGRS",
    "about.founded.label": "設立",
    "about.founded.value": "2020年6月1日",
    "about.hq.label": "本店所在地",
    "about.hq.value": "和歌山県和歌山市",
    "about.cebu.label": "セブ営業所",
    "about.cebu.value": "フィリピン共和国 セブ市",
    "about.business.label": "事業内容",
    "about.business.value":
      "フィリピン公的書類取得BPO・フィリピン企業進出支援",
    "about.ceo.label": "代表者",
    "about.ceo.value": "代表取締役 五十嵐",
    "about.email.label": "連絡先",

    // Contact page
    "contact.title": "お問い合わせ",
    "contact.subtitle": "無料相談・お見積もりはこちら",
    "contact.text":
      "必要書類の種類、件数、ご希望の納期をお知らせください。最適なプランをご提案いたします。",
    "contact.email": "メールでのお問い合わせ",
    "contact.email.address": "igrs20200601@gmail.com",
    "contact.hours": "対応時間",
    "contact.hours.value": "平日 9:00〜18:00（日本時間）",
    "contact.hours.note": "お問い合わせへの返信は原則翌営業日以内",

    // Services page
    "services.page.title": "サービス一覧",
    "services.page.subtitle": "行政書士事務所・登録支援機関向けBPOサービス",

    // Footer
    "footer.brand": "フィリピン書類取得代行センター",
    "footer.tagline":
      "現地フィリピンにおける行政手続きのボトルネックを解消し、お客様が本来の手続き業務に集中できる環境を提供します。",
    "footer.services": "サービス",
    "footer.company": "会社情報",
    "footer.operator": "運営",
    "footer.operator.value": "株式会社IGRS",
    "footer.japan.hq": "日本本社",
    "footer.japan.hq.value": "和歌山県和歌山市",
    "footer.ph.office": "フィリピン営業所",
    "footer.ph.office.value": "フィリピン共和国 セブ市",
    "footer.copyright": "2026 IGRS all rights reserved.",
    "footer.privacy": "プライバシーポリシー",
  },
  en: {
    // Site
    "site.title": "IGRS | Philippine Document Procurement BPO Partner",
    "site.description":
      "Philippine document procurement BPO for immigration law firms. PSA, NBI, LTO, DFA documents with apostille certification delivered to your office.",

    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.cases": "Cases",
    "nav.about": "About",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "Your Philippine Document",
    "hero.title.accent": "Procurement Partner",
    "hero.subtitle":
      "We handle all Philippine government document procurement for immigration law firms. From PSA certificates to NBI clearances with DFA apostille — delivered directly to your office.",
    "hero.cta": "Request a Quote",
    "hero.cta.secondary": "View Services",

    // Problems
    "problems.title": "Challenges You May Be Facing",
    "problems.1":
      "Unreliable local agents with no visibility into document procurement progress",
    "problems.2":
      "Document deficiencies causing delays and resubmissions for your immigration cases",
    "problems.3":
      "Managing document procurement for multiple clients simultaneously",
    "problems.4":
      "Risk and uncertainty when dealing with individual freelance brokers",
    "problems.5":
      "Need a single vendor for complete document procurement including DFA apostille",

    // Why IGRS
    "why.title": "Why Law Firms Choose IGRS",
    "why.1.title": "Direct Access to Philippine Government Offices",
    "why.1.text":
      "Our Cebu-based team visits PSA, NBI, LTO, and DFA offices directly. We handle documents that cannot be obtained online and cases requiring in-person negotiation at government windows.",
    "why.2.title": "Japanese Corporation — Reliable Business Partner",
    "why.2.text":
      "IGRS Corporation is a registered Japanese company. We provide corporate-level service with invoice billing, case management, and professional accountability.",
    "why.3.title": "End-to-End Service",
    "why.3.text":
      "From appointment booking to document collection, DFA apostille, and international shipping — we handle everything. Simply provide the required information.",
    "why.4.title": "Full Transparency & Tracking",
    "why.4.text":
      "Weekly progress reports, DHL tracking numbers for international shipments, and delivery confirmation. Full visibility throughout the process.",

    // Services
    "services.title": "Documents & Services",
    "services.psa.title": "PSA Certificates",
    "services.psa.desc":
      "Birth Certificates, Marriage Certificates, CENOMAR (Certificate of No Marriage)",
    "services.nbi.title": "NBI Clearance",
    "services.nbi.desc":
      "National Bureau of Investigation clearance for visa and immigration applications",
    "services.lto.title": "LTO Driver's Records",
    "services.lto.desc":
      "Land Transportation Office driving records and license verification",
    "services.dfa.title": "DFA Apostille",
    "services.dfa.desc":
      "Department of Foreign Affairs apostille authentication for international use",
    "services.translation.title": "Translation Services",
    "services.translation.desc":
      "Certified translation of Philippine government documents",

    // Use Cases
    "usecases.title": "Immigration Cases We Support",
    "usecases.1.title": "K-1 Fiancé Visa",
    "usecases.1.desc":
      "PSA birth certificates, CENOMAR, NBI clearance, and police certificates required for K-1 visa petitions",
    "usecases.2.title": "CR-1 Spouse Visa",
    "usecases.2.desc":
      "Complete document packages for CR-1/IR-1 spouse visa applications including PSA marriage certificates",
    "usecases.3.title": "Student & Exchange Visas",
    "usecases.3.desc":
      "NBI clearances and PSA documents for F-1 student visa and J-1 exchange visitor applications",
    "usecases.4.title": "Work Visa & Employment",
    "usecases.4.desc":
      "Philippine document procurement for H-1B, L-1, and employment-based immigration cases",
    "usecases.5.title": "Naturalization & Citizenship",
    "usecases.5.desc":
      "PSA certificates, NBI clearances, and apostilled documents for U.S. naturalization applications",

    // Pricing
    "pricing.title": "Pricing",
    "pricing.light.name": "Standard",
    "pricing.light.price": "350",
    "pricing.light.unit": "USD",
    "pricing.light.desc":
      "1 PSA document + DFA Apostille + DHL international shipping",
    "pricing.pack.name": "Bundle Package",
    "pricing.pack.price": "650",
    "pricing.pack.unit": "USD",
    "pricing.pack.desc":
      "Multiple documents for complex immigration cases (K-1, CR-1, naturalization)",
    "pricing.nbi.name": "NBI Clearance",
    "pricing.nbi.price": "375",
    "pricing.nbi.unit": "USD",
    "pricing.nbi.desc":
      "NBI Clearance + DFA Apostille + DHL international shipping",
    "pricing.delivery": "Delivery: 4 weeks",
    "pricing.note":
      "Volume discounts available for 10+ cases. Invoice billing available.",

    // Flow
    "flow.title": "How It Works",
    "flow.1.title": "Contact Us",
    "flow.1.desc":
      "Tell us what documents you need, quantity, and timeline",
    "flow.2.title": "Get a Quote",
    "flow.2.desc": "We'll propose the best plan for your cases",
    "flow.3.title": "Place Order",
    "flow.3.desc": "Provide the required information for each case",
    "flow.4.title": "Procurement & Updates",
    "flow.4.desc": "We handle everything with weekly progress reports",
    "flow.5.title": "Delivery",
    "flow.5.desc": "Documents shipped via DHL to your office",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.1.q": "Can I submit multiple cases at once?",
    "faq.1.a":
      "Yes. We manage all cases through our tracking system and can consolidate shipments to reduce costs. Volume discounts are available for 10+ cases.",
    "faq.2.q": "Do you offer invoice billing?",
    "faq.2.a":
      "Yes. We offer flexible billing arrangements to accommodate your firm's accounting requirements.",
    "faq.3.q": "Can we establish an ongoing business relationship?",
    "faq.3.a":
      "Absolutely. Many immigration law firms rely on us as their dedicated Philippine document procurement partner.",
    "faq.4.q": "Can you handle rush orders?",
    "faq.4.a":
      "It depends on the situation. Please contact us and we'll do our best to accommodate your timeline.",

    // CTA
    "cta.title": "Ready to Streamline Your Philippine Document Procurement?",
    "cta.text":
      "Tell us what documents you need and your timeline. We'll propose the most efficient solution for your firm.",
    "cta.button": "Request a Free Quote",

    // About page
    "about.title": "About Us",
    "about.subtitle": "About IGRS Corporation",
    "about.info.title": "Company Information",
    "about.name.label": "Company Name",
    "about.name.value": "IGRS Corporation (株式会社IGRS)",
    "about.founded.label": "Founded",
    "about.founded.value": "June 1, 2020",
    "about.hq.label": "Japan Headquarters",
    "about.hq.value": "Wakayama City, Wakayama, Japan",
    "about.cebu.label": "Cebu Office",
    "about.cebu.value": "Cebu City, Philippines",
    "about.business.label": "Business",
    "about.business.value":
      "Philippine government document procurement BPO / Business entry support to the Philippines",
    "about.ceo.label": "CEO",
    "about.ceo.value": "Igarashi",
    "about.email.label": "Contact",

    // Contact page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get a Free Quote",
    "contact.text":
      "Tell us the document types you need, the number of cases, and your preferred timeline. We'll propose the best solution.",
    "contact.email": "Email",
    "contact.email.address": "igrs20200601@gmail.com",
    "contact.hours": "Business Hours",
    "contact.hours.value": "Mon-Fri 9:00-18:00 (Japan Time / GMT+9)",
    "contact.hours.note": "We typically respond within one business day",

    // Services page
    "services.page.title": "Our Services",
    "services.page.subtitle":
      "Philippine Document Procurement for Immigration Law Firms",

    // Footer
    "footer.brand": "Philippine Document Procurement Center",
    "footer.tagline":
      "We eliminate the bottleneck of Philippine government document procurement, so you can focus on your clients' immigration cases.",
    "footer.services": "Services",
    "footer.company": "Company",
    "footer.operator": "Operator",
    "footer.operator.value": "IGRS Corporation",
    "footer.japan.hq": "Japan HQ",
    "footer.japan.hq.value": "Wakayama City, Japan",
    "footer.ph.office": "Philippines Office",
    "footer.ph.office.value": "Cebu City, Philippines",
    "footer.copyright": "2026 IGRS all rights reserved.",
    "footer.privacy": "Privacy Policy",
  },
} as const;
