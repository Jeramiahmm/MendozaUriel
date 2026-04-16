"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/lib/use-mobile";
import { AnimatedNoise } from "@/components/animated-noise";
import { HeroBackground } from "@/components/hero-background";
import { SplitFlapText } from "@/components/split-flap-text";
import { ScrambleText } from "@/components/scramble-text";
import { BitmapChevron } from "@/components/bitmap-chevron";
import { HighlightText } from "@/components/highlight-text";
import { ProfilePhoto } from "@/components/profile-photo";
import { useMagneticHover } from "@/components/magnetic-hover";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  useMagneticHover(ctaRef, { strength: 0.2, radius: 120 });

  useGSAP(
    () => {
      const content = contentRef.current;
      if (!content) return;

      // Cinematic parallax fade-out on scroll — desktop only
      if (!isMobile) {
        gsap.to(content, {
          y: -150,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Stagger entrance sequence (cinematic timing)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-photo",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        0
      )
        .fromTo(
          ".hero-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.8
        )
        .fromTo(
          ".hero-bio",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          1.1
        )
        .fromTo(
          ".hero-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          1.4
        )
        .fromTo(
          ".hero-social",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.7
        )
        .fromTo(
          ".hero-scroll",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          2.0
        );

      // GSAP scroll indicator bounce (replacing CSS)
      gsap.to(".hero-scroll-chevron", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
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
      <HeroBackground />

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
        {/* Profile photo */}
        <div className="hero-photo mb-8">
          <ProfilePhoto size="lg" />
        </div>

        {/* Main name */}
        <div className="mb-4">
          <SplitFlapText
            text="URIEL MENDOZA"
            className="text-4xl leading-none sm:text-5xl md:text-8xl lg:text-9xl"
            delay={300}
            charDelay={50}
            duration={500}
          />
        </div>

        {/* Subtitle */}
        <div className="hero-subtitle mb-8">
          <span className="font-display text-xl tracking-tight text-foreground/75 sm:text-2xl md:text-4xl">
            CS & CYBERSECURITY @ CU BOULDER
          </span>
        </div>

        {/* Body paragraph */}
        <p className="hero-bio mb-10 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground md:text-sm">
          Incoming Network Engineer at Lumen Technologies. Full-stack
          software engineer specializing in{" "}
          <HighlightText>machine learning</HighlightText>, cloud, and security.
          NASA L&apos;SPACE researcher and L3Harris machine learning
          researcher.
        </p>

        {/* CTAs */}
        <div className="hero-cta mb-8 flex items-center gap-6">
          <button
            ref={ctaRef}
            onClick={() => scrollTo("projects")}
            className="group flex items-center gap-3 border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background"
            aria-label="Scroll to projects section"
          >
            View My Work
            <BitmapChevron direction="right" size={14} />
          </button>

          <button
            onClick={() => scrollTo("experience")}
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Scroll to experience section"
          >
            <ScrambleText text="Experience" />
          </button>
        </div>

        {/* Social links */}
        <div className="hero-social flex items-center gap-6">
          <a
            href="https://github.com/Jeramiahmm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
            aria-label="Visit GitHub profile"
          >
            <ScrambleText text="GitHub" />
          </a>
          <span className="text-muted-foreground">/</span>
          <a
            href="https://www.linkedin.com/in/uriel-mendoza-94t/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
            aria-label="Visit LinkedIn profile"
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
      <div className="hero-scroll absolute bottom-16 left-1/2 -translate-x-1/2 md:bottom-8">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <span className="hero-scroll-chevron">
            <BitmapChevron direction="down" size={16} />
          </span>
        </div>
      </div>
    </section>
  );
}
