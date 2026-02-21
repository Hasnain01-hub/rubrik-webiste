"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      id,
      className,
      label,
      description,
      indeterminate,
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

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <button
          ref={ref}
          id={id}
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : isChecked}
          disabled={disabled}
          onClick={handleClick}
          className={cn(
            "mt-0.5 shrink-0 h-5 w-5 rounded-md border-2 transition-all duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C2FF] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            isChecked || indeterminate
              ? "bg-[#00C2FF] border-[#00C2FF]"
              : "bg-white border-[#D0D9E8] hover:border-[#182848]"
          )}
        >
          {(isChecked || indeterminate) && (
            <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
              {indeterminate ? (
                <path
                  d="M2.5 6h7"
                  stroke="#0B1220"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 6l3 3 5-5"
                  stroke="#0B1220"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          )}
        </button>
        {(label || description) && (
          <div>
            {label && (
              <label
                htmlFor={id}
                className="block text-sm font-medium text-[#0B1220] cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-[#0B1220]/50 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
