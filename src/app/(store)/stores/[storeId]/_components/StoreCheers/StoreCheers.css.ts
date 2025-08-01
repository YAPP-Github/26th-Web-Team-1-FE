import { style } from "@vanilla-extract/css";

import { colors, radius, semantic } from "@/styles";

export const storeCheersContainer = style({
  paddingTop: "2.4rem",
  paddingBottom: "4rem",
});

export const cheerCardProfileImage = style({
  width: "2.8rem",
  height: "2.8rem",
});

export const cheerCardDivider = style({
  width: "0.2rem",
  height: "auto",
  alignSelf: "stretch",
  flexShrink: 0,
  backgroundColor: colors.coolNeutral[97],
  marginLeft: "1.4rem",
  marginRight: "2.1rem",
});

export const cheerCardContent = style({
  width: "100%",
  height: "100%",
  padding: "1.6rem",
  backgroundColor: semantic.background.grayLight,
  borderRadius: radius[160],
});

export const cheerCardContentText = style({
  selectors: {
    "&[data-long-text='true'][data-expanded='false']": {
      display: "-webkit-box",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
});
