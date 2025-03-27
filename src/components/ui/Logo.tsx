
import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="mr-2">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" fill="#FFFDF7" stroke="#D4AF37" strokeWidth="2" />
          <path d="M24 4L42 14L24 24L6 14L24 4Z" stroke="#D4AF37" strokeWidth="2" />
          <path d="M24 44V24" stroke="#D4AF37" strokeWidth="2" />
          <path d="M32 10L32 30" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="32" cy="34" r="2" fill="#D4AF37" />
          <circle cx="24" cy="14" r="3" fill="#D4AF37" />
        </svg>
      </div>
      <h1 className="text-xl font-medium tracking-tight text-gray-900">Hamro Gahana</h1>
    </div>
  );
};

export default Logo;
