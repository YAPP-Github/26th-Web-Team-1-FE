import clsx from "clsx";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { chip } from "./Chip.css";

export type ChipProps = {
  size?: "medium" | "large";
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ children, size = "medium", active, className, ...restProps }, ref) => {
    return (
      <button
        className={clsx(chip({ size, active }), className)}
        ref={ref}
        {...restProps}
      >
        {children}
      </button>
    );
  }
);

Chip.displayName = "Chip";
