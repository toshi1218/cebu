#!/usr/bin/env node
/**
 * 文字化けチェックスクリプト（Node.js版）
 * コミット前・デプロイ前に実行して、文字化け（replacement character）を検出
 * 
 * 使い方: node check-encoding.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
    reset: '\x1b[0m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    gray: '\x1b[90m'
};

let hasError = false;

console.log(`${colors.cyan}[CHECK] Starting encoding check...${colors.reset}`);

// チェック対象のファイル拡張子
const extensions = ['.html', '.css', '.js', '.json', '.md', '.txt'];

// ディレクトリを再帰的に探索
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            const ext = path.extname(file);
            if (extensions.includes(ext)) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}

// igrs-netlifyディレクトリ内のファイルをチェック
const targetDir = path.join(__dirname, 'igrs-netlify');

if (!fs.existsSync(targetDir)) {
    console.log(`${colors.red}[ERROR] Directory not found: ${targetDir}${colors.reset}`);
    process.exit(1);
}

const files = getAllFiles(targetDir);
console.log(`${colors.gray}[INFO] Checking ${files.length} files...${colors.reset}`);

files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');

    // Replacement character (U+FFFD) をチェック
    if (content.includes('\uFFFD')) {
        console.log(`${colors.red}[ERROR] Mojibake detected: ${filePath}${colors.reset}`);
        hasError = true;

        // 文字化けの位置を表示
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            if (line.includes('\uFFFD')) {
                console.log(`${colors.yellow}  Line ${index + 1}: ${line}${colors.reset}`);
            }
        });
    }

    // ファイルのエンコーディングをチェック（BOMなしUTF-8であることを確認）
    const buffer = fs.readFileSync(filePath);
    if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        console.log(`${colors.yellow}[WARN] UTF-8 with BOM detected: ${filePath}${colors.reset}`);
        console.log(`${colors.gray}  (UTF-8 without BOM is recommended)${colors.reset}`);
    }
});

console.log('');

if (hasError) {
    console.log(`${colors.red}[FAIL] Mojibake (replacement characters) detected!${colors.reset}`);
    console.log(`${colors.red}Please fix the encoding issues before committing.${colors.reset}`);
    process.exit(1);
} else {
    console.log(`${colors.green}[PASS] No encoding issues detected.${colors.reset}`);
    process.exit(0);
}
