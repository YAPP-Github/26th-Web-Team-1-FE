import { style } from "@vanilla-extract/css";

import { semantic } from "@/styles";

export const content = style({
  height: "54.8rem",
});

export const iconWrapper = style({
  position: "relative",
});

export const cancelIconWrapper = style({
  position: "absolute",
  top: 0,
  right: 0,
  paddingRight: "2rem",
});

export const cancelIcon = style({
  color: semantic.icon.gray,
});

export const title = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.8rem",
  textAlign: "center",
});

export const mainTitle = style({
  whiteSpace: "pre-line",
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.6rem",
  padding: 0,
});

export const sliderContainer = style({
  width: "100%",
});

export const imageWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
