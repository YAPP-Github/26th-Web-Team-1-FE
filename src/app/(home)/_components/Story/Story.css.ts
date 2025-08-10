import { style } from "@vanilla-extract/css";

import { radius } from "@/styles";

export const wrapper = style({
  width: "100%",
  height: "9.5rem",
  overflowX: "auto",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const storyImage = style({
  borderRadius: radius.circle,
  objectFit: "cover",
  cursor: "pointer",
});

export const storyItem = style({
  flexShrink: 0,
});
