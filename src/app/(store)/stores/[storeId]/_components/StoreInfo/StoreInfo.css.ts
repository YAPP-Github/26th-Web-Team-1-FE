import { style } from "@vanilla-extract/css";

import { semantic } from "@/styles";

export const storeInfoContentContainer = style({
  paddingBlock: "2.4rem",
});

export const divider = style({
  width: "0.1rem",
  height: "1.2rem",
  flexShrink: 0,
  backgroundColor: semantic.border.gray,
});

export const kakaoMapButton = style({
  color: semantic.text.alternative,
});

export const storeInfoImageCarousel = style({
  display: "flex",
  gap: "1.2rem",
  overflowX: "auto",
  scrollbarWidth: "none",
  paddingInline: "2rem",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const storeInfoImage = style({
  width: "calc(100% - 2rem)",
  height: "23.9rem",
  aspectRatio: 1.35,
  flexShrink: 0,
  borderRadius: "2.4rem",
  objectFit: "cover",
  objectPosition: "center",
});
