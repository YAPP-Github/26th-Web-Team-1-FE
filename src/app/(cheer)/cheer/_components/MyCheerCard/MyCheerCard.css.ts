import { style } from "@vanilla-extract/css";

import { colors, radius, semantic } from "@/styles";

export const wrapper = style({
  backgroundColor: colors.redOrange[90],
  padding: "2rem",
  borderRadius: "2.4rem",
});

export const locationIcon = style({
  color: semantic.icon.gray,
});

export const cheerPeopleCountWrapper = style({
  backgroundColor: semantic.background.white,
  padding: "0.8rem 1.2rem",
  borderRadius: radius[100],
});

export const avatarOverlap = style({
  border: "2px solid white",
  marginLeft: "-18px",
  borderRadius: radius.circle,
  width: "2.4rem",
  height: "2.4rem",

  ":first-child": {
    marginLeft: "0",
  },
});

export const button = style({
  display: "flex",
  gap: "0.5rem",
});
