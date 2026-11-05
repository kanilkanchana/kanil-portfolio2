# Portfolio animation and certificate update

- Hero effects: independent switches for enabled, wordCycle, fontLoop, letterMorph.
- Name effects: independent enabled and nameFontLoop switches.
- Off means static readable text. Hero displays first configured word; the name displays normally.
- Default enables word cycling, font looping and per-character word morph, while the name does not cycle words.
- Letters crossfade using two layers because CSS cannot interpolate `font-family`.
- Admin > Certificates: upload a JPG, PNG or WebP directly to the certificate, preview it, then click Save changes.
- Media uploads use existing Supabase Storage bucket `portfolio-media`. Run migration `0002_portfolio_cms.sql` and configure your Supabase credentials first.
- Certificates can also have a separate URL (PDF / verification link). Existing CMS data is normalized with the new optional settings.
- The first version of a new word shows as regular text when animation is off. For accessibility, reduced-motion CSS disables transitions.
