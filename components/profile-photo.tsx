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
    md: "w-28 h-28",
    lg: "w-40 h-40 md:w-52 md:h-52",
  };

  const imageSizes = {
    sm: 40,
    md: 112,
    lg: 208,
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden border-2 border-accent",
        sizeMap[size],
        className
      )}
      role="img"
      aria-label="Uriel Mendoza profile photo"
      style={{ borderRadius: "50%" }}
    >
      <Image
        src="/profile.jpeg"
        alt="Uriel Mendoza"
        width={imageSizes[size]}
        height={imageSizes[size]}
        className="h-full w-full object-cover"
        priority={size === "lg"}
        unoptimized
      />
    </div>
  );
}
