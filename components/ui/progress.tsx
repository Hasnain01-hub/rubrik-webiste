import * as React from "react";
import { cn } from "../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  /** Show the % label inside/beside the bar */
  showLabel?: boolean;
  /** Size variant */
  size?: "sm" | "default" | "lg";
  /** Color variant */
  color?: "cyan" | "navy" | "success" | "warning" | "danger";
  /** Animated shimmer effect */
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      showLabel,
      size = "default",
      color = "cyan",
      animated,
      ...props
    },
    ref
  ) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100));

    const heights = { sm: "h-1.5", default: "h-2.5", lg: "h-4" };
    const colors = {
      cyan: "bg-[#00C2FF]",
      navy: "bg-[#182848]",
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
    };

    return (
      <div className={cn("w-full", className)} ref={ref} {...props}>
        <div
          className={cn(
            "w-full overflow-hidden rounded-full bg-[#E2E8F0]",
            heights[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              colors[color],
              animated && "relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-shimmer"
            )}
            style={{ width: `${pct}%` }}
          />
        </div>
        {showLabel && (
          <span className="mt-1 text-xs text-[#0B1220]/50 font-medium">
            {Math.round(pct)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
