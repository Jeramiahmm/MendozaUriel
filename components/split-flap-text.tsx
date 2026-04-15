"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SplitFlapTextProps {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
  duration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function SplitFlapText({
  text,
  className,
  delay = 0,
  charDelay = 60,
  duration = 600,
}: SplitFlapTextProps) {
  const [displayText, setDisplayText] = useState(
    text.replace(/[^ ]/g, " ")
  );
  const resolvedRef = useRef<boolean[]>(new Array(text.length).fill(false));
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const chars = text.split("");
    const current = new Array(text.length).fill(" ");

    const startTime = performance.now() + delay;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      let allResolved = true;

      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === " ") {
          current[i] = " ";
          resolvedRef.current[i] = true;
          continue;
        }

        const charStart = i * charDelay;
        const charEnd = charStart + duration;

        if (elapsed < charStart) {
          allResolved = false;
          continue;
        }

        if (elapsed >= charEnd) {
          current[i] = chars[i];
          resolvedRef.current[i] = true;
        } else {
          current[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          allResolved = false;
        }
      }

      setDisplayText(current.join(""));

      if (!allResolved) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [text, delay, charDelay, duration]);

  return (
    <span
      className={cn(
        "inline-block font-display tracking-tight",
        className
      )}
      aria-label={text}
    >
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className={cn(
            "inline-block transition-opacity duration-100",
            resolvedRef.current[i]
              ? "opacity-100"
              : "opacity-70"
          )}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
