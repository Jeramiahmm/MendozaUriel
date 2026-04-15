"use client";

import Image from "next/image";
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

  const imageSizes = {
    sm: 40,
    md: 96,
    lg: 176,
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border-2 border-accent",
        sizeMap[size],
        className
      )}
      role="img"
      aria-label="Uriel Mendoza profile photo"
      style={{
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)",
      }}
    >
      <Image
        src="/profile.jpeg"
        alt="Uriel Mendoza"
        width={imageSizes[size]}
        height={imageSizes[size]}
        className="h-full w-full object-cover"
        priority={size === "lg"}
      />

      {/* Subtle accent border glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--accent), transparent 70%)",
        }}
      />
    </div>
  );
}
