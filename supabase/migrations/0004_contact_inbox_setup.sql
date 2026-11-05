-- Run once in Supabase SQL Editor if Contact Me / Admin Inbox table is missing.
-- Does not create new auth users or change admin passwords.
-- Assumes public.admin_users and public.is_admin() exist and work.
create table if not exists public.contact_submissions (
 id uuid primary key default gen_random_uuid(),
 name text not null, email text not null, budget text,
 message text not null, source text default 'portfolio',
 user_agent text, ip_address text,
 created_at timestamptz not null default now(),
 email_sent boolean, email_error text
);
create index if not exists contact_submissions_created_at_idx
 on public.contact_submissions(created_at desc);
alter table public.contact_submissions enable row level security;
drop policy if exists "Anyone can submit the contact form" on public.contact_submissions;
create policy "Anyone can submit the contact form" on public.contact_submissions
 for insert to anon, authenticated with check (true);
drop policy if exists "Admins can read submissions" on public.contact_submissions;
create policy "Admins can read submissions" on public.contact_submissions
 for select to authenticated using (public.is_admin());
drop policy if exists "Admins can delete submissions" on public.contact_submissions;
create policy "Admins can delete submissions" on public.contact_submissions
 for delete to authenticated using (public.is_admin());
grant select, insert, delete on public.contact_submissions to authenticated;
grant insert on public.contact_submissions to anon;
notify pgrst, 'reload schema';
select to_regclass('public.contact_submissions') as contact_inbox_table;
