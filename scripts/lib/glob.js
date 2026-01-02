// Simple glob implementation using Node.js fs
// Supports basic patterns like "**\/*.html"

const fs = require('fs');
const path = require('path');

function globSync(pattern, options = {}) {
  const cwd = options.cwd || process.cwd();
  const nodir = options.nodir || false;
  const results = [];

  // Parse pattern
  const parts = pattern.split('/');
  const isRecursive = parts.includes('**');

  function walkDir(dir, depth = 0) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(cwd, fullPath);

      if (entry.isDirectory()) {
        if (!nodir && matchesPattern(relativePath, pattern)) {
          results.push(relativePath);
        }
        if (isRecursive || depth < parts.length - 1) {
          walkDir(fullPath, depth + 1);
        }
      } else if (entry.isFile()) {
        if (matchesPattern(relativePath, pattern)) {
          results.push(relativePath);
        }
      }
    }
  }

  walkDir(cwd);
  return results.sort();
}

function matchesPattern(filePath, pattern) {
  // Convert glob pattern to regex
  let regexStr = pattern
    .replace(/\./g, '\\.')
    .replace(/\*\*/g, '{{GLOBSTAR}}')
    .replace(/\*/g, '[^/]*')
    .replace(/{{GLOBSTAR}}/g, '.*');

  const regex = new RegExp(`^${regexStr}$`);
  return regex.test(filePath);
}

module.exports = {
  sync: globSync,
};
