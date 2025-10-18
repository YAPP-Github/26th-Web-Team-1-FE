import { style } from "@vanilla-extract/css";

import { colors, radius } from "@/shared/styles";

export const storeStoryList = style({
  width: "100%",
  maxWidth: "100vw",
  overflow: "hidden",
  borderRadius: radius[160],
});

export const storyImage = style({
  objectFit: "cover",
  objectPosition: "center",
});

export const dot = style({
  width: "0.6rem",
  height: "0.6rem",
  borderRadius: radius.circle,
  backgroundColor: colors.neutral[95],
  cursor: "pointer",
  transition: "background-color 0.3s ease-in-out, width 0.3s ease-in-out",

  selectors: {
    "&[data-active='true']": {
      backgroundColor: colors.redOrange[50],
      cursor: "default",
      width: "1.6rem",
    },
  },
});

export const storyCard = style({
  padding: "1.6rem",
  position: "relative",
  height: "17.2rem",
  flexShrink: 0,
  width: "100%",
  cursor: "pointer",

  selectors: {
    "&:active": {
      cursor: "grabbing",
    },
  },
});

export const storyCardGradient = style({
  zIndex: 1,
  position: "absolute",
  opacity: 0.7,
  inset: 0,
  background:
    "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.98) 4.7%, rgba(0, 0, 0, 0.96) 8.9%, rgba(0, 0, 0, 0.93) 12.8%, rgba(0, 0, 0, 0.90) 16.56%, rgba(0, 0, 0, 0.86) 20.37%, rgba(0, 0, 0, 0.82) 24.4%, rgba(0, 0, 0, 0.77) 28.83%, rgba(0, 0, 0, 0.71) 33.84%, rgba(0, 0, 0, 0.65) 39.6%, rgba(0, 0, 0, 0.57) 46.3%, rgba(0, 0, 0, 0.48) 54.1%, rgba(0, 0, 0, 0.38) 63.2%, rgba(0, 0, 0, 0.27) 73.76%, rgba(0, 0, 0, 0.14) 85.97%, rgba(0, 0, 0, 0.00) 100%)",
});
