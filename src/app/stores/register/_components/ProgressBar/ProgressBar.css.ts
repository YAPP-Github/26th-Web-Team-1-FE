import { style } from "@vanilla-extract/css";

import { colors } from "@/shared/styles";

export const progressBar = style({
  width: "100%",
  height: "0.4rem",
  backgroundColor: colors.coolNeutral[98],
  position: "relative",
  borderRadius: "0.2rem",
  overflow: "hidden",

  selectors: {
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      backgroundColor: colors.redOrange[50],
      borderRadius: "0.2rem",
      transformOrigin: "left center",
      transition: "transform 0.5s ease",
      transform: "scaleX(0)",
    },

    "&[data-active='true']::after": {
      transform: "scaleX(1)",
    },
  },
});
