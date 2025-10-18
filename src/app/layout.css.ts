import { style } from "@vanilla-extract/css";

import { colors } from "@/shared/styles";

export const body = style({
  backgroundColor: colors.neutral[95],
});

export const wrapper = style({
  margin: "0 auto",
  width: "100%",
  maxWidth: "480px",
  minHeight: "100dvh",
  backgroundColor: colors.common[100],
});
