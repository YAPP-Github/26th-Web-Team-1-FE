import { style } from "@vanilla-extract/css";

import { radius } from "@/shared/styles";

export const storeCheersContainer = style({
  paddingTop: "2.4rem",
  paddingBottom: "4rem",
});

export const cheerCard = style({
  width: "100%",
  borderRadius: radius[160],
  overflow: "hidden",
});

export const cheerCardHeader = style({
  display: "flex",
  alignItems: "center",
  gap: "0.8rem",
  padding: "1.2rem 2rem",
});

export const cheerCardAvatar = style({
  width: "2.4rem",
  height: "2.4rem",
});

export const cheerCardContent = style({
  padding: "2rem",
  paddingBottom: "1.6rem",
});

export const cheerCardContentText = style({
  width: "100%",
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

export const tag = style({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  padding: "0.6rem 0.8rem",
  backgroundColor: "#ffffff",
  borderRadius: "999px",
  border: "1px solid #f0f0f0",
});

export const tagIcon = style({
  fontSize: "1.2rem",
});
