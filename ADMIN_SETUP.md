# Kanil Portfolio CMS — Password-protected admin

This is the real Next.js project, not an HTML demo. It uses Supabase Auth + `admin_users` row-level authorization already present in the original codebase. **No default password is included** in the ZIP and `/admin/content` will not allow unauthenticated editing.

## Configure
1. Create a Supabase project. Fill `.env.local` from `.env.example`, especially `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
2. Apply `supabase/migrations/0001_init.sql` then `supabase/migrations/0002_portfolio_cms.sql` in the Supabase SQL editor. If your original schema already exists, only apply `0002_portfolio_cms.sql`.
3. In Supabase Authentication → Users, create an email/password user with **your own strong password**. Never commit your password to GitHub.
4. Using the SQL editor, grant that user admin rights via the existing `select public.grant_admin('your-email@example.com');` function (replace the email with the actual account email).
5. Run `npm install && npm run dev`, go to `http://localhost:3000/admin/login`, and sign in with that email and password. Open `/admin/content` for site editing.
6. Use **Save changes** to publish data to the `portfolio_settings` database table. Without Supabase configured, the portfolio displays built-in defaults and the admin editor is safely unavailable.

## Editable sections
Hero name/role/subtitle and animated word list; animated letter toggles and duration/rhythm; skills; projects; services; experiences and education; certificates; about text; email and social URLs; profile photo URL; media uploads. Public display uses saved content for all these sections where wired. The default hero styles and photo are unchanged.

## Animations
The supplied Loki HTML was used as the reference for its fixed-slot, per-character rotating font behavior. The Next.js implementation leaves each letter legible and uses the same curated font family pool, with animation speed and on/off controlled by CMS. It does not embed the standalone HTML's dashboard onto the public site. Animation is enabled by default.

## Security / deployment
Do not put your Supabase service-role key in browser code. Supabase RLS protects writes, while reads of published settings/media are public. Admin privileges are checked on the server for every save and upload. For production, enable email confirmation/MFA, configure your site URL/auth redirects, and use a Next.js-capable host (e.g. Vercel or Node hosting). The admin requires a working Supabase account; a local-only JSON editor is **not** considered password security.
