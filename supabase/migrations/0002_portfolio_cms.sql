-- Run after 0001_init.sql. All edits require an authenticated admin_users row.
create table if not exists public.portfolio_settings (
 id integer primary key check (id=1),
 content jsonb not null default '{}'::jsonb,
 updated_by uuid references auth.users(id),
 updated_at timestamptz not null default now()
);
alter table public.portfolio_settings enable row level security;
create policy "Public can view portfolio settings" on public.portfolio_settings
 for select to anon, authenticated using (true);
create policy "Admins can insert portfolio settings" on public.portfolio_settings
 for insert to authenticated with check (public.is_admin());
create policy "Admins can update portfolio settings" on public.portfolio_settings
 for update to authenticated using (public.is_admin())
 with check (public.is_admin());
-- Media: public read; only admin users can upload new assets.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('portfolio-media','portfolio-media',true,5242880,array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do nothing;
create policy "Public view portfolio media" on storage.objects for select to public using (bucket_id='portfolio-media');
create policy "Admins upload portfolio media" on storage.objects for insert to authenticated
with check (bucket_id='portfolio-media' and public.is_admin());
