import { style } from "@vanilla-extract/css";

import { semantic, typography } from "@/styles";

export const wrapper = style({
  padding: "1.6rem 0",
});

export const list = style({
  padding: "1.4rem 0",
});

export const menuItem = style({
  ...typography.body1Sb,
  color: semantic.text.normal,
});

export const modalButton = style({
  flex: 1,
});
