import { style } from "@vanilla-extract/css";

import { colors, radius, semantic } from "@/styles";

export const container = style({
  height: "100%",
});

export const separator = style({
  borderTop: `1px solid ${colors.coolNeutral[97]}`,
});

export const divider = style({
  width: "0.1rem",
  height: "1rem",
  backgroundColor: colors.neutral[95],
});

export const storeCard = style({
  paddingBlock: "2.4rem",
});

export const storeImagesContainer = style({
  paddingInline: "2rem",
  overflowX: "auto",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const storeImages = style({
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const storeImage = style({
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,

  selectors: {
    "&[data-first=true]": {
      borderTopLeftRadius: radius[160],
      borderBottomLeftRadius: radius[160],
    },
    "&[data-last=true]": {
      borderTopRightRadius: radius[160],
      borderBottomRightRadius: radius[160],
    },
  },
});

export const emptyImage = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "126px",
  height: "168px",

  flexShrink: 0,

  backgroundColor: semantic.background.grayLight,

  selectors: {
    "&[data-first=true]": {
      borderTopLeftRadius: radius[160],
      borderBottomLeftRadius: radius[160],
    },
    "&[data-last=true]": {
      borderTopRightRadius: radius[160],
      borderBottomRightRadius: radius[160],
    },
  },
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
