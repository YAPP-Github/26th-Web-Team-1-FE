import { style } from "@vanilla-extract/css";

import { colors, radius, semantic, typography } from "@/styles";

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: semantic.background.dim,
});

export const content = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  maxWidth: "48rem",
  margin: "0 auto",
  display: "flex",
  justifyContent: "center",
  backgroundColor: colors.common[100],
  borderTopLeftRadius: radius[120],
  borderTopRightRadius: radius[120],
});

export const innerContent = style({
  width: "100%",
  minHeight: "32.6rem",
  maxHeight: "100vh",
  display: "flex",
  flexDirection: "column",
});

export const handleContainer = style({
  padding: "1.2rem 16.2rem 1rem",
});

export const handle = style({
  width: "5.1rem",
  height: "0.4rem",
  backgroundColor: "#D9D9D9",
  borderRadius: "100px",
  margin: "0.8rem auto",
});

export const title = style({
  display: "flex",
  gap: "1rem",
  padding: "1.4rem 2rem",
  ...typography.title2Sb,
  color: semantic.text.normal,
});

export const sheetBody = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  padding: "1.4rem 2rem 6rem",
  overflowY: "auto",
});

export const sheetBodyTitle = style({
  ...typography.title3Sb,
  color: semantic.text.normal,
});

export const sheetBodyDescription = style({
  ...typography.body2Rg,
  color: semantic.text.alternative,
});

export const buttonContainer = style({
  padding: "2rem",
});
