import { style } from "@vanilla-extract/css";

import { colors, radius, semantic } from "@/shared/styles";

export const container = style({
  height: "100%",
});

export const emptyWrapper = style({
  paddingBlock: "10rem",
  textAlign: "center",
});

export const infoIcon = style({
  color: semantic.icon.disabled,
});

export const divider = style({
  width: "0.1rem",
  height: "1rem",
  backgroundColor: colors.neutral[95],
});

export const storeImagesContainer = style({
  position: "relative",
  paddingInline: "2rem",
  overflowX: "auto",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const storeImageWrapper = style({
  position: "relative",
  width: "100%",
  height: "168px",
});

export const storeImage = style({
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,

  borderRadius: radius[160],
});

export const emptyImage = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  height: "168px",

  flexShrink: 0,

  backgroundColor: semantic.background.grayLight,

  borderRadius: radius[160],
});

export const moreButtonText = style({
  flexShrink: 0,
  whiteSpace: "nowrap",
});

export const moreButton = style({
  borderRadius: radius.circle,
  width: "3.2rem",
  height: "3.2rem",
  padding: 0,
});

export const cheerContainer = style({
  overflowX: "auto",
  paddingInline: "2rem",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const cheer = style({
  padding: "1.2rem 2rem",
  maxWidth: "33.5rem",
  height: "6.4rem",

  flexShrink: 0,

  borderRadius: radius[160],
  background: colors.redOrange[90],

  selectors: {
    "&:only-of-type": {
      maxWidth: "100%",
      width: "100%",
    },
  },
});

export const cheerText = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
});
