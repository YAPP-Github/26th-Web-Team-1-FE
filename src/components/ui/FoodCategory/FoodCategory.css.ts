import { style } from "@vanilla-extract/css";

import { colors, radius, semantic } from "@/styles";

export const container = style({
  overflowX: "auto",
  paddingInline: "2rem",
  paddingTop: "1.2rem",
  paddingBottom: "2rem",

  borderBottom: `1px solid ${colors.coolNeutral[97]}`,

  selectors: {
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
});

export const category = style({
  cursor: "pointer",
});

export const categoryImage = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "6.6rem",
  height: "6.6rem",

  borderRadius: radius.circle,
  border: "0.15rem solid transparent",

  backgroundColor: "#F7F7F8",

  transition:
    "background-color 0.1s ease-in-out, border-color 0.1s ease-in-out",

  selectors: {
    "&[data-selected='true']": {
      borderColor: semantic.icon.primary,
      backgroundColor: colors.redOrange[90],
    },
  },
});

export const categoryName = style({
  transition: "color 0.1s ease-in-out",
});
