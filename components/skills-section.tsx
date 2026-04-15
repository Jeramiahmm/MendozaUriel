"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { skillCategories } from "@/lib/data";

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".skill-column",
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
    <section id="skills" ref={sectionRef}>
      {/* Divider */}
      <div className="pl-6 pr-6 md:pl-28 md:pr-12">
        <hr className="border-border" />
      </div>

      <div className="py-32 pl-6 pr-6 md:pl-28 md:pr-12">
        {/* Header */}
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          03 / Skills
        </span>
        <h2 className="mb-16 font-display text-5xl tracking-tight md:text-7xl">
          WHAT I WORK WITH
        </h2>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => (
            <div key={category.label} className="skill-column">
              <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {category.label}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
