"use client";
import { useCms } from "@/components/portfolio/cms-context";
import Image from "next/image";
import { type FC } from "react";
import { LokiTitle } from "@/components/portfolio/loki-title";

/** Static portrait — intentionally has no 3D, float or motion animation. */
export const ProfileHeroCard: FC = () => { const cms=useCms(); return (
  <div className="kanil-photo-card-wrap">
  <div className="kanil-photo-card" aria-label="Portrait of Kanil Kanchana">
    <div className="kanil-photo-card__inner">
      <div className="kanil-photo-card__halo" aria-hidden="true" />
      <Image
        src={cms.photoUrl || "/profile/kanil-profile.png"}
        unoptimized
        alt="Kanil Kanchana — Web and Backend Developer"
        fill
        priority
        sizes="(max-width: 767px) 92vw, (max-width: 1199px) 42vw, 540px"
        className="kanil-photo-card__portrait"
      />
      <div className="kanil-photo-card__corner kanil-photo-card__corner--tl" aria-hidden="true" />
      <div className="kanil-photo-card__corner kanil-photo-card__corner--br" aria-hidden="true" />
      <span className="kanil-photo-card__tag" aria-hidden="true">&lt;/&gt;</span>
      <span className="kanil-photo-card__bars" aria-hidden="true">///</span>
    </div>
  </div>
  <div className="kanil-photo-nameplate"><LokiTitle words={[cms.name]} enabled={cms.animation.nameEnabled} duration={cms.animation.nameDuration} holdDuration={0} rhythm={cms.animation.nameRhythm} fontWeight={cms.animation.fontWeight} wordCycle={false} fontLoop={cms.animation.nameFontLoop} letterMorph={false} className="kanil-photo-name" /></div>
  </div>
); };
