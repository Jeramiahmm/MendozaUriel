"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  if (prefersReducedMotion.matches) {
    gsap.globalTimeline.timeScale(0);
    ScrollTrigger.defaults({ animation: undefined });
  }
}

export { gsap, ScrollTrigger, useGSAP };
