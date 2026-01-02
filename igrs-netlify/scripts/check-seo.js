#!/usr/bin/env node
/**
 * Check for SEO issues: missing/duplicate title and H1 tags
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir = path.join(__dirname, '..');
const htmlFiles = glob.sync('**/*.html', { cwd: rootDir, ignore: 'node_modules/**' });

let hasError = false;
const titles = new Map(); // Track title duplicates

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for <title>
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch) {
    console.error(`ERROR: ${file} - Missing <title> tag`);
    hasError = true;
  } else {
    const title = titleMatch[1].trim();
    if (title === '') {
      console.error(`ERROR: ${file} - Empty <title> tag`);
      hasError = true;
    } else {
      // Track for duplicates
      if (titles.has(title)) {
        console.warn(`WARN: ${file} - Duplicate title with ${titles.get(title)}: "${title}"`);
      } else {
        titles.set(title, file);
      }
    }
  }

  // Check for <h1>
  const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gis);
  if (!h1Matches || h1Matches.length === 0) {
    console.error(`ERROR: ${file} - Missing <h1> tag`);
    hasError = true;
  } else if (h1Matches.length > 1) {
    console.warn(`WARN: ${file} - Multiple <h1> tags (${h1Matches.length})`);
  }
});

if (hasError) {
  console.error('\nSEO check failed. Fix the issues above.');
  process.exit(1);
} else {
  console.log(`SEO check passed (${htmlFiles.length} files)`);
}
