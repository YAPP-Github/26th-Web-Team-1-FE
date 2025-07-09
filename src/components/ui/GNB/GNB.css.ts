import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { semantic, typography } from "@/styles";

export const wrapper = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
    height: "5.6rem",
    padding: "1.4rem 2rem",
    zIndex: 999,
  },
  variants: {
    background: {
      white: { backgroundColor: semantic.background.white },
      transparent: { backgroundColor: "transparent" },
    },
  },
  defaultVariants: {
    background: "white",
  },
});

export const leftWrapper = style({
  minWidth: "2.4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const leftWrapperWithMargin = style({
  marginRight: "0.8rem",
});

export const titleWrapperAbsoluteCenter = style({
  position: "absolute",
  top: 0,
  left: "50%",
  transform: "translateX(-50%)",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const titleWrapperLeft = style({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flex: 1,
});

export const title = style({
  ...typography.title2Sb,
  fontWeight: 600,
  whiteSpace: "nowrap",
  color: semantic.text.normal,
  display: "flex",
  alignItems: "center",
});

export const rightWrapper = style({
  minWidth: "2.4em",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "1.6rem",
});
