"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

// Minimal recognizable SVG icons for each technology
function PythonIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <path d="M15.9 3C9.3 3 9.9 5.9 9.9 5.9v3h6.2v.9H6.8S3 9.3 3 15.9s3.3 6.4 3.3 6.4h2v-3.1s-.1-3.3 3.3-3.3h5.6s3.1 0 3.1-3v-5.2S21.1 3 15.9 3zm-3.1 1.8c.6 0 1 .5 1 1s-.4 1-1 1-1-.4-1-1 .5-1 1-1z" fill="var(--accent)" />
      <path d="M16.1 29c6.6 0 6-2.9 6-2.9v-3h-6.2v-.9h9.3s3.8.5 3.8-6.1-3.3-6.4-3.3-6.4h-2v3.1s.1 3.3-3.3 3.3h-5.6s-3.1 0-3.1 3v5.2s-.8 4.7 4.4 4.7zm3.1-1.8c-.6 0-1-.5-1-1s.4-1 1-1 1 .4 1 1-.5 1-1 1z" fill="var(--accent)" fillOpacity="0.6" />
    </svg>
  );
}

function JavaIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <path d="M12.3 23.5s-1.3.7.9 1c2.6.3 4 .3 6.8-.3 0 0 .8.5 1.8.9-6.3 2.7-14.3-.2-9.5-1.6zm-.8-3.7s-1.5 1.1.8 1.3c2.9.3 5 .3 8.8-.4 0 0 .5.5 1.3.8-7.6 2.2-16.1.2-10.9-1.7z" fill="var(--accent)" />
      <path d="M18.3 14.7c1.5 1.7-.4 3.3-.4 3.3s3.8-2 2.1-4.4c-1.7-2.3-3-3.4 4-7.3 0 0-10.9 2.7-5.7 8.4z" fill="var(--accent)" />
      <path d="M25.7 25.8s1 .8-1 1.4c-3.9 1.2-16.2 1.6-19.6 0-1.2-.6 1.1-1.3 1.8-1.5.7-.2 1.2-.1 1.2-.1-1.3-.9-8.6 1.8-3.7 2.6 13.4 2.2 24.5-1 21.3-2.4z" fill="var(--accent)" fillOpacity="0.5" />
    </svg>
  );
}

function GenericCodeIcon({ label }: { label: string }) {
  const initial = label.charAt(0).toUpperCase();
  return (
    <div className="flex h-6 w-6 items-center justify-center border border-accent/30">
      <span className="font-mono text-[9px] text-accent">{initial}</span>
    </div>
  );
}

function TechLogo({ name }: { name: string }) {
  // Using simple geometric representations
  const logos: Record<string, () => React.ReactNode> = {
    Python: () => <PythonIcon />,
    Java: () => <JavaIcon />,
  };

  const LogoComponent = logos[name];
  if (LogoComponent) return <>{LogoComponent()}</>;
  return <GenericCodeIcon label={name} />;
}

interface SkillItem {
  name: string;
  label: string;
}

interface SkillGroup {
  category: string;
  items: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "LANGUAGES",
    items: [
      { name: "Python", label: "Python (Advanced)" },
      { name: "Java", label: "Java" },
      { name: "SQL", label: "SQL" },
      { name: "JavaScript", label: "JavaScript" },
      { name: "C++", label: "C++" },
      { name: "HTML/CSS", label: "HTML/CSS" },
    ],
  },
  {
    category: "ML & DATA SCIENCE",
    items: [
      { name: "TensorFlow", label: "TensorFlow" },
      { name: "PyTorch", label: "PyTorch" },
      { name: "Scikit-learn", label: "Scikit-learn" },
      { name: "Pandas", label: "Pandas" },
      { name: "NumPy", label: "NumPy" },
      { name: "Matplotlib", label: "Matplotlib" },
    ],
  },
  {
    category: "SECURITY & NETWORKING",
    items: [
      { name: "SPARTA", label: "SPARTA" },
      { name: "MITRE", label: "MITRE ATT&CK" },
      { name: "SD-WAN", label: "SD-WAN" },
      { name: "Firewalls", label: "Firewalls" },
      { name: "IAM", label: "IAM" },
      { name: "Threat", label: "Threat Detection" },
    ],
  },
  {
    category: "CLOUD & TOOLS",
    items: [
      { name: "AWS", label: "AWS (CCP)" },
      { name: "Docker", label: "Docker" },
      { name: "Linux", label: "Linux/Unix" },
      { name: "Git", label: "Git/GitHub" },
      { name: "REST", label: "REST APIs" },
      { name: "DB", label: "MySQL/PostgreSQL" },
    ],
  },
];

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".skill-chip",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".skill-category-label",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
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
      {/* Geometric divider */}
      <div className="relative py-8 pl-6 pr-6 md:pl-28 md:pr-12">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-border" />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent opacity-40">
            <polygon points="12,2 22,12 12,22 2,12" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="h-[1px] flex-1 bg-border" />
        </div>
      </div>

      <div className="py-24 pl-6 pr-6 md:pl-28 md:pr-12">
        {/* Header */}
        <span className="mb-4 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          03 / Skills
        </span>
        <h2 className="mb-16 font-display text-5xl tracking-tight md:text-7xl">
          WHAT I WORK WITH
        </h2>

        {/* Skill groups */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="skill-category-label mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className={cn(
                      "skill-chip group flex items-center gap-2 border border-border bg-card px-3 py-2",
                      "transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_12px_var(--accent-glow)]"
                    )}
                  >
                    <TechLogo name={item.name} />
                    <span className="font-mono text-[11px] text-muted-foreground transition-colors group-hover:text-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
