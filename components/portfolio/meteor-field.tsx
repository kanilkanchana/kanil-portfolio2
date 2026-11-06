"use client";

import { useRef, type FC, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useCms } from "@/components/portfolio/cms-context";

const METEORS = Array.from({ length: 38 }, (_, i) => ({
  x: `${6 + ((i * 37) % 90)}%`,
  y: `${2 + ((i * 73) % 95)}%`,
  delay: `${-((i * 19) % 113) / 10}s`,
  duration: `${4.8 + ((i * 7) % 42) / 10}s`,
  length: `${85 + ((i * 29) % 125)}px`,
}));

export const MeteorField: FC = () => {
  const cms = useCms();
  const labels = cms.meteorWords.filter((word) => word.trim());
  const words = labels.length ? labels : ["PHP", "Python", "Laravel", "API"];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "9%"]);

  return (
    <div ref={ref} className="kanil-meteor-field" aria-hidden="true">
      <motion.div className="kanil-meteor-glow" style={{ y }} />
      {METEORS.map((meteor, i) => (
        <span
          key={i}
          className="kanil-meteor kanil-meteor--tech"
          style={{
            "--meteor-x": meteor.x,
            "--meteor-y": meteor.y,
            "--meteor-delay": meteor.delay,
            "--meteor-duration": meteor.duration,
            "--meteor-length": meteor.length,
          } as CSSProperties}
        >
          <span className="kanil-meteor-tech">
            {words[i % words.length]}
          </span>
        </span>
      ))}
    </div>
  );
};
