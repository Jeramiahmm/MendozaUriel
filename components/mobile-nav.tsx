"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Active section detection
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

    // Show/hide on scroll direction
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.to(nav, {
      y: visible ? 0 : 80,
      opacity: visible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [visible]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="navigation"
      aria-label="Mobile section navigation"
    >
      <div className="flex items-center gap-1 border border-border bg-card/90 px-3 py-2 backdrop-blur-md">
        {navItems.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1 transition-colors",
              activeSection === id
                ? "text-accent"
                : "text-muted-foreground"
            )}
            aria-label={`Go to ${label} section`}
            aria-current={activeSection === id ? "true" : undefined}
          >
            <span
              className={cn(
                "block h-1.5 w-1.5 transition-all duration-300",
                activeSection === id
                  ? "scale-125 bg-accent"
                  : "bg-muted-foreground/50"
              )}
              style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
