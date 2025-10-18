import { style } from "@vanilla-extract/css";

import { colors, radius, semantic } from "@/shared/styles";

export const supportedStoreCardList = style({
  paddingInline: "2rem",
  overflow: "auto",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const supportedStoreCard = style({
  width: "15.4rem",
  flexShrink: 0,
});

export const supportedStoreCardContent = style({
  paddingInline: "0.6rem",
});

export const supportedStoreCardImageWrapper = style({
  position: "relative",
  width: "15.4rem",
  height: "11.4rem",
  borderRadius: radius[160],
  overflow: "hidden",
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
