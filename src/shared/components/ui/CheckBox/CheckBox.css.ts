import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { semantic } from "@/shared/styles";

export const checkboxWrapper = recipe({
  base: {
    width: "2.4rem",
    height: "2.4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "4.8px",
    transition: "background-color 0.2s ease-in-out, color 0.2s ease-in-out",
  },
  variants: {
    hasBackground: {
      true: {
        backgroundColor: semantic.icon.disabled,
      },
      false: {
        backgroundColor: "transparent",
      },
    },
    checked: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { hasBackground: true, checked: false },
      style: {
        color: semantic.icon.white,
      },
    },
    {
      variants: { hasBackground: true, checked: true },
      style: {
        color: semantic.icon.white,
        backgroundColor: semantic.icon.primary,
      },
    },
    {
      variants: { hasBackground: false, checked: false },
      style: {
        color: semantic.icon.disabled,
      },
    },
    {
      variants: { hasBackground: false, checked: true },
      style: {
        color: semantic.icon.primary,
      },
    },
  ],
  defaultVariants: {
    hasBackground: true,
    checked: false,
  },
});

export const hiddenCheckbox = style({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
  pointerEvents: "none",
});

export const icon = style({
  width: "50%",
  height: "35%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "color 0.2s ease-in-out",
});
