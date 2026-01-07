# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be provisioned

## 2. Run Database Migrations

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `migrations/20240101000000_initial_schema.sql`
3. Click "Run" to execute the migration

## 3. Get Your API Keys

1. Go to Project Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 4. Enable Email Authentication

1. Go to Authentication > Settings
2. Enable Email provider
3. Configure email templates if needed

## Database Schema

### tasks table

- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `title` (text, required)
- `description` (text, optional)
- `status` (text, enum: 'todo', 'in_progress', 'done')
- `priority` (text, enum: 'low', 'medium', 'high')
- `due_date` (timestamp, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Row Level Security (RLS)

All tables have RLS enabled with policies that ensure users can only access their own data.
