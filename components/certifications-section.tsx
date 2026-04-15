"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications } from "@/lib/data";
import { cn } from "@/lib/utils";

function FlipCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[0];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      className="cert-card perspective-container h-[280px] md:h-[320px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${cert.name} by ${cert.issuer}. Press Enter to flip.`}
    >
      <div
        className={cn(
          "preserve-3d relative h-full w-full transition-transform duration-[600ms]",
          isFlipped && "[transform:rotateY(180deg)]"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        {/* Front face */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 flex flex-col justify-between border-l-2 bg-card p-6 md:p-8",
            cert.newest ? "border-l-accent" : "border-l-muted-foreground/30"
          )}
        >
          {/* Newest badge */}
          {cert.newest && (
            <span className="absolute right-4 top-4 bg-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-background">
              NEWEST
            </span>
          )}

          <div>
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {cert.issuer}
            </span>

            <h3
              className={cn(
                "font-display tracking-tight",
                cert.newest
                  ? "text-3xl md:text-4xl"
                  : "text-2xl md:text-3xl"
              )}
            >
              {cert.name}
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              {cert.date}
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground/50">
              HOVER TO FLIP
            </span>
          </div>
        </div>

        {/* Back face */}
        <div
          className={cn(
            "backface-hidden absolute inset-0 flex flex-col justify-between border-l-2 bg-card p-6 [transform:rotateY(180deg)] md:p-8",
            cert.newest ? "border-l-accent" : "border-l-muted-foreground/30"
          )}
        >
          <div>
            <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Credential Details
            </span>

            <h4 className="mb-6 font-display text-xl tracking-tight">
              {cert.name}
            </h4>

            <ul className="space-y-3">
              {cert.backDetails.skills.map((skill) => (
                <li
                  key={skill}
                  className="font-mono text-xs text-muted-foreground"
                >
                  <span className="mr-2 text-accent">&mdash;</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.2em]",
                cert.backDetails.status === "Verified"
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              {cert.backDetails.status}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              {cert.issuer}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CertificationsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cert-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-32 pl-6 pr-6 md:pl-28 md:pr-12"
    >
      <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        04 / Certifications
      </span>
      <h2 className="mb-16 font-display text-5xl tracking-tight md:text-7xl">
        CREDENTIALS
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <FlipCard key={cert.name} cert={cert} index={i} />
        ))}
      </div>
    </section>
  );
}
