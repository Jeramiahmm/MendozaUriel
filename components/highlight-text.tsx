"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function HighlightText({
  children,
  className,
  color,
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const underline = el.querySelector(".highlight-bar") as HTMLElement;
      if (!underline) return;

      gsap.fromTo(
        underline,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      {children}
      <span
        className="highlight-bar absolute bottom-0 left-0 h-[2px] w-full origin-left"
        style={{ backgroundColor: color || "var(--accent)" }}
      />
    </span>
  );
}
