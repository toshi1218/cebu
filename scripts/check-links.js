#!/usr/bin/env node
/**
 * Internal Link Check Script
 * 内部リンク（href="/..."）が存在するかチェック
 */

const fs = require('fs');
const path = require('path');
const glob = require('./lib/glob');

const HTML_DIR = path.join(__dirname, '..', 'igrs-netlify');

function extractInternalLinks(content) {
  const links = [];
  // href="/..." パターンを抽出（アンカーリンク、外部リンク、メールは除外）
  const regex = /href\s*=\s*["'](\/?[^"'#:]+)["']/gi;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    // 外部リンク、メール、JS、アンカーのみは除外
    if (
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:') ||
      href === '#' ||
      href === ''
    ) {
      continue;
    }
    links.push(href);
  }

  return links;
}

function resolveLink(link, currentFile) {
  // 絶対パス（/で始まる）の場合
  if (link.startsWith('/')) {
    // 末尾が / または拡張子なしの場合は .html を補完
    let resolved = link;
    if (resolved.endsWith('/')) {
      resolved += 'index.html';
    } else if (!path.extname(resolved)) {
      resolved += '.html';
    }
    return resolved.slice(1); // 先頭の / を除去
  }

  // 相対パスの場合
  const dir = path.dirname(currentFile);
  let resolved = path.join(dir, link);
  if (!path.extname(resolved)) {
    resolved += '.html';
  }
  return resolved;
}

function checkLinks() {
  const htmlFiles = glob.sync('**/*.html', { cwd: HTML_DIR });
  const errors = [];

  // 存在するファイルのセットを作成
  const existingFiles = new Set();
  const allFiles = glob.sync('**/*', { cwd: HTML_DIR, nodir: true });
  for (const f of allFiles) {
    existingFiles.add(f);
    // 拡張子なしのパスも追加（/services → services.html）
    if (f.endsWith('.html')) {
      existingFiles.add(f.slice(0, -5)); // .html を除去したパス
    }
  }

  for (const file of htmlFiles) {
    const filePath = path.join(HTML_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const links = extractInternalLinks(content);

    for (const link of links) {
      const resolved = resolveLink(link, file);

      // ファイルが存在するかチェック
      const exists =
        existingFiles.has(resolved) ||
        existingFiles.has(resolved.replace('.html', '')) ||
        fs.existsSync(path.join(HTML_DIR, resolved));

      if (!exists) {
        errors.push({
          file,
          link,
          resolved,
          error: `Broken link: ${link} (resolved to: ${resolved})`,
        });
      }
    }
  }

  return errors;
}

function main() {
  console.log('🔍 Checking internal links...\n');

  const errors = checkLinks();

  if (errors.length > 0) {
    console.error('❌ Link check FAILED:\n');
    for (const err of errors) {
      console.error(`  📄 ${err.file}`);
      console.error(`     └── ${err.error}\n`);
    }
    process.exit(1);
  }

  console.log('✅ All internal links are valid.\n');
  process.exit(0);
}

main();
