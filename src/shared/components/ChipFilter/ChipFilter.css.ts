import { style } from "@vanilla-extract/css";

export const container = style({
  overflowX: "auto",

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});
