"use client";

import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ProfilePhoto({ size = "md", className }: ProfilePhotoProps) {
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-24 h-24",
    lg: "w-36 h-36 md:w-44 md:h-44",
  };

  const fontSize = {
    sm: "text-sm",
    md: "text-2xl",
    lg: "text-4xl md:text-5xl",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border-2 border-accent",
        sizeMap[size],
        className
      )}
      role="img"
      aria-label="Uriel Mendoza profile photo placeholder"
      style={{
        clipPath: "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
        background: "linear-gradient(135deg, var(--accent) 0%, var(--background) 80%)",
      }}
    >
      <span
        className={cn(
          "font-display tracking-tight text-background/90",
          fontSize[size]
        )}
      >
        UM
      </span>

      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--accent), transparent 70%)",
        }}
      />
    </div>
  );
}
