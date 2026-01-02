#!/usr/bin/env node
/**
 * Check for broken internal links in HTML files
 */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const rootDir = path.join(__dirname, '..');
const htmlFiles = glob.sync('**/*.html', { cwd: rootDir, ignore: 'node_modules/**' });

// Build list of available pages (with and without .html)
const availablePages = new Set();
htmlFiles.forEach(file => {
  availablePages.add('/' + file);
  availablePages.add('/' + file.replace('.html', ''));
});
// Add root
availablePages.add('/');

let hasError = false;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Find all href attributes (internal links starting with /)
  const hrefRegex = /href\s*=\s*['"](\/?[^'"#?]*)/gi;
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    let link = match[1];

    // Skip external links, anchors, mailto, tel, javascript
    if (link.startsWith('http') || link.startsWith('mailto:') ||
        link.startsWith('tel:') || link.startsWith('javascript:') ||
        link === '' || link === '#') {
      continue;
    }

    // Normalize link
    if (!link.startsWith('/')) {
      link = '/' + link;
    }

    // Check if page exists
    const pageExists = availablePages.has(link) ||
                       availablePages.has(link + '.html') ||
                       availablePages.has(link.replace(/\/$/, ''));

    // Also check for static files
    const staticPath = path.join(rootDir, link.substring(1));
    const staticExists = fs.existsSync(staticPath);

    if (!pageExists && !staticExists) {
      console.error(`ERROR: ${file} - Broken link: ${link}`);
      hasError = true;
    }
  }
});

if (hasError) {
  console.error('\nLink check failed. Fix the broken links above.');
  process.exit(1);
} else {
  console.log(`Link check passed (${htmlFiles.length} files)`);
}
