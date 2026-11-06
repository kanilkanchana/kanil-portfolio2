-- One-time production fix for the Contact Me inbox.
-- Safe to run repeatedly. Does not create or change auth users or passwords.

create extension if not exists "pgcrypto";

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  budget text,
  message text not null,
  source text default 'portfolio',
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now(),
  email_sent boolean,
  email_error text
);

alter table public.contact_submissions
  add column if not exists budget text,
  add column if not exists source text default 'portfolio',
  add column if not exists user_agent text,
  add column if not exists ip_address text,
  add column if not exists email_sent boolean,
  add column if not exists email_error text;

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions(created_at desc);

alter table public.contact_submissions enable row level security;

drop policy if exists "Anyone can submit the contact form"
  on public.contact_submissions;
create policy "Anyone can submit the contact form"
  on public.contact_submissions
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can read submissions"
  on public.contact_submissions;
create policy "Admins can read submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can delete submissions"
  on public.contact_submissions;
create policy "Admins can delete submissions"
  on public.contact_submissions
  for delete
  to authenticated
  using (public.is_admin());

grant insert on public.contact_submissions to anon;
grant select, insert, delete on public.contact_submissions to authenticated;

notify pgrst, 'reload schema';

select to_regclass('public.contact_submissions') as contact_inbox_table;
