import { style } from "@vanilla-extract/css";

import { radius, semantic } from "@/styles";

export const container = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100dvh",
  backgroundColor: semantic.dark.normal,
});

export const gnbOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
});

export const cancelIconWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const cancelIcon = style({
  width: "2.4rem",
  height: "2.4rem",
  color: semantic.icon.white,
});

export const imageCard = style({
  position: "relative",
  width: "100%",
  height: "100%",
  flex: 1,
  overflow: "hidden",
});

export const imageContent = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "0 2rem 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  zIndex: 10,
});

export const userWrapper = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
});

export const descriptionContainer = style({
  width: "100%",
  position: "relative",
});

export const tagContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
});

export const descriptionText = style({
  cursor: "pointer",
  wordBreak: "keep-all",
  wordWrap: "break-word",
});

export const collapsed = style({
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const expanded = style({
  display: "block",
  overflow: "visible",
});

export const tag = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  padding: "0.8rem 1.2rem",
  borderRadius: radius.circle,
  border: "1px solid rgba(255, 255, 255, 0.16)",
  background: " rgba(0, 0, 0, 0.28)",
});

export const tagIcon = style({
  width: "1.6rem",
  height: "1.6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: semantic.icon.white,
});

export const descriptionOverlay = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "60%",
  background:
    "linear-gradient(180deg, rgba(40, 40, 40, 0.00) 0%, #282828 100%)",
});
