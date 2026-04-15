"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { experiences } from "@/lib/data";
import { ScrambleText } from "@/components/scramble-text";
import { cn } from "@/lib/utils";

function StatusTag({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    INCOMING: "border-accent text-accent",
    ACTIVE: "border-emerald-500 text-emerald-500",
    COMPLETED: "border-muted-foreground text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-block border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
        colorMap[status] || colorMap.COMPLETED
      )}
    >
      {status}
    </span>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const scrollWidth = track.scrollWidth - track.clientWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Stagger card content
      gsap.fromTo(
        ".exp-card-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Section header */}
      <div className="py-16 pl-6 pr-6 md:pl-28 md:pr-12">
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          01 / Experience
        </span>
        <h2 className="font-display text-5xl tracking-tight md:text-7xl">
          WHERE I&apos;VE WORKED
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-8 px-6 pb-16 md:px-28"
      >
        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            className="exp-card-content flex w-[85vw] flex-shrink-0 flex-col justify-between border border-border bg-card p-8 md:w-[60vw] lg:w-[45vw]"
          >
            {/* Top */}
            <div>
              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {exp.role}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                  {exp.period}
                </span>
              </div>

              <h3 className="mb-2 font-display text-3xl tracking-tight md:text-5xl">
                <ScrambleText text={exp.company} />
              </h3>

              <span className="mb-8 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {exp.location}
              </span>

              <div className="mt-6 space-y-4">
                {exp.highlights.map((highlight, j) => (
                  <p
                    key={j}
                    className="font-mono text-xs leading-relaxed text-muted-foreground"
                  >
                    <span className="mr-2 text-accent">--</span>
                    {highlight}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8">
              <StatusTag status={exp.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
