"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface GeometricDividerProps {
  variant?: "diamond" | "hexagon" | "dots" | "circuit";
  className?: string;
}

export function GeometricDivider({
  variant = "diamond",
  className,
}: GeometricDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".geo-shape",
        { scale: 0, rotation: -90, opacity: 0 },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".geo-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  const shapes = {
    diamond: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="geo-shape text-accent">
        <polygon points="10,1 19,10 10,19 1,10" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    hexagon: (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none" className="geo-shape text-accent">
        <polygon points="11,1 20,5.5 20,14.5 11,19 2,14.5 2,5.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    dots: (
      <div className="geo-shape flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 bg-accent"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        ))}
      </div>
    ),
    circuit: (
      <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="geo-shape text-accent">
        <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="30" cy="10" r="2" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="10" r="1" fill="currentColor" fillOpacity="0.5" />
      </svg>
    ),
  };

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-4 px-6 py-4 md:px-28", className)}
    >
      <div className="geo-line h-[1px] flex-1 origin-left bg-border" />
      {shapes[variant]}
      <div className="geo-line h-[1px] flex-1 origin-right bg-border" />
    </div>
  );
}
