#!/usr/bin/env node
/**
 * All Checks Runner
 * 全てのチェックを実行し、結果をまとめて報告
 */

const { execSync } = require('child_process');
const path = require('path');

const CHECKS = [
  { name: 'Charset', script: 'check-charset.js' },
  { name: 'Title & H1', script: 'check-title-h1.js' },
  { name: 'JSON-LD', script: 'check-jsonld.js' },
  { name: 'Internal Links', script: 'check-links.js' },
];

function runCheck(check) {
  const scriptPath = path.join(__dirname, check.script);
  try {
    execSync(`node "${scriptPath}"`, {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return { success: true, output: '' };
  } catch (e) {
    return {
      success: false,
      output: e.stdout || e.stderr || e.message,
    };
  }
}

function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  IGRS Static Site Checker');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const results = [];
  let hasFailure = false;

  for (const check of CHECKS) {
    process.stdout.write(`Running ${check.name} check... `);
    const result = runCheck(check);
    results.push({ ...check, ...result });

    if (result.success) {
      console.log('✅ PASS');
    } else {
      console.log('❌ FAIL');
      hasFailure = true;
    }
  }

  console.log('\n═══════════════════════════════════════════════════════════════');

  if (hasFailure) {
    console.log('  RESULT: ❌ FAILED\n');
    console.log('Details:\n');

    for (const result of results) {
      if (!result.success) {
        console.log(`─── ${result.name} ───`);
        console.log(result.output);
        console.log('');
      }
    }

    process.exit(1);
  }

  console.log('  RESULT: ✅ ALL CHECKS PASSED');
  console.log('═══════════════════════════════════════════════════════════════\n');
  process.exit(0);
}

main();
