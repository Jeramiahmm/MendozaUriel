"use client";

import { useEffect, useRef } from "react";

export function AnimatedNoise() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const turbulence = svg.querySelector("feTurbulence");
    if (!turbulence) return;

    let frame: number;
    let seed = 0;

    const animate = () => {
      seed = (seed + 1) % 100;
      turbulence.setAttribute("seed", String(seed));
      frame = requestAnimationFrame(animate);
    };

    // Run at ~10fps for subtle grain effect
    const interval = setInterval(() => {
      seed = (seed + 1) % 100;
      turbulence.setAttribute("seed", String(seed));
    }, 100);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

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
