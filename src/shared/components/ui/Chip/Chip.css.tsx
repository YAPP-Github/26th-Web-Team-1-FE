import { recipe } from "@vanilla-extract/recipes";

import { colors, semantic, typography } from "@/shared/styles";

export const chip = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    borderRadius: "100px",
    border: "1px solid",
    ...typography.label1Md,
    color: semantic.text.neutral,
    whiteSpace: "nowrap",
    transition:
      "background 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out",
  },
  variants: {
    active: {
      true: {
        borderColor: semantic.border.pressed,
        background: colors.redOrange[95],
        color: semantic.text.primary,
      },
      false: {
        borderColor: semantic.border.grayLight,
        background: semantic.surface.white,
        color: semantic.text.neutral,
      },
    },
    size: {
      medium: {
        padding: "0.7rem 0.9rem",
      },
      large: {
        padding: "1rem 0.9rem",
      },
    },
  },
});
