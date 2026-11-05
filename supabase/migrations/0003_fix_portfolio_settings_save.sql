-- RUN THIS IN SUPABASE SQL EDITOR when admin Save changes says:
-- Could not find table public.portfolio_settings in schema cache
-- This migration only creates the settings table and its RLS policies.
-- Requires public.is_admin() from the existing authenticated admin setup.

create table if not exists public.portfolio_settings (
 id integer primary key check (id = 1),
 content jsonb not null default '{}'::jsonb,
 updated_by uuid references auth.users(id),
 updated_at timestamptz not null default now()
);
alter table public.portfolio_settings enable row level security;

-- The public portfolio can display saved content, but guests cannot save.
drop policy if exists "Public can view portfolio settings" on public.portfolio_settings;
create policy "Public can view portfolio settings" on public.portfolio_settings
 for select to anon, authenticated using (true);

drop policy if exists "Admins can insert portfolio settings" on public.portfolio_settings;
create policy "Admins can insert portfolio settings" on public.portfolio_settings
 for insert to authenticated with check (public.is_admin());

drop policy if exists "Admins can update portfolio settings" on public.portfolio_settings;
create policy "Admins can update portfolio settings" on public.portfolio_settings
 for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- Ask PostgREST to reload its schema cache immediately.
notify pgrst, 'reload schema';

select to_regclass('public.portfolio_settings') as settings_table;
