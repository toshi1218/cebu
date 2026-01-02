#!/usr/bin/env node
/**
 * Check that all HTML files have <meta charset="utf-8"> or <meta charset="UTF-8">
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir = path.join(__dirname, '..');
const htmlFiles = glob.sync('**/*.html', { cwd: rootDir, ignore: 'node_modules/**' });

let hasError = false;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for charset meta tag (case insensitive)
  const hasCharset = /<meta\s+charset\s*=\s*["']?(utf-8|UTF-8)["']?\s*\/?>/i.test(content);

  if (!hasCharset) {
    console.error(`ERROR: ${file} - Missing <meta charset="utf-8">`);
    hasError = true;
  }
});

if (hasError) {
  console.error('\nCharset check failed. Add <meta charset="utf-8"> to all HTML files.');
  process.exit(1);
} else {
  console.log(`Charset check passed (${htmlFiles.length} files)`);
}
