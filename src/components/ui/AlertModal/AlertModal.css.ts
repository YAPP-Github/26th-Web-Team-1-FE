import { style } from "@vanilla-extract/css";

import { radius, semantic, typography } from "@/styles";
import { zIndex } from "@/styles/zIndex.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: semantic.background.dim,
  zIndex: zIndex.overlay,
});

export const content = style({
  maxHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(30rem, 90vw)",
  background: semantic.background.white,
  borderRadius: radius[120],
  zIndex: zIndex.modal,
});

export const textWrapper = style({
  overflowY: "auto",
  padding: "4.8rem 1.6rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const title = style({
  ...typography.title3Sb,
  color: semantic.text.normal,
});

export const description = style({
  ...typography.body2Rg,
  color: semantic.text.alternative,
  marginTop: "0.8rem",
});

export const buttonGroup = style({
  display: "flex",
  width: "100%",
});

export const cancelButton = style({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
});

export const confirmButton = style({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
});
