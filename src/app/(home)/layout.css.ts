import { style } from "@vanilla-extract/css";

import { semantic } from "@/shared/styles";

export const mainContainer = style({
  minHeight: "100dvh",
  paddingBottom: "5.6rem",
  paddingInline: "2rem",
  backgroundColor: semantic.background.white,
});
