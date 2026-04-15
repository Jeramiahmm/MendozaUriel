"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experiences } from "@/lib/data";
import { ScrambleText } from "@/components/scramble-text";
import { cn } from "@/lib/utils";

function StatusTag({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    INCOMING: "bg-accent text-background",
    ACTIVE: "bg-emerald-500 text-background",
    COMPLETED: "bg-muted-foreground/20 text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
        colorMap[status] || colorMap.COMPLETED
      )}
    >
      {status}
    </span>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);

  useGSAP(
    () => {
      // Stagger in section header
      gsap.fromTo(
        ".exp-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Initial state: show first card, hide rest
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          opacity: i === 0 ? 1 : 0,
          x: i === 0 ? 0 : 80,
          scale: i === 0 ? 1 : 0.95,
        });
      });
    },
    { scope: sectionRef }
  );

  const goTo = useCallback(
    (newIndex: number) => {
      if (isAnimating.current) return;
      if (newIndex < 0 || newIndex >= experiences.length) return;
      if (newIndex === activeIndex) return;

      isAnimating.current = true;
      const currentCard = cardRefs.current[activeIndex];
      const nextCard = cardRefs.current[newIndex];
      const direction = newIndex > activeIndex ? 1 : -1;

      if (currentCard && nextCard) {
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
          },
        });

        // Current card exits
        tl.to(currentCard, {
          x: -80 * direction,
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
        });

        // Next card enters
        tl.fromTo(
          nextCard,
          { x: 80 * direction, opacity: 0, scale: 0.95 },
          { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
          "-=0.15"
        );
      }

      setActiveIndex(newIndex);
    },
    [activeIndex]
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 pl-6 pr-6 md:pl-28 md:pr-12"
    >
      {/* Section header */}
      <div className="exp-header mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            01 / Experience
          </span>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">
            WHERE I&apos;VE WORKED
          </h2>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center gap-4">
          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 transition-all duration-300",
                  activeIndex === i
                    ? "w-8 bg-accent"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground"
                )}
                aria-label={`Go to experience ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className={cn(
                "flex h-10 w-10 items-center justify-center border transition-colors",
                activeIndex === 0
                  ? "border-border text-muted-foreground/30"
                  : "border-accent text-accent hover:bg-accent hover:text-background"
              )}
              aria-label="Previous experience"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === experiences.length - 1}
              className={cn(
                "flex h-10 w-10 items-center justify-center border transition-colors",
                activeIndex === experiences.length - 1
                  ? "border-border text-muted-foreground/30"
                  : "border-accent text-accent hover:bg-accent hover:text-background"
              )}
              aria-label="Next experience"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Card counter */}
      <div className="mb-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
        {String(activeIndex + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
      </div>

      {/* Cards container */}
      <div className="relative min-h-[460px] md:min-h-[400px]">
        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col justify-between border border-border bg-card p-6 md:p-10"
          >
            {/* Accent top strip */}
            <div className="absolute left-0 right-0 top-0 h-[3px] bg-accent" />

            {/* Geometric decoration */}
            <div className="absolute bottom-6 right-6 opacity-[0.06] md:bottom-10 md:right-10">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <polygon
                  points="60,5 110,35 110,85 60,115 10,85 10,35"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                />
                <polygon
                  points="60,20 95,40 95,80 60,100 25,80 25,40"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                />
                <polygon
                  points="60,35 80,47 80,73 60,85 40,73 40,47"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Top */}
            <div>
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {exp.role}
                </span>
                <StatusTag status={exp.status} />
              </div>

              <h3 className="mb-2 font-display text-3xl tracking-tight md:text-5xl lg:text-7xl">
                <ScrambleText text={exp.company} />
              </h3>

              <div className="mb-6 flex flex-wrap items-center gap-3 md:gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {exp.location}
                </span>
                <span className="text-muted-foreground">/</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              <div className="space-y-3">
                {exp.highlights.map((highlight, j) => (
                  <p
                    key={j}
                    className="max-w-3xl font-mono text-xs leading-relaxed text-muted-foreground md:text-sm"
                  >
                    <span className="mr-2 text-accent">--</span>
                    {highlight}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom navigation hint */}
            <div className="mt-6 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/40">
                {i < experiences.length - 1 ? "CLICK ARROW OR DOT FOR NEXT" : "LAST ENTRY"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
