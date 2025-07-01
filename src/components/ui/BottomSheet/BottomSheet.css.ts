import { style } from "@vanilla-extract/css";

import { colors, radius, semantic, typography } from "@/styles";

export const overlay = style({
  width: "100%",
  maxWidth: "480px",
  position: "fixed",
  margin: "0 auto",
  inset: 0,
  backgroundColor: semantic.background.dim,
});

export const content = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
});

export const innerContent = style({
  width: "100%",
  maxWidth: "480px",
  minHeight: "326px",
  maxHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: colors.common[100],
  borderTopLeftRadius: radius[120],
  borderTopRightRadius: radius[120],
});

export const handleContainer = style({
  padding: "12px 162px 10px",
});

export const handle = style({
  width: "51px",
  height: "4px",
  backgroundColor: "#D9D9D9",
  borderRadius: "100px",
  margin: "8px auto",
});

export const title = style({
  display: "flex",
  gap: "10px",
  padding: "14px 20px",
  ...typography.title2,
  fontWeight: 600,
  color: semantic.text.normal,
});

export const main = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "14px 20px 60px",
  overflowY: "auto",
});

export const mainTitle = style({
  ...typography.title3,
  fontWeight: 600,
  color: semantic.text.normal,
});

export const mainDescription = style({
  ...typography.body2,
  fontWeight: 400,
  color: semantic.text.alternative,
});

export const buttonContainer = style({
  padding: "20px",
});
