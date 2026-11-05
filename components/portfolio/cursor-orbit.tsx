"use client";

import { useEffect, useRef, type FC } from "react";

export const CursorOrbit: FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let x = -100, y = -100, followX = -100, followY = -100;
    const animate = () => {
      followX += (x - followX) * 0.18;
      followY += (y - followY) * 0.18;
      if (ring.current) ring.current.style.transform = `translate3d(${followX}px,${followY}px,0) translate(-50%,-50%)`;
      frame = requestAnimationFrame(animate);
    };
    const move = (event: PointerEvent) => {
      x = event.clientX; y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
        dot.current.classList.add("kanil-cursor--visible");
      }
      ring.current?.classList.add("kanil-cursor-ring--visible");
      ring.current?.classList.toggle("kanil-cursor-ring--hover", Boolean((event.target as Element | null)?.closest("a, button, input, textarea, [role=button]")));
    };
    const hide = () => { dot.current?.classList.remove("kanil-cursor--visible"); ring.current?.classList.remove("kanil-cursor-ring--visible"); };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    frame = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <><div ref={ring} className="kanil-cursor-ring" aria-hidden="true" /><div ref={dot} className="kanil-cursor" aria-hidden="true" /></>;
};
