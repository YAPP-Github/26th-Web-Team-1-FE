import { style } from "@vanilla-extract/css";

import { radius, semantic } from "@/styles";

export const emptyWrapper = style({
  padding: "6rem",
  textAlign: "center",
});

export const infoIcon = style({
  color: semantic.icon.disabled,
});

export const backgroundWrapper = style({
  backgroundColor: semantic.background.grayLight,
  padding: "1.6rem 2rem",
});

export const wrapper = style({
  padding: "1.6rem 2rem",
  backgroundColor: semantic.surface.white,
  borderRadius: "2rem",
});

export const imageWrapper = style({
  position: "relative",
  width: "100%",
  height: "14.5rem",
  borderRadius: radius[120],
  overflow: "hidden",
});

export const imageIndicator = style({
  position: "absolute",
  bottom: "1.2rem",
  right: "1.2rem",
  zIndex: 1,
});

export const imageIndicatorBackground = style({
  backgroundColor: semantic.background.dim,
  borderRadius: radius[120],
  padding: "0.4rem 1rem",
});

export const sliderContainer = style({
  width: "100%",
  height: "100%",
});

export const sliderSlide = style({
  position: "relative",
  width: "100%",
  height: "14.5rem",
});

export const descriptionText = style({
  position: "relative",
  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 3,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const descriptionTextExpanded = style({
  WebkitLineClamp: "unset",
  overflow: "visible",
});

export const moreButton = style({
  marginTop: "0.8rem",
});
