import { style } from "@vanilla-extract/css";

import { radius, semantic } from "@/styles";

export const wrapper = style({
  height: "100%",
});

export const allAgreeBox = style({
  backgroundColor: semantic.background.grayLight,
  padding: "1.4rem 2rem",
  borderRadius: radius[120],
});

export const allAgreeCheckIcon = style({
  width: "2.4rem",
  height: "2.4rem",
});

export const individualAgreeBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  paddingLeft: "2rem",
});

export const agreeList = style({
  display: "flex",
  padding: "0.5rem 0",
});
