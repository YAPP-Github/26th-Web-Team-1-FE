import { style } from "@vanilla-extract/css";

import { colors, semantic } from "@/shared/styles";
import { zIndex } from "@/shared/styles/zIndex.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: semantic.background.dim,
  zIndex: zIndex.overlay,
});

export const content = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  maxWidth: "48rem",
  margin: "0 auto",
  backgroundColor: colors.common[100],
  borderRadius: "2.8rem 2.8rem 0 0",
  zIndex: zIndex.modal,
});

export const innerContent = style({
  width: "100%",
  minHeight: "37.5rem",
  maxHeight: "calc(100dvh - 52px)",
  display: "flex",
  flexDirection: "column",
});

export const handle = style({
  width: "5.1rem",
  height: "0.4rem",
  backgroundColor: "#D9D9D9",
  borderRadius: "100px",
  margin: "0.8rem auto",
});

export const title = style({
  width: "100%",
  padding: "1.4rem 2rem",
});

export const sheetBody = style({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  gap: "0.8rem",
  padding: "2rem",
});

export const buttonContainer = style({
  padding: "2rem",
});
