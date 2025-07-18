import { style } from "@vanilla-extract/css";

import { colors, radius } from "@/styles";

export const wrapper = style({
  paddingBottom: "2rem",
});

export const imageBackground = style({
  display: "flex",
  justifyContent: "center",
  width: "7rem",
  height: "7rem",
  paddingTop: "1.6rem",
  backgroundColor: colors.redOrange[80],
  border: `1px solid ${colors.redOrange[70]}`,
  borderRadius: radius.circle,
  overflow: "hidden",
});
