"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { AnimatedNoise } from "@/components/animated-noise";
import { SplitFlapText } from "@/components/split-flap-text";
import { ScrambleText } from "@/components/scramble-text";
import { BitmapChevron } from "@/components/bitmap-chevron";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const content = contentRef.current;
      if (!content) return;

      // Parallax fade-out on scroll
      gsap.to(content, {
        y: -120,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Stagger in the body elements
      gsap.fromTo(
        ".hero-animate",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.8,
        }
      );
    },
    { scope: sectionRef }
  );

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <AnimatedNoise />

      {/* Left vertical label */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 md:block">
        <span
          className="block -rotate-90 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
          style={{ transformOrigin: "center center" }}
        >
          PORTFOLIO
        </span>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 pl-6 pr-6 md:pl-28 md:pr-12"
      >
        {/* Main name */}
        <div className="mb-4">
          <SplitFlapText
            text="URIEL MENDOZA"
            className="text-5xl leading-none md:text-8xl lg:text-9xl"
            delay={200}
            charDelay={50}
            duration={500}
          />
        </div>

        {/* Subtitle */}
        <div className="hero-animate mb-8">
          <span className="font-display text-2xl tracking-tight text-muted-foreground md:text-4xl">
            CS & CYBERSECURITY @ CU BOULDER
          </span>
        </div>

        {/* Body paragraph */}
        <p className="hero-animate mb-10 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
          Building secure systems at the intersection of machine learning,
          network engineering, and cloud infrastructure. Incoming Network
          Engineer at Lumen Technologies.
        </p>

        {/* CTAs */}
        <div className="hero-animate mb-8 flex items-center gap-6">
          <button
            onClick={() => scrollTo("projects")}
            className="group flex items-center gap-3 border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background"
          >
            View My Work
            <BitmapChevron direction="right" size={14} />
          </button>

          <button
            onClick={() => scrollTo("experience")}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ScrambleText text="Experience" />
          </button>
        </div>

        {/* Social links */}
        <div className="hero-animate flex items-center gap-6">
          <a
            href="https://github.com/uriel-mendoza"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
          >
            <ScrambleText text="GitHub" />
          </a>
          <span className="text-muted-foreground">/</span>
          <a
            href="https://linkedin.com/in/uriel-mendoza"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
          >
            <ScrambleText text="LinkedIn" />
          </a>
        </div>
      </div>

      {/* Bottom right tag */}
      <div className="absolute bottom-8 right-6 md:right-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          v.2026 / Denver, CO
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="hero-animate flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <BitmapChevron direction="down" size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
