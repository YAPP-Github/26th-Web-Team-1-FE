import { recipe } from "@vanilla-extract/recipes";

import { colors, semantic, typography } from "@/styles";

export const chipButton = recipe({
  base: {
    display: "flex",
    padding: "1rem",
    alignItems: "center",
    gap: "0.4rem",
    borderRadius: "100px",
    border: "1px solid",
    ...typography.label1Md,
    color: semantic.text.neutral,
    transition:
      "background 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out",
  },
  variants: {
    selected: {
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
  },
});
