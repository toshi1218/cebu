#!/usr/bin/env node
/**
 * Check for mojibake (replacement characters) in HTML files
 * Fails if U+FFFD (�) is found
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir = path.join(__dirname, '..');
const htmlFiles = glob.sync('**/*.html', { cwd: rootDir, ignore: 'node_modules/**' });

let hasError = false;
const replacementChar = '\uFFFD'; // �

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    if (line.includes(replacementChar)) {
      console.error(`ERROR: ${file}:${index + 1} - Contains replacement character (mojibake)`);
      console.error(`  Line: ${line.substring(0, 100)}...`);
      hasError = true;
    }
  });
});

if (hasError) {
  console.error('\nMojibake check failed. Fix encoding issues in the reported files.');
  process.exit(1);
} else {
  console.log(`Mojibake check passed (${htmlFiles.length} files)`);
}
