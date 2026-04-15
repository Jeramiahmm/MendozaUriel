"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const counter = { val: 0 };

      gsap.to(counter, {
        val: value,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            if (hasAnimated.current) return;
            hasAnimated.current = true;
          },
        },
        onUpdate: () => {
          setDisplay(Math.round(counter.val));
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
