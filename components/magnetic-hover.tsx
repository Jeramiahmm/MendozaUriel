"use client";

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagneticHover(
  ref: React.RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
) {
  const { strength = 0.3, radius = 150 } = options;
  const isInside = useRef(false);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      if (distance < radius) {
        if (!isInside.current) {
          isInside.current = true;
        }
        const pull = (1 - distance / radius) * strength;
        gsap.to(el, {
          x: distX * pull,
          y: distY * pull,
          duration: 0.3,
          ease: "power2.out",
        });
      } else if (isInside.current) {
        isInside.current = false;
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      }
    },
    [ref, strength, radius]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    isInside.current = false;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave, ref]);
}
