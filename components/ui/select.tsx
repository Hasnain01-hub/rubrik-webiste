"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, placeholder, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            // Base
            "flex h-10 w-full appearance-none rounded-xl border bg-[#F5F7FA] px-3 py-2 pr-10",
            "text-sm text-[#0B1220]",
            // Placeholder color hack via CSS
            "[&:has(option[value='']:checked)]:text-[#0B1220]/40",
            // Border & focus
            "border-[#E2E8F0] transition-all duration-200",
            "focus:outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20",
            // Hover
            "hover:border-[#182848]/30",
            // Error
            error && "border-red-400 focus:border-red-500 focus:ring-red-200",
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#E2E8F0]",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {/* Custom chevron icon */}
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0B1220]/40">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {error && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
