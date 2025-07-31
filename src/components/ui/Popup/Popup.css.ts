import { style } from "@vanilla-extract/css";
import { type Variants } from "motion/react";

import { radius, semantic } from "@/styles";

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: semantic.background.dim,
  zIndex: 1000,
});

export const content = style({
  width: "100%",
  maxWidth: "min(90vw, 320px)",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
});

export const contentInner = style({
  borderRadius: radius[160],
  backgroundColor: semantic.background.white,
});

export const contentCloseButton = style({
  position: "absolute",
  top: 10,
  right: 10,
});

export const body = style({
  padding: "2rem",
  flex: 1,
});

export const footer = style({
  padding: "2rem",
});

export const overlayVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const contentVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
  },
};
