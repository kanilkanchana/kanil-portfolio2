"use client";

import { type FC, type SVGProps } from "react";
import { useCms } from "@/components/portfolio/cms-context";
import { type ContactMethod, type ContactMethodType } from "@/lib/portfolio-cms";

type IconProps = SVGProps<SVGSVGElement>;

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const EmailIcon = (props: IconProps) => (
  <svg {...iconProps} {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
);
const PhoneIcon = (props: IconProps) => (
  <svg {...iconProps} {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></svg>
);
const GithubIcon = (props: IconProps) => (
  <svg {...iconProps} {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.37 6.8-1.62 6.8-7.4A5.8 5.8 0 0 0 19.3 3 5.4 5.4 0 0 0 19.1.1S17.9-.3 15 1.6a13.4 13.4 0 0 0-7 0C5.1-.3 3.9.1 3.9.1A5.4 5.4 0 0 0 3.7 3a5.8 5.8 0 0 0-1.5 4.1c0 5.77 3.5 7 6.8 7.4A4.8 4.8 0 0 0 8 18v4"/><path d="M8 19c-3 .9-3-1.5-4-2"/></svg>
);
const LinkedinIcon = (props: IconProps) => (
  <svg {...iconProps} {...props}><rect x="3" y="9" width="4" height="12"/><path d="M5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/><path d="M11 21V9h4v2c1-1.5 2.3-2.4 4.2-2.4 2.8 0 4.8 1.8 4.8 5.5V21h-4v-6.2c0-1.9-.8-3-2.4-3-1.7 0-2.6 1.2-2.6 3.3V21z"/></svg>
);
const WhatsappIcon = (props: IconProps) => (
  <svg {...iconProps} {...props}><path d="M21 11.5A8.5 8.5 0 0 1 8.5 19L3 21l2-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.2 8.1c.3 2.7 2.6 5 5.3 5.3l1.2-1.2c.3-.3.7-.4 1.1-.2l2 .8"/></svg>
);
const LinkIcon = (props: IconProps) => (
  <svg {...iconProps} {...props}><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>
);

const ICONS: Record<ContactMethodType, FC<IconProps>> = {
  email: EmailIcon,
  phone: PhoneIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  whatsapp: WhatsappIcon,
  website: LinkIcon,
  other: LinkIcon,
};

export function contactHref(method: ContactMethod) {
  const explicit = method.href.trim();
  if (explicit) return explicit;
  const value = method.value.trim();
  if (!value) return "";
  if (method.type === "email") return `mailto:${value}`;
  if (method.type === "phone") return `tel:${value.replace(/[^+\d]/g, "")}`;
  if (method.type === "whatsapp") {
    const digits = value.replace(/\D/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }
  if (/^https?:\/\//i.test(value)) return value;
  return "";
}

const isExternal = (href: string) => /^https?:\/\//i.test(href);

export const ContactMethods: FC<{ compact?: boolean }> = ({ compact = false }) => {
  const cms = useCms();
  const methods = cms.contactMethods.filter((method) => {
    if (!method.enabled) return false;
    const href = contactHref(method);
    return Boolean(method.value.trim() || href);
  });

  if (!methods.length) return null;

  if (compact) {
    return (
      <div className="mt-6 flex flex-wrap items-center gap-3" aria-label="Contact links">
        {methods.map((method) => {
          const Icon = ICONS[method.type] || LinkIcon;
          const href = contactHref(method);
          if (!href) return null;
          return (
            <a
              key={method.id}
              href={href}
              target={isExternal(href) ? "_blank" : undefined}
              rel={isExternal(href) ? "noreferrer noopener" : undefined}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-neutral-200 transition hover:-translate-y-0.5 hover:border-aqua/60 hover:bg-aqua/10 hover:text-aqua"
              aria-label={method.label}
              title={method.label}
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-7 grid gap-3 sm:grid-cols-2">
      {methods.map((method) => {
        const Icon = ICONS[method.type] || LinkIcon;
        const href = contactHref(method);
        const content = (
          <>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-aqua/20 bg-aqua/10 text-aqua">
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-[.22em] text-neutral-500">{method.label}</span>
              <span className="mt-1 block truncate text-sm font-medium text-white">{method.value}</span>
            </span>
          </>
        );

        return href ? (
          <a
            key={method.id}
            href={href}
            target={isExternal(href) ? "_blank" : undefined}
            rel={isExternal(href) ? "noreferrer noopener" : undefined}
            className="glass gradient-border flex items-center gap-3 p-3.5 transition hover:-translate-y-0.5 hover:bg-white/[0.07]"
          >
            {content}
          </a>
        ) : (
          <div key={method.id} className="glass gradient-border flex items-center gap-3 p-3.5">
            {content}
          </div>
        );
      })}
    </div>
  );
};
