import type { ComponentPropsWithoutRef } from "react";

import { button } from "./Button.css";

type ButtonVariant = "primary" | "dark" | "assistive";
type ButtonSize = "small" | "medium" | "large" | "fullWidth";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & ComponentPropsWithoutRef<"button">;

export const Button = ({
  children,
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) => {
  const variantClass = button({ variant, size });

  return (
    <button className={variantClass} {...props}>
      {children}
    </button>
  );
};
