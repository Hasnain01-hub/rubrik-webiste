import * as React from "react";
import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rounded pill shape */
  rounded?: boolean;
  /** Circular avatar shape */
  circle?: boolean;
}

function Skeleton({ className, rounded, circle, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[#E2E8F0]",
        rounded && "rounded-full",
        circle ? "rounded-full" : "rounded-lg",
        !rounded && !circle && "rounded-xl",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
