import { style } from "@vanilla-extract/css";

import { semantic } from "@/styles";

export const wrapper = style({
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const button = style({
  width: "2.4rem",
  height: "2.4rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const icon = style({
  color: semantic.icon.black,
});

export const mainWrapper = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  padding: "2rem",
});
