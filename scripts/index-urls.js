#!/usr/bin/env node
/**
 * Google Indexing API - Batch URL Submission
 * IGRS Online全ページを一括でGoogleにインデックス申請
 */

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// サービスアカウントキーのパス
const KEY_FILE_PATH = path.join(__dirname, '../service_account.json');

// IGRS Online 全URLリスト（20ページ）
const URLS = [
    // メインページ
    'https://igrs.online/',

    // 個人向けサービス
    'https://igrs.online/personal',
    'https://igrs.online/psa-birth-certificate',
    'https://igrs.online/marriage-certificate',
    'https://igrs.online/cenomar',
    'https://igrs.online/nbi-clearance',
    'https://igrs.online/lto-drivers-license',

    // 法人向けサービス
    'https://igrs.online/business',
    'https://igrs.online/dfa-apostille',
    'https://igrs.online/translation',

    // 情報ページ
    'https://igrs.online/company',
    'https://igrs.online/privacy',
    'https://igrs.online/contact',
    'https://igrs.online/track',
    'https://igrs.online/thank-you',

    // ブログ
    'https://igrs.online/blog',
    'https://igrs.online/blog-nbi-hit-guide',
    'https://igrs.online/blog-data-verification-guide',
    'https://igrs.online/blog-granway-compliance',
    'https://igrs.online/blog-philippines-documents-complexity',

    // 比較ページ
    'https://igrs.online/philippine-marriage-doc-cost-comparison'
];

async function indexURL(url, type = 'URL_UPDATED') {
    try {
        // サービスアカウントキーの存在確認
        if (!fs.existsSync(KEY_FILE_PATH)) {
            throw new Error(`❌ service_account.json が見つかりません: ${KEY_FILE_PATH}`);
        }

        // 認証設定
        const auth = new google.auth.GoogleAuth({
            keyFile: KEY_FILE_PATH,
            scopes: ['https://www.googleapis.com/auth/indexing'],
        });

        const authClient = await auth.getClient();
        const indexing = google.indexing({ version: 'v3', auth: authClient });

        // インデックス申請
        const response = await indexing.urlNotifications.publish({
            requestBody: {
                url: url,
                type: type, // URL_UPDATED or URL_DELETED
            },
        });

        console.log(`✅ ${url}`);
        return { url, success: true, data: response.data };
    } catch (error) {
        console.error(`❌ ${url}`);
        console.error(`   エラー: ${error.message}`);
        return { url, success: false, error: error.message };
    }
}

async function batchIndexURLs() {
    console.log('🚀 Google Indexing API - 一括送信開始\n');
    console.log(`📊 対象URL数: ${URLS.length}\n`);

    const results = [];

    for (const url of URLS) {
        const result = await indexURL(url);
        results.push(result);

        // API制限を考慮して少し待機（200ms）
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    // 結果サマリー
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    console.log('\n' + '='.repeat(60));
    console.log('📈 実行結果サマリー');
    console.log('='.repeat(60));
    console.log(`✅ 成功: ${successCount}/${URLS.length}`);
    console.log(`❌ 失敗: ${failCount}/${URLS.length}`);
    console.log('='.repeat(60));

    if (failCount > 0) {
        console.log('\n⚠️  失敗したURL:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`   - ${r.url}`);
            console.log(`     理由: ${r.error}`);
        });
    }

    return results;
}

// スクリプト実行
if (require.main === module) {
    batchIndexURLs()
        .then(() => {
            console.log('\n✨ 処理完了');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n💥 致命的エラー:', error);
            process.exit(1);
        });
}

module.exports = { indexURL, batchIndexURLs };
