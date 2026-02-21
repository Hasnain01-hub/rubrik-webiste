"use client";
import Image from "next/image";
import Logos from "./rubrik-logo.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className = "",
  showText = true,
  size = "md",
}: LogoProps) {
  const sizes = {
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 36, text: "text-xl" },
    lg: { icon: 48, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Square with arrow motif */}
      <Image
        src={Logos}
        alt="Rubrik"
        style={{
          width: icon,
          height: icon,
          objectFit: "contain",
          color: "#172849",
        }}
      />

      {showText && (
        <span className={`font-bold tracking-wide text-[#182848] ${text}`}>
          RUBRIK
        </span>
      )}
    </div>
  );
}
