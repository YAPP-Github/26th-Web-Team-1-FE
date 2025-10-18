import { style } from "@vanilla-extract/css";

import { colors, radius } from "@/shared/styles";

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
