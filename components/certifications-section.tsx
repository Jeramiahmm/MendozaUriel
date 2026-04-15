"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { certifications } from "@/lib/data";
import { cn } from "@/lib/utils";

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
          duration: 0.8,
          stagger: 0.15,
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
      {/* Header */}
      <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        04 / Certifications
      </span>
      <h2 className="mb-16 font-display text-5xl tracking-tight md:text-7xl">
        CREDENTIALS
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className={cn(
              "cert-card relative border-l-2 bg-card p-6 md:p-8",
              cert.newest
                ? "border-l-accent"
                : "border-l-muted-foreground/30"
            )}
          >
            {/* Newest badge */}
            {cert.newest && (
              <span className="absolute right-4 top-4 bg-accent px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-background">
                NEWEST
              </span>
            )}

            {/* Issuer */}
            <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {cert.issuer}
            </span>

            {/* Cert name */}
            <h3
              className={cn(
                "mb-4 font-display tracking-tight",
                cert.newest ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
              )}
            >
              {cert.name}
            </h3>

            {/* Date */}
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              {cert.date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
