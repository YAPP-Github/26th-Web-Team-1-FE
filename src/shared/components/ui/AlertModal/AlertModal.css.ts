import { style } from "@vanilla-extract/css";

import { radius, semantic, typography } from "@/shared/styles";
import { zIndex } from "@/shared/styles/zIndex.css";

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
  borderRadius: radius[160],
  zIndex: zIndex.modal,
});

export const innerContent = style({
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
  width: "100%",
  textAlign: "center",
});

export const footer = style({
  width: "100%",
  display: "flex",
});

export const cancelButton = style({
  flex: 1,
});

export const confirmButton = style({
  flex: 1,
});
