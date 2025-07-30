import { style } from "@vanilla-extract/css";

import { radius, semantic } from "@/styles";

export const searchBarContainer = style({
  display: "flex",
  height: "5.2rem",
  padding: "1.2rem",
  gap: "1.2rem",
  flex: "1 0 0",
  borderRadius: radius[160],
  background: semantic.surface.gray,
});
