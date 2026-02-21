"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  label?: string;
  size?: "sm" | "default";
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      id,
      className,
      label,
      size = "default",
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked ?? false
    );
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleClick = () => {
      if (disabled) return;
      const next = !isChecked;
      if (!isControlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    const sizes = {
      sm: { track: "h-5 w-9", thumb: "h-4 w-4", translate: "translate-x-4" },
      default: { track: "h-6 w-11", thumb: "h-5 w-5", translate: "translate-x-5" },
    };

    const s = sizes[size];

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <button
          ref={ref}
          id={id}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
            "transition-all duration-200 ease-in-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            s.track,
            isChecked ? "bg-[#00C2FF]" : "bg-[#E2E8F0]"
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block rounded-full bg-white shadow-sm",
              "transform transition-transform duration-200 ease-in-out",
              s.thumb,
              isChecked ? s.translate : "translate-x-0"
            )}
          />
        </button>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[#0B1220] cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
