import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Primary - cyan fill (matches hero "Request demo" button)
        default:
          "bg-[#00C2FF] text-[#0B1220] hover:bg-[#00A8E0] shadow-md hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] hover:scale-[1.02] active:scale-[0.98]",

        // Secondary / Outline - navy border (matches hero "See pricing" button)
        outline:
          "border-2 border-[#182848] text-[#182848] bg-transparent hover:bg-[#182848] hover:text-white active:scale-[0.98]",

        // Ghost - subtle, for nav or icon buttons
        ghost:
          "bg-transparent text-[#0B1220]/70 hover:bg-[#182848]/5 hover:text-[#0B1220] active:scale-[0.98]",

        // Dark / Navy fill - for dark-background CTAs
        dark: "bg-[#182848] text-white hover:bg-[#0d1e38] shadow-md hover:shadow-[0_0_20px_rgba(24,40,72,0.4)] hover:scale-[1.02] active:scale-[0.98]",

        // Destructive
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-md active:scale-[0.98]",

        // Link style
        link: "bg-transparent text-[#00C2FF] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-4 py-1.5 text-sm rounded-lg",
        default: "h-10 px-6 py-2 text-sm rounded-xl",
        lg: "h-12 px-8 py-3 text-base rounded-xl",
        xl: "h-14 px-10 py-4 text-lg rounded-xl",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
