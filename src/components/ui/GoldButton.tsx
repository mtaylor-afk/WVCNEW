"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ children, loading, variant = "solid", size = "md", className, disabled, ...props }, ref) => {
    const base = "relative inline-flex items-center justify-center gap-2 font-syne font-semibold rounded-xl transition-all touch-target overflow-hidden select-none";

    const variants = {
      solid: "bg-gold text-navy shimmer-btn active:scale-95 disabled:opacity-50",
      outline: "border-2 border-gold text-gold active:bg-gold/10 disabled:opacity-50",
      ghost: "text-gold hover:bg-gold/10 active:bg-gold/20",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm min-h-[40px]",
      md: "px-6 py-3 text-base min-h-[48px]",
      lg: "px-8 py-4 text-lg min-h-[56px] w-full",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

GoldButton.displayName = "GoldButton";
