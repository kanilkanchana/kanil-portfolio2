"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { revealProps } from "@/animations/scroll-animations";
import { CONTACT_EMAIL } from "@/constants/portfolio-constants";
import { ContactInfoCard } from "./contact-info-card";

export const ContactDetails: FC = () => (
  <motion.div {...revealProps()} className="lg:col-span-5">
    <p className="text-eyebrow">Contact Me</p>
    <h2 className="text-heading mt-3">
      Have an idea? <br />
      <span className="text-gradient">Let&apos;s ship it.</span>
    </h2>
    <p className="mt-4 leading-relaxed text-neutral-400">
      Reach me directly for web development, backend development, AI work or internship opportunities.
    </p>

    <div className="mt-8 space-y-4">
      <ContactInfoCard
        icon="✉"
        label="Email"
        value={CONTACT_EMAIL}
        href={`mailto:${CONTACT_EMAIL}`}
        gradient="from-coral/30 to-lavender/30"
      />
    </div>
  </motion.div>
);
