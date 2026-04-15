"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProjectCard({
  title,
  tech,
  description,
  className,
}: {
  title: string;
  tech: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "project-card group relative flex flex-col justify-between border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/50 md:p-8",
        className
      )}
    >
      {/* Tech stack */}
      <div>
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {tech}
        </span>

        <h3 className="mb-4 font-display text-2xl tracking-tight md:text-4xl">
          {title}
        </h3>

        <p className="font-mono text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Hover indicator */}
      <div className="mt-6 flex items-center gap-2">
        <span className="h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-8" />
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".project-card",
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
      id="projects"
      ref={sectionRef}
      className="py-32 pl-6 pr-6 md:pl-28 md:pr-12"
    >
      {/* Header */}
      <div className="mb-16 flex items-end justify-between">
        <div>
          <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02 / Projects
          </span>
          <h2 className="font-display text-5xl tracking-tight md:text-7xl">
            SELECTED WORK
          </h2>
        </div>
        <p className="hidden max-w-xs font-mono text-xs leading-relaxed text-muted-foreground md:block">
          ML systems, security research, and data engineering at scale.
        </p>
      </div>

      {/* Asymmetric grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[280px]">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            tech={project.tech}
            description={project.description}
            className={cn(project.colSpan, project.rowSpan)}
          />
        ))}
      </div>
    </section>
  );
}
