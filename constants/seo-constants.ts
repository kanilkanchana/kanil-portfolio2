import { HERO_LOCATION, HERO_NAME, HERO_ROLE } from "./hero-constants";
import { CONTACT_EMAIL, MY_SOCIALS } from "./social-constants";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
export const SITE_NAME = `${HERO_NAME} | ${HERO_ROLE}`;
export const SITE_TITLE = SITE_NAME;
export const SITE_DESCRIPTION = "Portfolio of Kanil Kanchana, a Computer Science with AI HND student interested in web development, Laravel backends and AI.";
export const SITE_TAGLINE = "Web development, Laravel backend projects and Python AI experiments.";
export const OG_IMAGE = "/og.jpg";
export const OG_IMAGE_ALT = `${HERO_NAME} portfolio`;
export const OG_LOCALE = "en_US";
export const OG_IMAGES = [{url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT}];
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";
export const SITE_KEYWORDS = [HERO_NAME,"Web Developer","Backend Developer","Laravel","PHP","Python","AI",HERO_LOCATION,"Sri Lanka","Internship"];
export const HOME_TITLE = SITE_TITLE;
export const HOME_DESCRIPTION = SITE_DESCRIPTION;
export const ADMIN_TITLE = "Contact submissions";
export const ADMIN_DESCRIPTION = "Private contact inbox, requires Supabase setup.";
export const ADMIN_LOGIN_TITLE = "Sign in";
export const ADMIN_LOGIN_DESCRIPTION = "Sign in to your contact inbox.";
export const SITE_SECTIONS = [
{name:"Home",hash:"#home",description:`${HERO_NAME} portfolio`},
{name:"About",hash:"#about",description:`About ${HERO_NAME}`},
{name:"Services",hash:"#services",description:"Web, backend and Python skills"},
{name:"Work",hash:"#work",description:"Projects"},
{name:"Contact",hash:"#contact",description:"Contact options"},
] as const;
export const SOCIAL_PROFILES = MY_SOCIALS.map((s)=>s.href);
export const CONTACT_POINT_EMAIL = CONTACT_EMAIL;
