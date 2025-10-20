import { style } from "@vanilla-extract/css";

export const supportTextArea = style({
  width: "100%",
  minHeight: "17.8rem",

  // scroll bar remove
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});
