import { style } from "@vanilla-extract/css";

import { colors, radius, semantic, typography } from "@/shared/styles";

export const imageWrapper = style({
  position: "relative",
  width: "12.1rem",
  height: "21.3rem",
  borderRadius: radius[160],
  overflow: "hidden",
  margin: "0 auto",
  backgroundColor: colors.neutral[10],
});

export const image = style({
  objectFit: "contain",
});

export const overlayButtonWrapper = style({
  position: "absolute",
  bottom: "0",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  padding: "0 1.2rem 1.2rem",
});

export const overlayButton = style({
  padding: "0.5rem 1.2rem",
  ...typography.label1Sb,
  color: semantic.text.white,
  background: "rgba(23, 23, 23, 0.60)",
  borderRadius: radius.circle,
  cursor: "pointer",
});
