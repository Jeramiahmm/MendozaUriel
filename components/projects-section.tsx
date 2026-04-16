"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { StatCounter } from "@/components/stat-counter";

// Parse {{metric}} markers into animated stat counters or bold accent spans
function renderDescription(text: string) {
  const parts = text.split(/(\{\{.*?\}\})/g);
  return parts.map((part, i) => {
    if (part.startsWith("{{") && part.endsWith("}}")) {
      const metric = part.slice(2, -2);
      // Try to extract a number for animated counting
      const numMatch = metric.match(/^(\d+)/);
      if (numMatch) {
        const num = parseInt(numMatch[1], 10);
        const rest = metric.slice(numMatch[1].length);
        return (
          <strong key={i} className="font-semibold text-accent">
            <StatCounter value={num} suffix={rest} />
          </strong>
        );
      }
      return (
        <strong key={i} className="font-semibold text-accent">
          {metric}
        </strong>
      );
    }
    return part;
  });
}

// SVG pattern components for each project
function NeuralPattern() {
  return (
    <svg
      className="neural-pattern h-full w-full"
      viewBox="0 0 400 200"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Nodes */}
      {[
        [60, 40], [60, 100], [60, 160],
        [160, 30], [160, 80], [160, 130], [160, 180],
        [260, 50], [260, 110], [260, 170],
        [350, 80], [350, 140],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="4"
          fill="var(--accent)"
          fillOpacity="0.3"
          className="neural-node"
        />
      ))}
      {/* Connections */}
      {[
        "M60,40 L160,30", "M60,40 L160,80", "M60,100 L160,80",
        "M60,100 L160,130", "M60,160 L160,130", "M60,160 L160,180",
        "M160,30 L260,50", "M160,80 L260,50", "M160,80 L260,110",
        "M160,130 L260,110", "M160,130 L260,170", "M160,180 L260,170",
        "M260,50 L350,80", "M260,110 L350,80", "M260,110 L350,140",
        "M260,170 L350,140",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--accent)"
          strokeWidth="0.8"
          strokeOpacity="0.2"
          className="neural-line"
        />
      ))}
    </svg>
  );
}

function TransitPattern() {
  return (
    <svg
      className="transit-pattern h-full w-full"
      viewBox="0 0 400 200"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Transit route lines */}
      <path
        d="M20,100 C80,40 150,150 220,80 C290,10 350,120 390,80"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        className="transit-line"
        strokeDasharray="8 4"
      />
      <path
        d="M20,140 C100,100 180,180 260,120 C340,60 370,150 390,130"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity="0.15"
        className="transit-line"
      />
      <path
        d="M20,60 C90,90 170,30 250,70 C330,110 360,50 390,60"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity="0.15"
        className="transit-line"
      />
      {/* Station dots */}
      {[
        [80, 65], [150, 115], [220, 80], [290, 50], [350, 95],
        [100, 118], [180, 148], [260, 120],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="var(--accent)"
          fillOpacity="0.3"
          className="transit-stop"
        />
      ))}
      {/* Moving dot */}
      <circle r="2.5" fill="var(--accent)" fillOpacity="0.8" className="transit-dot">
        <animateMotion
          dur="6s"
          repeatCount="indefinite"
          path="M20,100 C80,40 150,150 220,80 C290,10 350,120 390,80"
        />
      </circle>
    </svg>
  );
}

function OrbitalPattern() {
  return (
    <svg
      className="orbital-pattern h-full w-full"
      viewBox="0 0 400 200"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Center body */}
      <circle cx="200" cy="100" r="6" fill="var(--accent)" fillOpacity="0.3" />
      {/* Orbital ellipses */}
      <ellipse
        cx="200"
        cy="100"
        rx="120"
        ry="50"
        stroke="var(--accent)"
        strokeWidth="0.8"
        strokeOpacity="0.15"
        transform="rotate(-15, 200, 100)"
      />
      <ellipse
        cx="200"
        cy="100"
        rx="160"
        ry="70"
        stroke="var(--accent)"
        strokeWidth="0.6"
        strokeOpacity="0.1"
        transform="rotate(10, 200, 100)"
      />
      <ellipse
        cx="200"
        cy="100"
        rx="80"
        ry="35"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeOpacity="0.2"
        transform="rotate(-5, 200, 100)"
      />
      {/* Orbiting satellite */}
      <circle r="3" fill="var(--accent)" fillOpacity="0.7" className="orbital-sat">
        <animateMotion
          dur="8s"
          repeatCount="indefinite"
          path="M80,100 C80,50 320,50 320,100 C320,150 80,150 80,100"
        />
      </circle>
      {/* Background stars */}
      {[
        [40, 30], [360, 170], [90, 160], [310, 40], [180, 20],
        [250, 180], [50, 90], [350, 100],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="1"
          fill="var(--accent)"
          fillOpacity="0.2"
        />
      ))}
    </svg>
  );
}

const PatternMap = {
  neural: NeuralPattern,
  transit: TransitPattern,
  orbital: OrbitalPattern,
};

function ProjectCard({
  title,
  tech,
  description,
  pattern,
  gitUrl,
  className,
}: {
  title: string;
  tech: string;
  description: string;
  pattern: "neural" | "transit" | "orbital";
  gitUrl: string;
  className?: string;
}) {
  const Pattern = PatternMap[pattern];

  return (
    <div
      className={cn(
        "project-card group relative flex flex-col border border-border bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_30px_var(--accent-glow)]",
        className
      )}
    >
      {/* SVG Pattern — hidden on mobile to reduce animations and save space */}
      <div className="relative hidden h-[40%] min-h-[120px] overflow-hidden opacity-60 transition-opacity duration-500 group-hover:opacity-100 md:block">
        <Pattern />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            {tech}
          </span>

          <h3 className="mb-3 font-display text-2xl tracking-tight md:text-3xl">
            {title}
          </h3>

          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            {renderDescription(description)}
          </p>
        </div>

        {/* GitHub link */}
        <div className="mt-4 flex items-center gap-3">
          <span className="h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-6" />
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 transition-colors group-hover:text-accent"
            aria-label={`View ${title} on GitHub`}
          >
            GitHub
          </a>
        </div>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:auto-rows-[250px] lg:auto-rows-[300px]">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            tech={project.tech}
            description={project.description}
            pattern={project.pattern}
            gitUrl={project.gitUrl}
            className={cn(project.colSpan, project.rowSpan)}
          />
        ))}
      </div>
    </section>
  );
}
