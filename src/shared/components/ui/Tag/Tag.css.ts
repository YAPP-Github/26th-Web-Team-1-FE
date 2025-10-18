import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { colors, radius, semantic, typography } from "@/shared/styles";

export const tag = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",

    borderRadius: radius.circle,
    backgroundColor: semantic.surface.white,
    color: semantic.text.primary,
  },
  variants: {
    variant: {
      primary: {},
      primaryLow: {
        backgroundColor: colors.redOrange[90],
      },
      assistive: {
        color: semantic.text.neutral,
        backgroundColor: colors.neutral[99],
      },
    },
    size: {
      small: {
        ...typography.caption1Sb,
        padding: "0.6rem 0.8rem",
      },
      large: {
        ...typography.label1Sb,
        padding: "0.8rem 1.3rem",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "small",
  },
});

export type TagVariants = RecipeVariants<typeof tag>;
