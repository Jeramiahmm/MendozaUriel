"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/lib/data";
import { ScrambleText } from "@/components/scramble-text";
import { ProfilePhoto } from "@/components/profile-photo";
import { cn } from "@/lib/utils";

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-10% 0px -10% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-6 md:flex"
      role="navigation"
      aria-label="Section navigation"
    >
      <div className="mb-4">
        <ProfilePhoto size="sm" />
      </div>
      {navItems.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          onMouseEnter={() => setHoveredItem(id)}
          onMouseLeave={() => setHoveredItem(null)}
          className="group flex items-center gap-3"
          aria-label={`Go to ${label} section`}
        >
          <span
            className={cn(
              "block h-[2px] transition-all duration-300",
              activeSection === id
                ? "w-8 bg-accent"
                : "w-4 bg-muted-foreground group-hover:w-6 group-hover:bg-foreground"
            )}
          />
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
              activeSection === id
                ? "text-accent opacity-100"
                : "opacity-0 group-hover:opacity-100",
              hoveredItem === id || activeSection === id
                ? "translate-x-0"
                : "-translate-x-2"
            )}
          >
            {hoveredItem === id ? (
              <ScrambleText text={label} />
            ) : (
              label
            )}
          </span>
        </button>
      ))}
    </nav>
  );
}
