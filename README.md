# Task Manager MVP

Next.js 15 + Supabase + Vercel で構築したシンプルなタスク管理アプリケーション

## 機能

- ユーザー認証（サインアップ・ログイン）
- タスクのCRUD操作
  - タスクの作成
  - タスクの閲覧（一覧表示）
  - タスクの更新（編集、ステータス変更）
  - タスクの削除
- タスクのフィルタリング（すべて・未着手・進行中・完了）
- 優先度設定（低・中・高）
- 期限設定
- レスポンシブデザイン（モバイル対応）
- ダークモード対応

## 画面構成

1. **ホーム画面** (`/`) - ランディングページ
2. **ログイン画面** (`/login`) - ユーザーログイン
3. **サインアップ画面** (`/signup`) - 新規ユーザー登録
4. **タスク一覧画面** (`/tasks`) - タスクの表示・管理

## 技術スタック

- **Frontend**: Next.js 15 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## セットアップ手順

### 1. リポジトリのクローン

\`\`\`bash
git clone <repository-url>
cd try_claude
\`\`\`

### 2. 依存関係のインストール

\`\`\`bash
npm install
\`\`\`

### 3. Supabase プロジェクトの作成

1. [Supabase](https://supabase.com) にアクセスしてプロジェクトを作成
2. SQL Editorで `supabase/migrations/20240101000000_initial_schema.sql` を実行
3. Authentication > Settings で Email認証を有効化

詳細は [supabase/README.md](./supabase/README.md) を参照してください。

### 4. 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成：

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
\`\`\`

Supabaseのプロジェクト設定から取得できます。

### 5. 開発サーバーの起動

\`\`\`bash
npm run dev
\`\`\`

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## Vercelへのデプロイ

### 方法1: Vercel CLI

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 方法2: GitHub連携（推奨）

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com) でプロジェクトをインポート
3. 環境変数を設定：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. デプロイ

## プロジェクト構成

\`\`\`
.
├── app/
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # ホーム画面
│   ├── globals.css         # グローバルスタイル
│   ├── login/
│   │   └── page.tsx        # ログイン画面
│   ├── signup/
│   │   └── page.tsx        # サインアップ画面
│   └── tasks/
│       └── page.tsx        # タスク一覧画面
├── components/
│   ├── TaskHeader.tsx      # ヘッダーコンポーネント
│   ├── TaskList.tsx        # タスクリストコンポーネント
│   ├── TaskItem.tsx        # タスクアイテムコンポーネント
│   └── TaskForm.tsx        # タスクフォームコンポーネント
├── lib/
│   ├── supabase.ts         # Supabaseクライアント（クライアント側）
│   └── supabase-server.ts  # Supabaseクライアント（サーバー側）
├── supabase/
│   ├── migrations/         # データベースマイグレーション
│   └── README.md           # Supabaseセットアップガイド
├── middleware.ts           # 認証ミドルウェア
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
\`\`\`

## データベーススキーマ

### tasks テーブル

| カラム名 | 型 | 説明 |
|---------|------|------|
| id | uuid | プライマリキー |
| user_id | uuid | ユーザーID（外部キー） |
| title | text | タスクタイトル |
| description | text | タスク説明（任意） |
| status | text | ステータス（todo/in_progress/done） |
| priority | text | 優先度（low/medium/high） |
| due_date | timestamp | 期限（任意） |
| created_at | timestamp | 作成日時 |
| updated_at | timestamp | 更新日時 |

## 使い方

1. **アカウント作成**: サインアップ画面でメールアドレスとパスワードを入力
2. **ログイン**: ログイン画面で認証情報を入力
3. **タスク作成**: 「+ 新規タスク」ボタンからタスクを作成
4. **タスク管理**:
   - ステータスを変更（未着手→進行中→完了）
   - 編集ボタンで詳細を変更
   - 削除ボタンでタスクを削除
5. **フィルタリング**: ステータスボタンでタスクを絞り込み

## セキュリティ

- Row Level Security (RLS) を有効化
- ユーザーは自分のタスクのみアクセス可能
- 認証ミドルウェアで未認証アクセスをブロック

## ライセンス

MIT

## 今後の拡張案

- [ ] タスクの検索機能
- [ ] タスクのソート機能
- [ ] タスクのタグ・カテゴリー機能
- [ ] リマインダー通知
- [ ] チームでのタスク共有
- [ ] タスクのエクスポート機能
