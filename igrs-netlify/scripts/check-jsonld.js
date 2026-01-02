#!/usr/bin/env node
/**
 * Validate JSON-LD structured data in HTML files
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

  // Find all JSON-LD script blocks
  const jsonldRegex = /<script\s+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let blockIndex = 0;

  while ((match = jsonldRegex.exec(content)) !== null) {
    blockIndex++;
    const jsonContent = match[1].trim();

    if (jsonContent === '') {
      console.error(`ERROR: ${file} - Empty JSON-LD block #${blockIndex}`);
      hasError = true;
      continue;
    }

    try {
      JSON.parse(jsonContent);
    } catch (e) {
      console.error(`ERROR: ${file} - Invalid JSON-LD block #${blockIndex}: ${e.message}`);
      // Show first 200 chars of the problematic JSON
      console.error(`  Content: ${jsonContent.substring(0, 200)}...`);
      hasError = true;
    }
  }
});

if (hasError) {
  console.error('\nJSON-LD check failed. Fix the JSON syntax errors above.');
  process.exit(1);
} else {
  console.log(`JSON-LD check passed (${htmlFiles.length} files)`);
}
