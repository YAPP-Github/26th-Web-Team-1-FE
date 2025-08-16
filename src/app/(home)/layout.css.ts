import { style } from "@vanilla-extract/css";

import { semantic } from "@/styles";

export const mainContainer = style({
  minHeight: "100dvh",
  paddingBottom: "5.6em",
  paddingInline: "2rem",
  backgroundColor: semantic.background.white,
});
