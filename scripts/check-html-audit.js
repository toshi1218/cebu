#!/usr/bin/env node
/**
 * HTML structure audit for static pages.
 * - Excludes partial templates
 * - Reports pages that are long / contain heavy inline CSS or JS
 * - Helps prioritize manual review without checking every file one by one
 */

const fs = require('fs');
const path = require('path');
const glob = require('./lib/glob');

const HTML_DIR = path.join(__dirname, '..', 'igrs-netlify');
const OUTPUT = path.join(__dirname, '..', 'HTML_AUDIT_REPORT.md');

function countMatches(content, regex) {
  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

function hasTag(content, tagRegex) {
  return tagRegex.test(content);
}

function scoreRow(row) {
  let score = 0;
  if (row.lines >= 800) score += 3;
  else if (row.lines >= 500) score += 2;
  else if (row.lines >= 300) score += 1;

  score += Math.min(row.inlineStyles, 3);
  score += Math.min(row.styleBlocks, 3);
  score += Math.min(row.scriptBlocks, 2);

  if (!row.hasCanonical) score += 2;
  if (!row.hasDescription) score += 2;
  if (!row.hasViewport) score += 1;

  return score;
}

function audit() {
  const files = Array.from(
    new Set([...glob.sync('*.html', { cwd: HTML_DIR }), ...glob.sync('**/*.html', { cwd: HTML_DIR })]),
  ).filter((file) => !file.startsWith('partials/'));

  const rows = files.map((file) => {
    const fullPath = path.join(HTML_DIR, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const lines = content.split('\n').length;

    const row = {
      file,
      lines,
      styleBlocks: countMatches(content, /<style\b[^>]*>[\s\S]*?<\/style>/gi),
      scriptBlocks: countMatches(content, /<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi),
      inlineStyles: countMatches(content, /\sstyle\s*=\s*['"][^'"]*['"]/gi),
      hasTitle: hasTag(content, /<title\b[^>]*>[\s\S]*?<\/title>/i),
      hasH1: hasTag(content, /<h1\b[^>]*>[\s\S]*?<\/h1>/i),
      hasDescription: hasTag(content, /<meta\s+name=["']description["'][^>]*>/i),
      hasCanonical: hasTag(content, /<link\s+rel=["']canonical["'][^>]*>/i),
      hasViewport: hasTag(content, /<meta\s+name=["']viewport["'][^>]*>/i),
    };

    row.score = scoreRow(row);
    return row;
  });

  rows.sort((a, b) => b.score - a.score || b.lines - a.lines || a.file.localeCompare(b.file));
  return rows;
}

function toMarkdown(rows) {
  const now = new Date().toISOString();
  const top = rows.slice(0, 10);

  const summary = [
    '# HTML Audit Report',
    '',
    `Generated: ${now}`,
    '',
    '## How to use',
    '- Start with higher `Score` rows.',
    '- Prioritize pages with many lines and many inline styles/scripts.',
    '- Use this report to avoid reviewing every page manually each time.',
    '',
    '## Top 10 priority pages',
    '',
    '| File | Score | Lines | Inline style attrs | `<style>` blocks | Inline `<script>` blocks | Missing canonical | Missing description |',
    '|---|---:|---:|---:|---:|---:|:---:|:---:|',
    ...top.map(
      (r) =>
        `| \`${r.file}\` | ${r.score} | ${r.lines} | ${r.inlineStyles} | ${r.styleBlocks} | ${r.scriptBlocks} | ${r.hasCanonical ? '' : '⚠️'} | ${r.hasDescription ? '' : '⚠️'} |`,
    ),
    '',
    '## Full page table',
    '',
    '| File | Score | Lines | Inline style attrs | `<style>` blocks | Inline `<script>` blocks | Title | H1 | Description | Canonical | Viewport |',
    '|---|---:|---:|---:|---:|---:|:---:|:---:|:---:|:---:|:---:|',
    ...rows.map(
      (r) =>
        `| \`${r.file}\` | ${r.score} | ${r.lines} | ${r.inlineStyles} | ${r.styleBlocks} | ${r.scriptBlocks} | ${r.hasTitle ? '✅' : '❌'} | ${r.hasH1 ? '✅' : '❌'} | ${r.hasDescription ? '✅' : '❌'} | ${r.hasCanonical ? '✅' : '❌'} | ${r.hasViewport ? '✅' : '❌'} |`,
    ),
    '',
  ];

  return `${summary.join('\n')}\n`;
}

function main() {
  const rows = audit();
  fs.writeFileSync(OUTPUT, toMarkdown(rows));
  console.log(`✅ HTML audit generated: ${path.relative(process.cwd(), OUTPUT)}`);
  console.log(`📄 Total pages checked: ${rows.length}`);
}

main();
