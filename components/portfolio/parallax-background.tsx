"use client";

import Image from "next/image";
import { useEffect, type FC } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useDeferredLayers } from "@/hooks/use-deferred-3d";

const LAYER_SIZES = "100vw";

export const ParallaxBackground: FC = () => {
  const withLayers = useDeferredLayers();
  const { scrollYProgress } = useScroll();
  const scroll = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const mouseX = useSpring(pointerX, { stiffness: 75, damping: 24 });
  const mouseY = useSpring(pointerY, { stiffness: 75, damping: 24 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const nx = event.clientX / Math.max(window.innerWidth, 1) - 0.5;
      const ny = event.clientY / Math.max(window.innerHeight, 1) - 0.5;
      pointerX.set(nx);
      pointerY.set(ny);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [pointerX, pointerY]);

  const skyX = useTransform(mouseX, [-0.5, 0.5], ["-1.2%", "1.2%"]);
  const skyY = useTransform(mouseY, [-0.5, 0.5], ["-0.8%", "0.8%"]);
  const farX = useTransform(mouseX, [-0.5, 0.5], ["-2.2%", "2.2%"]);
  const nearX = useTransform(mouseX, [-0.5, 0.5], ["-3.6%", "3.6%"]);

  const mountain3ScrollY = useTransform(scroll, [0, 0.6], ["0%", "16%"]);
  const planetsScrollY = useTransform(scroll, [0, 0.6], ["0%", "9%"]);
  const mountain2ScrollY = useTransform(scroll, [0, 0.6], ["0%", "24%"]);
  const mountain1ScrollY = useTransform(scroll, [0, 0.6], ["0%", "31%"]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute -inset-[3%] -z-50"
          aria-hidden
          style={{ x: skyX, y: skyY }}
        >
          <Image
            src="/assets/sky.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes={LAYER_SIZES}
            className="object-cover object-bottom"
          />
        </motion.div>

        {!withLayers && (
          <div
            aria-hidden
            className="absolute inset-0 -z-40 bg-gradient-to-b from-transparent via-primary/30 to-primary"
          />
        )}

        {withLayers && (
          <>
            <motion.div
              aria-hidden
              className="absolute -inset-[4%] -z-40"
              style={{ x: farX, y: mountain3ScrollY }}
            >
              <Image src="/assets/mountain-3.webp" alt="" fill sizes={LAYER_SIZES} className="object-cover object-bottom" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -inset-[4%] -z-30"
              style={{ x: nearX, y: planetsScrollY }}
            >
              <Image src="/assets/planets.webp" alt="" fill sizes={LAYER_SIZES} className="object-cover object-bottom" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -inset-[5%] -z-20"
              style={{ x: farX, y: mountain2ScrollY }}
            >
              <Image src="/assets/mountain-2.webp" alt="" fill sizes={LAYER_SIZES} className="object-cover object-bottom" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -inset-[5%] -z-10"
              style={{ x: nearX, y: mountain1ScrollY }}
            >
              <Image src="/assets/mountain-1.webp" alt="" fill sizes={LAYER_SIZES} className="object-cover object-bottom" />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
