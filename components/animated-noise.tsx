"use client";

import { useEffect, useRef } from "react";
import { useIsMobile } from "@/lib/use-mobile";

export function AnimatedNoise() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const svg = svgRef.current;
    if (!svg) return;

    const turbulence = svg.querySelector("feTurbulence");
    if (!turbulence) return;

    let seed = 0;

    // Single update loop at ~10fps for subtle grain effect
    const interval = setInterval(() => {
      seed = (seed + 1) % 100;
      turbulence.setAttribute("seed", String(seed));
    }, 100);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Hide on mobile — barely visible at 0.035 opacity and GPU-expensive
  if (isMobile) return null;

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.035]"
      style={{ mixBlendMode: "overlay" }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
          seed="0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
