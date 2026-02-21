import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        // Pill tag used in section headings (e.g. "Get Started")
        default:
          "bg-[#182848]/5 text-[#182848] border border-[#182848]/10 px-4 py-1.5 text-sm",

        // Cyan accent badge
        cyan:
          "bg-[#00C2FF]/10 text-[#0088b3] border border-[#00C2FF]/20 px-3 py-1 text-xs",

        // Status: live / active
        live:
          "bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs",

        // Status: warning
        warning:
          "bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 text-xs",

        // Status: error / alert
        danger:
          "bg-red-50 text-red-700 border border-red-200 px-3 py-1 text-xs",

        // Dark / navy fill
        dark:
          "bg-[#182848] text-white px-3 py-1 text-xs",

        // Outline only
        outline:
          "bg-transparent text-[#0B1220]/70 border border-[#E2E8F0] px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, dot = false, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "inline-block w-1.5 h-1.5 rounded-full shrink-0",
              variant === "live" && "bg-emerald-500",
              variant === "warning" && "bg-amber-500",
              variant === "danger" && "bg-red-500",
              variant === "cyan" && "bg-[#00C2FF]",
              (!variant || variant === "default") && "bg-[#182848]"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
