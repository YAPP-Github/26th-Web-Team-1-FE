import { style } from "@vanilla-extract/css";

import { semantic } from "@/styles";

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
