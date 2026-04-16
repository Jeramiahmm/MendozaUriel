"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/lib/use-mobile";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      // On mobile, keep ScrollTrigger working with native scroll
      const onScroll = () => ScrollTrigger.update();
      window.addEventListener("scroll", onScroll, { passive: true });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
      };
    }

    // Desktop: use Lenis
    const onScroll = () => {
      ScrollTrigger.update();
    };

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      if (lenis) {
        lenis.off("scroll", onScroll);
      }
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  // Mobile: render children directly with native scrolling
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}
