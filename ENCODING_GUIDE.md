# 文字化け対策ガイド

このプロジェクトでは、文字化けを防ぐために以下の対策を実装しています。

**重要**: PowerShellは使用せず、Node.jsスクリプトで文字化けチェックを実行します。

## 🛡️ 実装済みの対策

### 1. HTMLファイルのメタタグ
全HTMLファイルの`<head>`内に以下を配置：
```html
<meta charset="UTF-8">
```

### 2. VS Code設定（`.vscode/settings.json`）
- **UTF-8エンコーディングを強制**
- 自動推測を無効化
- 全ファイルタイプでUTF-8を使用

### 3. 自動文字化けチェック（`check-encoding.js`）
Node.jsスクリプトでコミット前・デプロイ前に実行：
- Replacement character（�）を検出
- エンコーディングの問題を事前に発見
- BOM付きUTF-8も検出（警告のみ）
- PowerShell不要で文字化けリスクなし

### 4. Netlifyデプロイ設定（`netlify.toml`）
- **プレビューデプロイを必須化**
- デプロイ前に自動で文字化けチェック実行
- HTTPヘッダーでUTF-8を明示的に指定

## 📝 使い方

### コミット前のチェック（手動実行）
```bash
node check-encoding.js
```

### VS Codeでの確認方法
1. VS Code右下の文字コード表示を確認
2. 常に「UTF-8」と表示されていることを確認
3. もし違うエンコーディングの場合：
   - 右下の文字コード表示をクリック
   - 「Save with Encoding」を選択
   - 「UTF-8」を選択

## 🚀 デプロイフロー

### 推奨フロー（本番デプロイ前に必ずプレビュー）

1. **ブランチで作業**
   ```bash
   git checkout -b feature/your-feature
   # 編集作業
   ```

2. **コミット前チェック**
   ```bash
   node check-encoding.js
   ```

3. **コミット＆プッシュ**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin feature/your-feature
   ```

4. **Pull Requestを作成**
   - GitHubでPRを作成
   - Netlifyが自動でプレビューデプロイを作成
   - プレビューURLで動作確認

5. **プレビュー確認後、マージ**
   - プレビューで問題なければmasterにマージ
   - 本番デプロイが自動実行

## ⚠️ トラブルシューティング

### 文字化けが発生した場合
1. `check-encoding.js`を実行して問題箇所を特定
   ```bash
   node check-encoding.js
   ```
2. VS Codeで該当ファイルを開く
3. 右下の文字コード表示を確認
4. 「Save with Encoding」→「UTF-8」で保存し直す

### Netlifyデプロイが失敗する場合
- デプロイログを確認
- 文字化けチェックで失敗している場合、該当ファイルを修正
- 再度プッシュ

## 🔧 追加の安全対策（オプション）

### Git Hooksの設定（さらに強化したい場合）
`.git/hooks/pre-commit`を作成：
```bash
#!/bin/sh
node check-encoding.js
```

実行権限を付与（Mac/Linux）：
```bash
chmod +x .git/hooks/pre-commit
```

これにより、コミット時に自動でチェックが実行されます。

## 📊 チェック対象ファイル
- `*.html`
- `*.css`
- `*.js`
- `*.json`
- `*.md`
- `*.txt`

---

**重要**: 必ず本番デプロイ前にプレビューデプロイで確認してください！
