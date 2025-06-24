import { recipe } from "@vanilla-extract/recipes";

import { colors, radius } from "@/styles";

export const button = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    transition: "background-color 0.2s ease",
    whiteSpace: "nowrap",
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
      disabled: {
        backgroundColor: colors.coolNeutral[96],
        color: colors.neutral[70],
        cursor: "not-allowed",
      },
    },
    size: {
      small: {
        width: "63px",
        height: "32px",
        padding: "9px 20px",
        fontSize: "13px",
        borderRadius: radius[80],
      },
      medium: {
        width: "80px",
        height: "40px",
        padding: "9px 20px",
        fontSize: "15px",
        borderRadius: radius[100],
      },
      large: {
        width: "98px",
        height: "48px",
        padding: "12px 28px",
        fontSize: "16px",
        borderRadius: radius[120],
      },
      fullWidth: {
        width: "100%",
        height: "52px",
        padding: "12px 28px",
        fontSize: "16px",
        borderRadius: radius[160],
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});
