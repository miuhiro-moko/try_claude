-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tasks table
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.tasks enable row level security;

-- Create policies
-- Users can only see their own tasks
create policy "Users can view their own tasks"
  on public.tasks for select
  using (auth.uid() = user_id);

-- Users can only insert their own tasks
create policy "Users can insert their own tasks"
  on public.tasks for insert
  with check (auth.uid() = user_id);

-- Users can only update their own tasks
create policy "Users can update their own tasks"
  on public.tasks for update
  using (auth.uid() = user_id);

-- Users can only delete their own tasks
create policy "Users can delete their own tasks"
  on public.tasks for delete
  using (auth.uid() = user_id);

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for tasks table
create trigger on_tasks_updated
  before update on public.tasks
  for each row
  execute procedure public.handle_updated_at();

-- Create indexes for better performance
create index tasks_user_id_idx on public.tasks(user_id);
create index tasks_status_idx on public.tasks(status);
create index tasks_created_at_idx on public.tasks(created_at desc);
