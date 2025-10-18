import { style } from "@vanilla-extract/css";

import { semantic } from "@/shared/styles";

export const wrapper = style({
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const content = style({
  padding: "2rem 2rem 5.6rem",
  backgroundColor: semantic.background.white,
});
