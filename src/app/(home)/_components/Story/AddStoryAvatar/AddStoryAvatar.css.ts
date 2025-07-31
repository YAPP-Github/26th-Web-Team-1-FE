import { style } from "@vanilla-extract/css";

import { colors, radius } from "@/styles";

export const addStoryContainer = style({
  position: "relative",
  width: "8rem",
  height: "8rem",
  cursor: "pointer",
});

export const backgroundCircle = style({
  width: "100%",
  height: "100%",
  borderRadius: radius.circle,
  background: colors.redOrange[80],
  border: `1.5px solid ${colors.redOrange[60]}`,
  position: "relative",
});

export const logoContainer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: radius.circle,
  overflow: "hidden",
  paddingTop: "2rem",
});

export const addButton = style({
  position: "absolute",
  top: "6.7rem",
  left: "2.9rem",
  width: "2.1rem",
  height: "2.1rem",
  padding: "0.5rem",
  borderRadius: radius.circle,
  background: `${colors.neutral[30]}`,
  border: `2px solid ${colors.common[100]}`,
});

export const plusIcon = style({
  color: colors.common[100],
});
