import { createGlobalTheme } from "@vanilla-extract/css";

import { colors } from "./colors.css";

export const semantic = createGlobalTheme(":root", {
  primary: {
    normal: colors.redOrange[50],
    pressed: colors.redOrange[40],
  },
  dark: {
    normal: colors.neutral[10],
    pressed: colors.neutral[30],
  },
  assistive: {
    normal: colors.coolNeutral[99],
    pressed: colors.coolNeutral[97],
  },
  text: {
    normal: colors.neutral[10],
    neutral: colors.neutral[30],
    alternative: colors.neutral[50],
    disabled: colors.neutral[70],
    white: colors.common[100],
    primary: colors.redOrange[50],
  },
  background: {
    white: colors.common[100],
    grayLight: colors.coolNeutral[99],
    grayDark: colors.coolNeutral[97],
    dim: "rgba(23, 23, 23, 0.52)",
  },
  icon: {
    black: colors.neutral[20],
    white: colors.common[100],
    gray: colors.neutral[80],
    disabled: colors.neutral[95],
    primary: colors.redOrange[50],
  },
  status: {
    positive: colors.green[50],
    cautionary: colors.orange[60],
    negative: colors.red[50],
  },
  surface: {
    white: colors.common[100],
    gray: colors.coolNeutral[99],
    disabled: colors.coolNeutral[97],
    black: colors.coolNeutral[10],
  },
  border: {
    pressed: colors.redOrange[50],
    grayLight: colors.coolNeutral[95],
    gray: colors.coolNeutral[80],
    disabled: colors.neutral[99],
  },
});
