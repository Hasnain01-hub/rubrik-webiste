import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            // Base
            "flex min-h-[80px] w-full rounded-xl border bg-[#F5F7FA] px-3 py-2.5 text-sm text-[#0B1220] placeholder:text-[#0B1220]/40",
            // Border & focus
            "border-[#E2E8F0] transition-all duration-200",
            "focus:outline-none focus:border-[#00C2FF] focus:ring-2 focus:ring-[#00C2FF]/20",
            // Hover
            "hover:border-[#182848]/30",
            // Resize
            "resize-none",
            // Error
            error && "border-red-400 focus:border-red-500 focus:ring-red-200",
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#E2E8F0]",
            className
          )}
          ref={ref}
          {...props}
        />
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
Textarea.displayName = "Textarea";

export { Textarea };
