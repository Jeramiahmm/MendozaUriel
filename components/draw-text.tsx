"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface DrawTextProps {
  text: string;
  className?: string;
  strokeColor?: string;
}

export function DrawText({
  text,
  className,
  strokeColor,
}: DrawTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGTextElement>(null);

  useGSAP(
    () => {
      const textEl = pathRef.current;
      if (!textEl) return;

      const length = textEl.getComputedTextLength();
      textEl.style.strokeDasharray = `${length}`;
      textEl.style.strokeDashoffset = `${length}`;

      gsap.to(textEl, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(textEl, {
        fill: "var(--foreground)",
        delay: 0.8,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <svg
        width="100%"
        height="1.2em"
        viewBox="0 0 500 60"
        preserveAspectRatio="xMinYMid meet"
      >
        <text
          ref={pathRef}
          x="0"
          y="48"
          className="font-display text-5xl"
          fill="none"
          stroke={strokeColor || "var(--accent)"}
          strokeWidth="1"
          style={{ fontSize: "56px" }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
