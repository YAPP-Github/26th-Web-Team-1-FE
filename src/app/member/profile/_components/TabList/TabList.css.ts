import { style } from "@vanilla-extract/css";

import { radius, semantic } from "@/shared/styles";

export const cheerTabContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
});

export const emptyWrapper = style({
  marginTop: "9rem",
  textAlign: "center",
});

export const wrapperBase = style({
  padding: "2rem",
  borderRadius: "2.4rem",
});

export const wrapperYellow = style([
  wrapperBase,
  { backgroundColor: "#FEF8DD" },
]);
export const wrapperPink = style([wrapperBase, { backgroundColor: "#FDE5E3" }]);
export const wrapperBlue = style([wrapperBase, { backgroundColor: "#E0F2FF" }]);

export const WRAPPER_COLORS = [wrapperYellow, wrapperPink, wrapperBlue];

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

export const storyGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "0.1rem",
});

export const storyCard = style({
  position: "relative",
  width: "100%",
  aspectRatio: "124 / 210",
});

export const storyImage = style({
  objectFit: "cover",
});

export const overlay = style({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%)",
});

export const storeNameWrapper = style({
  position: "absolute",
  left: "0.6rem",
  bottom: "1.2rem",

  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
});

export const marketIcon = style({
  color: semantic.icon.white,
});

export const preLine = style({
  whiteSpace: "pre-line",
});
