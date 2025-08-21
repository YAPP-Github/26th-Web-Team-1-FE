import { style } from "@vanilla-extract/css";

import { colors, radius, semantic } from "@/styles";

export const recentSupportCard = style({
  borderRadius: "2.8rem",
  padding: "2rem",
  border: "2px solid #fff",
  minHeight: "13.6rem",
  maxHeight: "17.4rem",
  overflow: "hidden",
});

export const cheersContent = style({
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const recentCheersButton = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,

  width: "7rem",
  height: "4rem",

  border: `1px solid ${colors.redOrange[50]}`,
  borderRadius: radius.circle,

  background: colors.redOrange[50],
  color: semantic.icon.white,
  transition: "background 0.2s ease-in-out, border 0.2s ease-in-out",

  selectors: {
    "&:disabled": {
      background: "transparent",
      cursor: "not-allowed",
      border: "1px solid transparent",
      color: semantic.icon.gray,
    },
  },
});

export const divider = style({
  display: "inline-block",
  backgroundColor: colors.neutral[95],
  width: "0.1rem",
  height: "1rem",
});

export const showAllButton = style({
  border: `1px solid ${semantic.border.grayLight}`,
});

export const storeImage = style({
  width: "4rem",
  height: "4rem",
  borderRadius: radius[100],
  objectFit: "cover",
});

export const storeImageFallback = style([
  storeImage,
  {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: semantic.background.grayLight,
    border: `0.4px solid ${semantic.border.grayLight}`,
  },
]);
