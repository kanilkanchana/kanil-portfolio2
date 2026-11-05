# Kanil Portfolio — final Git checklist

## Changes
- Fix double text/overlap in hero and photo nameplate: exactly one rendered glyph per slot; no layered glyphs.
- Preserve independently configured Hero/Name controls, word cycle, fonts, admin CMS, certificates, and Supabase save.
- Contact Me submissions are available in **/admin** (inbox), linked from **/admin/content**. This is an existing authenticated workflow, not a separate public admin portal.

## Supabase
If the contact page says the contact_submissions table is missing, paste the **contents** of `supabase/migrations/0004_contact_inbox_setup.sql` into Supabase SQL Editor and run it. Do not paste the filename. This SQL assumes `public.is_admin()` and `public.admin_users` are already configured. Do not share `.env.local` or passwords.

## Test before Git
1. `npm install`
2. `npm run dev` and verify Home (hero, nameplate, animation controls)
3. Submit a test message via Contact Me
4. Sign in at `/admin/login`; open `/admin` to view the message; open `/admin/content` to edit the portfolio
5. Check the certificate image and Save changes
6. `npm run build` (must pass before deploying)

## Push
```powershell
git status
git add .
git commit -m "Fix animated typography and connect admin contact inbox"
git push origin main
```
Check `.gitignore` excludes `.env*`, `.next`, `node_modules`. Keep `.env.example` if present. This Next.js app with Supabase integration cannot run as a dynamic app on static-only GitHub Pages; host on a Next.js-capable platform.
