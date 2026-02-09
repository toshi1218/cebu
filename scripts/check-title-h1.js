#!/usr/bin/env node
/**
 * Title & H1 Check Script
 * - <title>タグの存在確認
 * - <h1>タグの存在確認
 * - 同一ページ内での重複チェック
 */

const fs = require('fs');
const path = require('path');
const glob = require('./lib/glob');

const HTML_DIR = path.join(__dirname, '..', 'igrs-netlify');

function checkTitleH1() {
  const htmlFiles = glob.sync('**/*.html', { cwd: HTML_DIR }).filter((file) => !file.startsWith('partials/'));
  const errors = [];
  const titleMap = new Map(); // title → [files]

  for (const file of htmlFiles) {
    const filePath = path.join(HTML_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // <title>タグチェック
    const titleMatches = content.match(/<title[^>]*>([^<]*)<\/title>/gi);
    if (!titleMatches || titleMatches.length === 0) {
      errors.push({
        file,
        type: 'title',
        error: 'Missing <title> tag',
      });
    } else if (titleMatches.length > 1) {
      errors.push({
        file,
        type: 'title',
        error: `Duplicate <title> tags found (${titleMatches.length} times)`,
      });
    } else {
      // titleテキストを抽出して重複チェック用に保存
      const titleText = titleMatches[0].replace(/<\/?title[^>]*>/gi, '').trim();
      if (!titleMap.has(titleText)) {
        titleMap.set(titleText, []);
      }
      titleMap.get(titleText).push(file);
    }

    // <h1>タグチェック
    const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
    if (!h1Matches || h1Matches.length === 0) {
      errors.push({
        file,
        type: 'h1',
        error: 'Missing <h1> tag',
      });
    } else if (h1Matches.length > 1) {
      errors.push({
        file,
        type: 'h1',
        error: `Duplicate <h1> tags found (${h1Matches.length} times)`,
      });
    }
  }

  // 異なるページで同じtitleを使用しているケースを警告（エラーではなく警告）
  const warnings = [];
  for (const [title, files] of titleMap) {
    if (files.length > 1) {
      warnings.push({
        title: title.substring(0, 50) + (title.length > 50 ? '...' : ''),
        files,
      });
    }
  }

  return { errors, warnings };
}

function main() {
  console.log('🔍 Checking <title> and <h1> tags...\n');

  const { errors, warnings } = checkTitleH1();

  if (warnings.length > 0) {
    console.warn('⚠️  Warnings (same title used in multiple pages):\n');
    for (const warn of warnings) {
      console.warn(`  📄 Title: "${warn.title}"`);
      for (const file of warn.files) {
        console.warn(`     └── ${file}`);
      }
      console.warn('');
    }
  }

  if (errors.length > 0) {
    console.error('❌ Title/H1 check FAILED:\n');
    for (const err of errors) {
      console.error(`  📄 ${err.file}`);
      console.error(`     └── [${err.type}] ${err.error}\n`);
    }
    process.exit(1);
  }

  console.log('✅ All HTML files have proper <title> and <h1> tags.\n');
  process.exit(0);
}

main();
