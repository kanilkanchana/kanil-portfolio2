"use client";

import { type FC } from "react";
import { HeroText } from "@/components/portfolio/hero-text";
import { ProfileHeroCard } from "@/components/portfolio/profile-hero-card";
import { ParallaxBackground } from "@/components/portfolio/parallax-background";

export const Hero: FC = () => (
  <section
    id="home"
    className="relative isolate min-h-screen overflow-hidden"
  >
    <ParallaxBackground />
    <div className="kanil-hero-layout">
      <HeroText />
      <ProfileHeroCard />
    </div>
    <a
      href="#about"
      className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-neutral-300 transition-colors hover:text-white md:flex"
      aria-label="Scroll down to about"
    >
      <span>Scroll</span>
      <span className="relative block h-9 w-px overflow-hidden bg-white/20">
        <span className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-coral to-transparent" />
      </span>
    </a>
  </section>
);
