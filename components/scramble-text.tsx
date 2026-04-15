"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleChars?: string;
  as?: React.ElementType;
}

const DEFAULT_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

export function ScrambleText({
  text,
  className,
  scrambleChars = DEFAULT_CHARS,
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const scramble = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const chars = text.split("");
    const resolved = new Array(text.length).fill(false);
    const startTime = performance.now();
    const totalDuration = text.length * 40 + 200;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const current: string[] = [];

      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === " ") {
          current.push(" ");
          resolved[i] = true;
          continue;
        }

        const resolveAt = (i / chars.length) * totalDuration;
        if (elapsed >= resolveAt) {
          current.push(chars[i]);
          resolved[i] = true;
        } else {
          current.push(
            scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
          );
        }
      }

      setDisplayText(current.join(""));

      if (resolved.every(Boolean)) {
        isAnimating.current = false;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [text, scrambleChars]);

  const reset = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    isAnimating.current = false;
    setDisplayText(text);
  }, [text]);

  return (
    <Component
      className={cn("cursor-default", className)}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {displayText}
    </Component>
  );
}
