"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/lib/use-mobile";

interface SectionTransitionProps {
  children: React.ReactNode;
}

export function SectionTransition({ children }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (isMobile) {
        // Mobile: lightweight opacity + small translate (no clipPath)
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      } else {
        // Desktop: full clipPath + y animation
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 60,
            clipPath: "inset(8% 0% 8% 0%)",
          },
          {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: ref, dependencies: [isMobile] }
  );

  return <div ref={ref}>{children}</div>;
}
