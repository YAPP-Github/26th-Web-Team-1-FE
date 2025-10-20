import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { semantic, typography } from "@/shared/styles";

export const textButton = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    background: "transparent",
    padding: "0.4rem 0",
    fontWeight: "600",

    selectors: {
      "&:disabled": {
        color: semantic.button.textDisabled,
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    variant: {
      primary: {
        color: semantic.button.textPrimary,
      },
      assistive: {
        color: semantic.button.textAssistive,
      },
      custom: {},
    },
    size: {
      medium: {
        ...typography.body1Sb,
      },
      small: {
        ...typography.label1Md,
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export const leftAddonWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
