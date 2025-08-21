import { style } from "@vanilla-extract/css";

import { colors, radius, semantic, typography } from "@/styles";

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

export const myCheerRegisterButton = style({
  ...typography.body2Sb,
  width: "100%",
  padding: "0.9rem 2.8rem",
  borderRadius: radius[100],
  border: `1px solid ${semantic.border.grayLight}`,
});
