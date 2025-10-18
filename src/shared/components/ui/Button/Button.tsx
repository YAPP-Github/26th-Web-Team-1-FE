import type { ComponentProps } from "react";

import { button } from "./Button.css";

type ButtonVariant = "primary" | "dark" | "assistive" | "custom";
type ButtonSize = "small" | "medium" | "large" | "fullWidth";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} & ComponentProps<"button">;

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const variantClass = button({ variant, size, fullWidth });

  return (
    <button className={`${variantClass} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
};
