import { HERO_NAME, HERO_ROLE } from "@/constants/hero-constants";
import { SKILL_CHIPS } from "@/constants/skills-constants";
import { MY_PROJECTS } from "@/constants/projects-constants";
import { EXPERIENCES } from "@/constants/experience-constants";
import { SERVICES } from "@/constants/services-constants";
import { type Project, type Service, type Experience } from "@/types/portfolio-types";

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url: string;
  imageUrl?: string;
  description: string;
};

export type ContactMethodType =
  | "email"
  | "phone"
  | "github"
  | "linkedin"
  | "whatsapp"
  | "website"
  | "other";

export type ContactMethod = {
  id: string;
  type: ContactMethodType;
  label: string;
  value: string;
  href: string;
  enabled: boolean;
};

export type CmsData = {
  name: string;
  photoUrl: string;
  email: string;
  role: string;
  prefix: string;
  lead: string;
  subtitle: string;
  availability: string;
  heroWords: string[];
  meteorWords: string[];
  animation: {
    enabled: boolean;
    heroAutoFit: boolean;
    nameEnabled: boolean;
    duration: number;
    holdDuration: number;
    rhythm: number;
    fontWeight: number;
    nameDuration: number;
    nameRhythm: number;
    wordCycle: boolean;
    fontLoop: boolean;
    letterMorph: boolean;
    nameFontLoop: boolean;
  };
  skills: string[];
  projects: Project[];
  services: Service[];
  experiences: Experience[];
  certificates: Certificate[];
  socials: { label: string; url: string }[];
  contactMethods: ContactMethod[];
  about: string;
};

export const DEFAULT_CMS: CmsData = {
  name: HERO_NAME,
  email: "kanilkanchana98@gmail.com",
  photoUrl: "/profile/kanil-profile.png",
  role: HERO_ROLE,
  prefix: "building",
  lead: "Web Apps",
  subtitle: "web & backend systems.",
  availability: "Open to internship opportunities",
  heroWords: ["Web Apps", "Backend", "REST APIs", "Laravel", "AI Systems", "Scalable APIs"],
  meteorWords: ["PHP", "Python", "Laravel", "React", "Next.js", "JavaScript", "TypeScript", "SQL", "REST API", "Node.js", "HTML", "CSS", "Docker", "Git", "OpenCV", "AI"],
  animation: {
    enabled: true,
    heroAutoFit: true,
    nameEnabled: true,
    duration: 5.5,
    holdDuration: 2.2,
    rhythm: 200,
    fontWeight: 700,
    nameDuration: 10,
    nameRhythm: 420,
    wordCycle: true,
    fontLoop: true,
    letterMorph: true,
    nameFontLoop: true,
  },
  skills: SKILL_CHIPS,
  projects: MY_PROJECTS,
  services: SERVICES,
  experiences: EXPERIENCES,
  certificates: [
    {
      id: "cert-1",
      title: "Certificate in Computer Science with AI",
      issuer: "NIBM",
      year: "",
      url: "",
      description: "Computer Science and AI foundational studies",
    },
    {
      id: "cert-2",
      title: "Computer Graphic Designer — Level 4",
      issuer: "Vocational Training Center — Ruwanwella",
      year: "2023",
      url: "",
      description: "",
    },
  ],
  socials: [{ label: "MovieStream", url: "https://moviestream.my" }],
  contactMethods: [
    {
      id: "contact-email",
      type: "email",
      label: "Email",
      value: "kanilkanchana98@gmail.com",
      href: "mailto:kanilkanchana98@gmail.com",
      enabled: true,
    },
    {
      id: "contact-phone",
      type: "phone",
      label: "Phone",
      value: "",
      href: "",
      enabled: false,
    },
    {
      id: "contact-github",
      type: "github",
      label: "GitHub",
      value: "GitHub",
      href: "",
      enabled: false,
    },
    {
      id: "contact-linkedin",
      type: "linkedin",
      label: "LinkedIn",
      value: "LinkedIn",
      href: "",
      enabled: false,
    },
  ],
  about:
    "I'm studying Computer Science with AI at NIBM and focus on practical web development, Laravel/PHP backends, databases and Python experiments.",
};

export function normalizeCms(raw: unknown): CmsData {
  if (!raw || typeof raw !== "object") return DEFAULT_CMS;
  const r = raw as Partial<CmsData>;
  return {
    ...DEFAULT_CMS,
    ...r,
    animation: { ...DEFAULT_CMS.animation, ...(r.animation ?? {}) },
    heroWords:
      Array.isArray(r.heroWords) && r.heroWords.length
        ? r.heroWords.filter((x) => typeof x === "string").slice(0, 15)
        : DEFAULT_CMS.heroWords,
    meteorWords:
      Array.isArray(r.meteorWords) && r.meteorWords.length
        ? r.meteorWords.filter((x) => typeof x === "string" && x.trim()).slice(0, 40)
        : DEFAULT_CMS.meteorWords,
    skills: Array.isArray(r.skills) ? r.skills : DEFAULT_CMS.skills,
    projects: Array.isArray(r.projects) ? r.projects : DEFAULT_CMS.projects,
    services: Array.isArray(r.services) ? r.services : DEFAULT_CMS.services,
    certificates: Array.isArray(r.certificates)
      ? r.certificates
      : DEFAULT_CMS.certificates,
    experiences: Array.isArray(r.experiences)
      ? r.experiences
      : DEFAULT_CMS.experiences,
    socials: Array.isArray(r.socials) ? r.socials : DEFAULT_CMS.socials,
    contactMethods: Array.isArray(r.contactMethods)
      ? r.contactMethods
      : DEFAULT_CMS.contactMethods,
  };
}
