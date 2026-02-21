import * as React from "react";
import { cn } from "../../lib/utils";

/* ──────────────────────────────────────────────
   Card — the white rounded panel used across the
   site (pricing cards, feature cards, form wrapper)
   ────────────────────────────────────────────── */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    /** Adds a cyan glow ring — use for highlighted/featured cards */
    featured?: boolean;
    /** Dark navy fill variant */
    dark?: boolean;
  }
>(({ className, featured, dark, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-3xl border transition-all duration-300",
      // Light default
      !dark && "bg-white border-[#E2E8F0] shadow-sm hover:shadow-lg",
      // Dark variant
      dark && "bg-[#182848] border-[#1e3060] text-white",
      // Featured ring
      featured && "border-[#00C2FF]/40 shadow-[0_0_0_1px_rgba(0,194,255,0.2),0_8px_32px_rgba(0,194,255,0.12)]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold text-[#0B1220] leading-tight tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[#0B1220]/60 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0 border-t border-[#E2E8F0] mt-4",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
