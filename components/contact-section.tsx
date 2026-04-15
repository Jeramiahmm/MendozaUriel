"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { contactInfo, certifications } from "@/lib/data";
import { ScrambleText } from "@/components/scramble-text";
import { ProfilePhoto } from "@/components/profile-photo";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-col",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
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
      id="contact"
      ref={sectionRef}
      className="border-t border-border"
    >
      <div className="py-32 pl-6 pr-6 md:pl-28 md:pr-12">
        {/* Header with photo */}
        <div className="mb-16 flex items-center gap-6">
          <ProfilePhoto size="md" />
          <div>
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              05 / Contact
            </span>
            <h2 className="font-display text-5xl tracking-tight md:text-7xl">
              GET IN TOUCH
            </h2>
          </div>
        </div>

        {/* Multi-column grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Connect */}
          <div className="contact-col">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Connect
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
                  aria-label="Send email"
                >
                  <ScrambleText text={contactInfo.email} />
                </a>
              </li>
              <li>
                <a
                  href={`https://${contactInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
                  aria-label="Visit LinkedIn"
                >
                  <ScrambleText text={contactInfo.linkedin} />
                </a>
              </li>
              <li>
                <a
                  href={`https://${contactInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
                  aria-label="Visit GitHub"
                >
                  <ScrambleText text={contactInfo.github} />
                </a>
              </li>
              <li>
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
                  aria-label="Visit website"
                >
                  <ScrambleText text={contactInfo.website} />
                </a>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div className="contact-col">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Education
            </h3>
            <ul className="space-y-3">
              <li className="font-mono text-xs text-muted-foreground">
                {contactInfo.education.school}
              </li>
              <li className="font-mono text-xs text-muted-foreground">
                {contactInfo.education.degree}
              </li>
              <li className="font-mono text-xs text-muted-foreground">
                Minor: {contactInfo.education.minor}
              </li>
              <li className="font-mono text-xs text-muted-foreground">
                GPA: {contactInfo.education.gpa} | {contactInfo.education.expected}
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="contact-col">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="font-mono text-xs text-muted-foreground"
                >
                  {cert.issuer} {cert.name.split(" ").slice(-1)[0]}
                </li>
              ))}
            </ul>
          </div>

          {/* Currently */}
          <div className="contact-col">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Currently
            </h3>
            <ul className="space-y-3">
              {contactInfo.currently.map((item) => (
                <li
                  key={item}
                  className="font-mono text-xs text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="contact-col">
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              Location
            </h3>
            <ul className="space-y-3">
              <li className="font-mono text-xs text-muted-foreground">
                {contactInfo.location.city}
              </li>
              <li className="font-mono text-xs text-muted-foreground">
                {contactInfo.location.remote}
              </li>
              <li className="font-mono text-xs text-muted-foreground">
                {contactInfo.location.availability}
              </li>
            </ul>
          </div>
        </div>

        {/* Resume download */}
        <div className="mt-16 border-t border-border pt-8">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-3 border border-accent px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-background"
            aria-label="Download resume PDF"
          >
            Download Resume
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-border px-6 py-6 md:px-28">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            &copy; 2026 Uriel Mendoza. All rights reserved.
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            CS + Cybersecurity. Built with Next.js.
          </span>
        </div>
      </div>
    </section>
  );
}
