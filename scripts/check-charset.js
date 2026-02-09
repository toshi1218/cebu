#!/usr/bin/env node
/**
 * Charset Check Script
 * 全HTMLファイルに <meta charset="utf-8"> または <meta charset="UTF-8"> があることを確認
 */

const fs = require('fs');
const path = require('path');
const glob = require('./lib/glob');

const HTML_DIR = path.join(__dirname, '..', 'igrs-netlify');

function checkCharset() {
  const htmlFiles = glob.sync('**/*.html', { cwd: HTML_DIR }).filter((file) => !file.startsWith('partials/'));
  const errors = [];

  for (const file of htmlFiles) {
    const filePath = path.join(HTML_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // charset="utf-8" または charset="UTF-8" をチェック（大小文字無視）
    const hasCharset = /<meta\s+charset\s*=\s*["']?utf-8["']?\s*\/?>/i.test(content);

    if (!hasCharset) {
      errors.push({
        file,
        error: 'Missing <meta charset="utf-8">',
      });
    }
  }

  return errors;
}

function main() {
  console.log('🔍 Checking charset declarations...\n');

  const errors = checkCharset();

  if (errors.length > 0) {
    console.error('❌ Charset check FAILED:\n');
    for (const err of errors) {
      console.error(`  📄 ${err.file}`);
      console.error(`     └── ${err.error}\n`);
    }
    process.exit(1);
  }

  console.log('✅ All HTML files have charset="utf-8" declaration.\n');
  process.exit(0);
}

main();
