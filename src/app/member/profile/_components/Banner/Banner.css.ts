import { style } from "@vanilla-extract/css";

import { colors, semantic } from "@/styles";

export const wrapper = style({
  backgroundColor: colors.redOrange[90],
  padding: "1.4rem 2.4rem",
});

export const linkWrapper = style({
  width: "100%",
});

export const icon = style({
  color: semantic.icon.black,
});
