"use client";

import { cn } from "@/lib/utils";

interface BitmapChevronProps {
  direction?: "up" | "down" | "left" | "right";
  size?: number;
  className?: string;
}

export function BitmapChevron({
  direction = "down",
  size = 24,
  className,
}: BitmapChevronProps) {
  const rotation = {
    up: 180,
    down: 0,
    left: 90,
    right: -90,
  }[direction];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-accent", className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path
        d="M4 8L12 16L20 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
