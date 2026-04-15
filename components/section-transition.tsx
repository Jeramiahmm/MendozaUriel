"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface SectionTransitionProps {
  children: React.ReactNode;
}

export function SectionTransition({ children }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

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
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
