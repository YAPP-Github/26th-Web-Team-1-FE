import { style } from "@vanilla-extract/css";

import { radius } from "@/styles";

export const storyItem = style({
  flexShrink: 0,
  padding: "0.3rem",
  background:
    "linear-gradient(45deg, #ff6f0f, #ff9047, #ffb07f, rgba(0, 255, 128, 0.7), #49e57d)",
  borderRadius: radius.circle,
});

export const storyImageInner = style({
  padding: "3px",
  backgroundColor: "white",
  borderRadius: radius.circle,
});

export const storyImage = style({
  display: "block",
  borderRadius: radius.circle,
  objectFit: "cover",
  cursor: "pointer",
});
