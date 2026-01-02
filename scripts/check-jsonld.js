#!/usr/bin/env node
/**
 * JSON-LD Check Script
 * <script type="application/ld+json"> のJSONパースエラーを検出
 */

const fs = require('fs');
const path = require('path');
const glob = require('./lib/glob');

const HTML_DIR = path.join(__dirname, '..', 'igrs-netlify');

function extractJsonLd(content) {
  const results = [];
  const regex = /<script\s+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = regex.exec(content)) !== null) {
    results.push(match[1].trim());
  }

  return results;
}

function checkJsonLd() {
  const htmlFiles = glob.sync('**/*.html', { cwd: HTML_DIR });
  const errors = [];

  for (const file of htmlFiles) {
    const filePath = path.join(HTML_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const jsonLdBlocks = extractJsonLd(content);

    for (let i = 0; i < jsonLdBlocks.length; i++) {
      const block = jsonLdBlocks[i];
      try {
        JSON.parse(block);
      } catch (e) {
        errors.push({
          file,
          blockIndex: i + 1,
          error: `JSON-LD parse error in block #${i + 1}: ${e.message}`,
          snippet: block.substring(0, 100) + (block.length > 100 ? '...' : ''),
        });
      }
    }
  }

  return errors;
}

function main() {
  console.log('🔍 Checking JSON-LD structured data...\n');

  const errors = checkJsonLd();

  if (errors.length > 0) {
    console.error('❌ JSON-LD check FAILED:\n');
    for (const err of errors) {
      console.error(`  📄 ${err.file}`);
      console.error(`     └── ${err.error}`);
      console.error(`         Snippet: ${err.snippet}\n`);
    }
    process.exit(1);
  }

  console.log('✅ All JSON-LD blocks are valid JSON.\n');
  process.exit(0);
}

main();
