import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { semantic } from "@/styles";

export const wrapper = style({
  maxWidth: "48rem",
  height: "5rem",
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  margin: "0 auto",
  padding: "0.9rem 3.4rem",
  backgroundColor: semantic.surface.white,
});

export const icon = recipe({
  base: {
    width: 24,
    height: 24,
  },
  variants: {
    active: {
      true: {
        color: semantic.icon.black,
      },
      false: {
        color: semantic.icon.gray,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
