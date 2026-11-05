"use client";

import { type FC } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactMethods } from "@/components/contact/contact-methods";

export const Contact: FC = () => (
  <section id="contact" className="c-space section-spacing relative overflow-hidden">
    <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5">
        <p className="text-eyebrow">Contact Me</p>
        <h2 className="text-heading mt-3">
          Let&apos;s build <span className="text-gradient">something useful.</span>
        </h2>
        <p className="mt-5 text-neutral-300 leading-relaxed">
          I&apos;m open to web development, backend development and AI-related
          internship opportunities. Reach me directly using the links below.
        </p>

        <ContactMethods />
      </div>

      <div className="lg:col-span-7">
        {process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
          <ContactForm />
        ) : (
          <div className="glass gradient-border p-8 md:p-10">
            <h3 className="text-xl font-bold text-white">Contact Me</h3>
            <p className="mt-4 text-neutral-300">
              Web Development · Laravel / PHP · Databases · Python / AI
            </p>
            <p className="mt-5 text-sm text-neutral-400">
              The contact form becomes available when Supabase is connected.
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
);
