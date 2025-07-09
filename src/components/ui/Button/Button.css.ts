import { recipe } from "@vanilla-extract/recipes";

import { colors, radius, typography } from "@/styles";

export const button = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    transition: "background-color 0.2s ease",
    whiteSpace: "nowrap",

    selectors: {
      "&:disabled": {
        backgroundColor: colors.coolNeutral[96],
        color: colors.neutral[70],
        cursor: "not-allowed",
      },
      "&:disabled:hover": {
        backgroundColor: colors.coolNeutral[96],
      },
    },
  },
  variants: {
    variant: {
      primary: {
        color: colors.common[100],
        backgroundColor: colors.redOrange[50],
        ":hover": { backgroundColor: colors.redOrange[40] },
      },
      dark: {
        color: colors.common[100],
        backgroundColor: colors.neutral[10],
        ":hover": { backgroundColor: colors.neutral[30] },
      },
      assistive: {
        color: colors.neutral[10],
        backgroundColor: colors.coolNeutral[99],
        ":hover": { backgroundColor: colors.coolNeutral[97] },
      },
      custom: {},
    },
    size: {
      small: {
        ...typography.label2,
        padding: "0.7rem 2rem",
        borderRadius: radius[80],
      },
      medium: {
        ...typography.body2Sb,
        padding: "0.9rem 2rem",
        borderRadius: radius[100],
      },
      large: {
        ...typography.body1Sb,
        padding: "1.2rem 2.8rem",
        borderRadius: radius[120],
      },
      fullWidth: {
        ...typography.body1Sb,
        width: "100%",
        padding: "1.4rem 2.8rem",
        borderRadius: radius[160],
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
