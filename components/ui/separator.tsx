import * as React from "react";
import { cn } from "../../lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  label?: string;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    if (label) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-4 my-4", className)}
          {...props}
        >
          <div className="flex-1 h-px bg-[#E2E8F0]" />
          <span className="text-xs text-[#0B1220]/40 font-medium tracking-wider uppercase">
            {label}
          </span>
          <div className="flex-1 h-px bg-[#E2E8F0]" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={decorative ? "none" : "separator"}
        aria-orientation={decorative ? undefined : orientation}
        className={cn(
          "shrink-0 bg-[#E2E8F0]",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          className
        )}
        {...props}
      />
    );
  }
);
Separator.displayName = "Separator";

export { Separator };
