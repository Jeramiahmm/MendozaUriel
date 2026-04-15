"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

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
  }, []);

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
