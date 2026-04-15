"use client";

import { useRef } from "react";
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
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!section || cards.length === 0) return;

      const numCards = cards.length;

      // Initial stacking: each card offset deeper
      cards.forEach((card, i) => {
        gsap.set(card, {
          zIndex: numCards - i,
          scale: 1 - i * 0.05,
          y: i * 20,
          opacity: i === 0 ? 1 : 0.6 - i * 0.15,
        });
      });

      // Create a timeline for card transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${numCards * 100}vh`,
          invalidateOnRefresh: true,
        },
      });

      // Animate each card flying off and revealing the next
      for (let i = 0; i < numCards - 1; i++) {
        const progress = i / (numCards - 1);

        // Current card flies away
        tl.to(
          cards[i],
          {
            x: "-120vw",
            rotateY: -15,
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          progress
        );

        // Next card scales up to front position
        tl.to(
          cards[i + 1],
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          progress
        );

        // Cards behind the next one also shift forward
        for (let j = i + 2; j < numCards; j++) {
          tl.to(
            cards[j],
            {
              scale: 1 - (j - i - 1) * 0.05,
              y: (j - i - 1) * 20,
              opacity: 0.6 - (j - i - 1) * 0.15,
              duration: 1,
              ease: "power2.inOut",
            },
            progress
          );
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      {/* Section header */}
      <div className="absolute left-6 top-12 z-10 md:left-28">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          01 / Experience
        </span>
        <h2 className="font-display text-5xl tracking-tight md:text-7xl">
          WHERE I&apos;VE WORKED
        </h2>
      </div>

      {/* 3D Card Deck */}
      <div
        ref={deckRef}
        className="perspective-container flex h-screen items-center justify-center px-6 md:px-28"
      >
        <div className="preserve-3d relative w-full max-w-4xl">
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute inset-0 flex flex-col justify-between border border-border bg-card p-8 md:p-12"
              style={{ minHeight: "420px" }}
            >
              {/* Accent top strip */}
              <div
                className="absolute left-0 right-0 top-0 h-[3px]"
                style={{ backgroundColor: "var(--accent)" }}
              />

              {/* Top */}
              <div>
                <div className="mb-6 flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    {exp.role}
                  </span>
                  <StatusTag status={exp.status} />
                </div>

                <h3 className="mb-2 font-display text-4xl tracking-tight md:text-6xl lg:text-8xl">
                  <ScrambleText text={exp.company} />
                </h3>

                <div className="mb-8 flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {exp.location}
                  </span>
                  <span className="text-muted-foreground">/</span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    {exp.period}
                  </span>
                </div>

                <div className="space-y-4">
                  {exp.highlights.map((highlight, j) => (
                    <p
                      key={j}
                      className="font-mono text-xs leading-relaxed text-muted-foreground md:text-sm"
                    >
                      <span className="mr-2 text-accent">--</span>
                      {highlight}
                    </p>
                  ))}
                </div>
              </div>

              {/* Card index */}
              <div className="mt-8 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
