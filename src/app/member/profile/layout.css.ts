import { style } from "@vanilla-extract/css";

export const wrapper = style({
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const mainWrapper = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  padding: "2rem 2rem 5.6rem",
});
