import { style } from "@vanilla-extract/css";

import { semantic } from "@/styles";

export const storeRegisterLayout = style({
  minHeight: "100dvh",
  paddingBottom: "2.4rem",
  paddingInline: "2rem",
  backgroundColor: semantic.background.white,
});
