# Kanil Kanchana — original 3D source adapted to your profile

This is the actual 3d-portfolio-1.0.0 Next.js / React Three Fiber project. It keeps the astronaut GLB, interactive globe, page loader, parallax background and scroll effects.

## Run locally
1. Install Node.js 20.9+ (Node 22 LTS recommended).
2. Open a terminal inside this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_CONTACT_EMAIL` to your own verified email and `NEXT_PUBLIC_SITE_URL` to your production URL.
5. Run `npm run dev` and visit http://localhost:3000.

## Important
- Profile image: `/public/profile/kanil-profile.png`. Rendered with `object-contain` at a controlled portrait frame size so it is not stretched or cropped.
- Main profile: `/constants/hero-constants.ts`, `/components/about/about-bio.tsx`.
- Projects: `/constants/projects-constants.ts` (only MovieStream has a verified live URL; empty URLs are deliberately not clickable).
- Education / project experience: `/constants/experience-constants.ts`.
- Skills: `/constants/skills-constants.ts`.
- Social links: `/constants/social-constants.ts`; blank links were not invented.
- Contact form / contact submissions admin: original Supabase-backed feature retained but only the form is displayed after you set Supabase environment variables and initialize its tables. See `docs/admin.md`.
- This Next.js app requires a Node server for the API and admin. GitHub Pages cannot host its dynamic features unchanged; choose Node-enabled hosting such as Vercel or a supported Node host.
- The existing 3D character model and architecture remain from the supplied open-source source project; preserve the original `LICENSE` and `NOTICE` attribution.
- Not all UI functionality can be verified here without installing dependencies. Test with `npm run dev`.

## Hero photo revision
The home hero now uses the original `/public/profile/kanil-profile.png` image in a large, static neon-bordered portrait card. The floating astronaut model is **not rendered**. The existing parallax space landscape remains. Photo is fitted using `object-fit: contain` to prevent face cropping and stretching.


## Letter animation (updated)
The hero word **Web Apps** and portrait name **Kanil Kanchana** now use the per-letter font roll from the supplied Sass logic. The rendered CSS is in `app/globals.css`, and editable Sass source is in `styles/loki-roll.scss`. It runs once for 10 seconds and settles on Oxanium; the portrait never moves. Reduced-motion preferences are respected. No extra npm package is required.
