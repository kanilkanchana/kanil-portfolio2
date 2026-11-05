"use client";

import { useRef, type FC, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Stable positions: deterministic, no random server/client hydration mismatches.
const METEORS = Array.from({ length: 38 }, (_, i) => ({
  x: `${12 + ((i * 37) % 84)}%`,
  y: `${2 + ((i * 73) % 95)}%`,
  delay: `${-((i * 19) % 113) / 10}s`,
  duration: `${4.8 + ((i * 7) % 42) / 10}s`,
  length: `${85 + ((i * 29) % 125)}px`,
  kind: i % 9 === 0 ? "tech" : i % 7 === 0 ? "symbol" : i % 4 === 0 ? "spark" : "plain",
  tech: (["PHP", "Python", "Laravel", "API", "SQL", "JS"][(Math.floor(i / 9)) % 6]),
  symbol: (["✦", "✧", "◈", "⌘"][(Math.floor(i / 7)) % 4]),
}));

export const MeteorField: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "8%"]);
  return (
    <div ref={ref} className="kanil-meteor-field" aria-hidden="true">
      <motion.div className="kanil-meteor-glow" style={{ y }} />
      {METEORS.map((meteor, i) => (
        <span key={i} className={`kanil-meteor kanil-meteor--${meteor.kind}`} style={{
          "--meteor-x": meteor.x,
          "--meteor-y": meteor.y,
          "--meteor-delay": meteor.delay,
          "--meteor-duration": meteor.duration,
          "--meteor-length": meteor.length,
        } as CSSProperties}>
          {meteor.kind === "tech" && <span className="kanil-meteor-tech">{meteor.tech}</span>}
          {meteor.kind === "symbol" && <span className="kanil-meteor-symbol">{meteor.symbol}</span>}
          {meteor.kind === "spark" && <span className="kanil-meteor-spark" />}
        </span>
      ))}
    </div>
  );
};
