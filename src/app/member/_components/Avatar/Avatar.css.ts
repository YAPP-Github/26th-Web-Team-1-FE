import { style } from "@vanilla-extract/css";

import { radius } from "@/styles";

export const avatar = style({
  width: "3.4rem",
  height: "3.4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.6rem",
  borderRadius: radius.circle,
});
