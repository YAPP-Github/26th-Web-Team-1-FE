import { style } from "@vanilla-extract/css";

export const wrapper = style({
  width: "100%",
  maxWidth: "480px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const icon = style({
  cursor: "pointer",
});

export const mainWrapper = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  padding: "2rem",
});
