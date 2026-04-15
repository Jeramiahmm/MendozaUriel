"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wireframeRef = useRef<SVGSVGElement>(null);
  const umRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // Layer 1: Wireframe continuous rotation
      if (wireframeRef.current) {
        gsap.to(wireframeRef.current, {
          rotation: 360,
          duration: 30,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
      }

      // Layer 2: Flowing SVG lines — animate dashoffset
      gsap.utils.toArray<SVGPathElement>(".hero-flow-line").forEach((line, i) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: `${length * 0.3} ${length * 0.7}`,
          strokeDashoffset: 0,
        });
        gsap.to(line, {
          strokeDashoffset: -length,
          duration: 12 + i * 4,
          repeat: -1,
          ease: "none",
        });
      });

      // Layer 3: Giant "UM" parallax
      if (umRef.current) {
        gsap.to(umRef.current, {
          y: -200,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Layer 1: 3D Morphing Wireframe */}
      <svg
        ref={wireframeRef}
        className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.07]"
        width="700"
        height="700"
        viewBox="0 0 400 400"
        fill="none"
      >
        {/* Icosahedron-like wireframe */}
        <g stroke="var(--accent)" strokeWidth="0.5">
          {/* Outer pentagon */}
          <polygon points="200,40 350,140 310,310 90,310 50,140" />
          {/* Inner pentagon (rotated) */}
          <polygon points="200,340 70,250 120,80 280,80 330,250" />
          {/* Cross connections */}
          <line x1="200" y1="40" x2="200" y2="340" />
          <line x1="200" y1="40" x2="70" y2="250" />
          <line x1="200" y1="40" x2="330" y2="250" />
          <line x1="350" y1="140" x2="120" y2="80" />
          <line x1="350" y1="140" x2="200" y2="340" />
          <line x1="310" y1="310" x2="280" y2="80" />
          <line x1="310" y1="310" x2="70" y2="250" />
          <line x1="90" y1="310" x2="330" y2="250" />
          <line x1="90" y1="310" x2="120" y2="80" />
          <line x1="50" y1="140" x2="280" y2="80" />
          <line x1="50" y1="140" x2="200" y2="340" />
          {/* Additional depth lines */}
          <line x1="200" y1="200" x2="200" y2="40" strokeOpacity="0.4" />
          <line x1="200" y1="200" x2="350" y2="140" strokeOpacity="0.4" />
          <line x1="200" y1="200" x2="310" y2="310" strokeOpacity="0.4" />
          <line x1="200" y1="200" x2="90" y2="310" strokeOpacity="0.4" />
          <line x1="200" y1="200" x2="50" y2="140" strokeOpacity="0.4" />
          {/* Floating vertices */}
          <circle cx="200" cy="40" r="3" fill="var(--accent)" fillOpacity="0.3" />
          <circle cx="350" cy="140" r="3" fill="var(--accent)" fillOpacity="0.3" />
          <circle cx="310" cy="310" r="3" fill="var(--accent)" fillOpacity="0.3" />
          <circle cx="90" cy="310" r="3" fill="var(--accent)" fillOpacity="0.3" />
          <circle cx="50" cy="140" r="3" fill="var(--accent)" fillOpacity="0.3" />
          <circle cx="200" cy="200" r="4" fill="var(--accent)" fillOpacity="0.5" />
        </g>
      </svg>

      {/* Layer 2: Flowing SVG Lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.1]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <path
          className="hero-flow-line"
          d="M-100,200 C200,100 400,400 700,250 C1000,100 1200,350 1540,200"
          stroke="var(--accent)"
          strokeWidth="1"
          fill="none"
        />
        <path
          className="hero-flow-line"
          d="M-100,450 C300,350 500,600 800,400 C1100,200 1300,500 1540,450"
          stroke="var(--accent)"
          strokeWidth="0.8"
          fill="none"
        />
        <path
          className="hero-flow-line"
          d="M-100,650 C250,550 450,750 750,600 C1050,450 1250,700 1540,650"
          stroke="var(--accent)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          className="hero-flow-line"
          d="M-100,100 C350,200 550,50 850,150 C1150,250 1350,100 1540,150"
          stroke="var(--accent)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      {/* Layer 3: Giant "UM" Outline Typography */}
      <svg
        ref={umRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]"
        width="100%"
        height="80vh"
        viewBox="0 0 500 300"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-display"
          stroke="var(--accent)"
          strokeWidth="1"
          fill="none"
          style={{ fontSize: "280px", fontFamily: "var(--font-display)" }}
        >
          UM
        </text>
      </svg>
    </div>
  );
}
