import { keyframes, style } from "@vanilla-extract/css";

import { colors } from "@/styles";

const progressFill = keyframes({
  "0%": {
    transform: "scaleX(0)",
  },
  "100%": {
    transform: "scaleX(1)",
  },
});

export const progressBar = style({
  width: "100%",
  height: "0.4rem",
  backgroundColor: colors.coolNeutral[98],
  position: "relative",
  borderRadius: "0.2rem",
  overflow: "hidden",

  selectors: {
    "&[data-active='true']::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: colors.redOrange[50],
      borderRadius: "0.2rem",
      animation: `${progressFill} 0.5s ease forwards`,
      transformOrigin: "left center",
      transform: "scaleX(0)",
    },
  },
});
