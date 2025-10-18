import { style } from "@vanilla-extract/css";

import { semantic } from "@/shared/styles";

export const storeDetailLayout = style({
  minHeight: "100dvh",
  paddingInline: "2rem",
  backgroundColor: semantic.background.white,
});
