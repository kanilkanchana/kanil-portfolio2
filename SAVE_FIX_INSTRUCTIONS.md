# Fix Save failed: public.portfolio_settings not in schema cache

1. In your existing Supabase project open **SQL Editor → New Query**.
2. Open `supabase/migrations/0003_fix_portfolio_settings_save.sql` from this ZIP. Copy the **SQL contents**, not the filename/path, into Supabase SQL Editor. Click **Run**.
3. You should see `public.portfolio_settings` returned. If `public.is_admin()` is missing, run/repair your original admin setup first. Do not insert passwords into SQL.
4. Refresh `/admin/content`, adjust settings, then click **Save changes**.
5. If save shows a permission error, verify your Supabase Authentication account is present in `public.admin_users`; the policies intentionally only let admins write.

## Improved sliders
- **Word cycle speed:** 3–30 seconds for each rotating word. Smaller number = faster new word.
- **Hero font change speed:** 80–1000 milliseconds of rhythm. Smaller = faster font-loop animation. Actual font tick is 6× that value and limited to 0.5–6 seconds to allow a readable display.
- **Name animation cycle** and **Name font change speed** are independent from hero words.
- Use slider or numeric field, then **Save changes**.
- Switch OFF *Auto-change words* to keep the first word visible while its font can still animate. Switch OFF font looping to keep its font static.

Your admin email/password remains managed by Supabase Auth. The supplied SQL does not change user accounts.
