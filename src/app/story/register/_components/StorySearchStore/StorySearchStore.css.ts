import { style } from "@vanilla-extract/css";

import { colors } from "@/styles";

export const star = style({
  marginLeft: "0.4rem",
  color: colors.redOrange[50],
});

export const field = style({
  cursor: "pointer",
});
