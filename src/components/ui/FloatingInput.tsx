"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          placeholder=" "
          className={cn(
            "peer w-full px-4 pt-5 pb-2 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-base",
            "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20",
            "placeholder-transparent transition-all",
            error && "border-red-400 focus:border-red-400 focus:ring-red-400/20",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute left-4 top-1 text-xs font-syne text-gold peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-navy/50 peer-focus:top-1 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-gold transition-all duration-200 pointer-events-none"
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-red-500 font-syne">{error}</p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, className, id, rows = 3, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="relative">
        <textarea
          ref={ref}
          id={inputId}
          placeholder=" "
          rows={rows}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 bg-navy/5 border border-navy/20 rounded-xl text-navy font-syne text-base resize-none",
            "focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20",
            "placeholder-transparent transition-all",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="absolute left-4 top-2 text-xs font-syne text-gold peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-navy/50 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold transition-all duration-200 pointer-events-none"
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-red-500 font-syne">{error}</p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";
