"use client";

import { type CSSProperties, type FC } from "react";
import { useCms } from "@/components/portfolio/cms-context";
import { LokiTitle } from "@/components/portfolio/loki-title";
import {
  HERO_NAME,
  HERO_ROLE,
} from "@/constants/portfolio-constants";

const delay = (seconds: number): CSSProperties => ({
  animationDelay: `calc(var(--intro-delay) + ${seconds}s)`,
});

export const HeroText: FC = () => {
  const cms=useCms();
  const font={ enabled: cms.animation.enabled, duration: cms.animation.duration, holdDuration: cms.animation.holdDuration, rhythm: cms.animation.rhythm, fontWeight: cms.animation.fontWeight, wordCycle:cms.animation.wordCycle, fontLoop:cms.animation.fontLoop,letterMorph:cms.animation.letterMorph };
  return (
    <div className="z-10 mt-24 text-center md:mt-32 md:text-left max-w-3xl">
      <div className="flex-col hidden md:flex c-space">
        <div
          className="reveal inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md px-3 py-1.5 mb-6"
          style={delay(0.05)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-mint animate-ping opacity-75" />
            <span className="relative rounded-full bg-mint h-2 w-2" />
          </span>
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-300">
            {cms.availability}
          </span>
        </div>

        <h1
          className="reveal text-3xl font-light text-neutral-400"
          style={delay(0.12)}
        >
          Hi, I&apos;m {cms.name}
        </h1>

        <div className="reveal mt-2 text-4xl lg:text-5xl font-bold leading-tight text-[#e6efff]" style={delay(0.19)}>
          {cms.role}
          <div>{cms.prefix}</div>
        </div>

        <div className="reveal" style={delay(0.26)}>
          <LokiTitle
            words={cms.heroWords} {...font}
            className="font-black text-white text-7xl lg:text-8xl"
          />
        </div>

        <p
          className="reveal text-3xl lg:text-4xl font-semibold text-neutral-300"
          style={delay(0.33)}
        >
          {cms.subtitle}
        </p>

        <div className="reveal flex flex-wrap gap-4 mt-10" style={delay(0.4)}>
          <a href="#contact" className="btn-primary">
            <span>Contact Me</span>
            <span aria-hidden>→</span>
          </a>
          <a href="#work" className="btn-ghost">
            <span>View My Work</span>
          </a>
        </div>
      </div>

      <div className="flex flex-col space-y-5 md:hidden px-2">
        <div
          className="reveal inline-flex self-center items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5"
          style={delay(0.05)}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-mint animate-ping opacity-75" />
            <span className="relative rounded-full bg-mint h-2 w-2" />
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-300">
            {cms.availability}
          </span>
        </div>

        <p
          className="reveal text-3xl font-light text-neutral-400"
          style={delay(0.12)}
        >
          Hi, I&apos;m {cms.name.split(' ')[0]}
        </p>

        <div className="reveal text-3xl font-bold text-[#e6efff]" style={delay(0.19)}>
          {cms.role}
          <div>{cms.prefix}</div>
        </div>

        <div className="reveal" style={delay(0.26)}>
          <LokiTitle
            words={cms.heroWords} {...font}
            className="font-bold text-white text-[clamp(2.2rem,10vw,3rem)]"
          />
        </div>

        <p
          className="reveal text-3xl font-semibold text-neutral-300"
          style={delay(0.33)}
        >
          {cms.subtitle}
        </p>

        <div
          className="reveal flex flex-col gap-3 mt-4 items-center"
          style={delay(0.4)}
        >
          <a href="#contact" className="btn-primary w-full">
            <span>Contact Me</span>
            <span aria-hidden>→</span>
          </a>
          <a href="#work" className="btn-ghost w-full">
            <span>View My Work</span>
          </a>
        </div>
      </div>
    </div>
  );
};
