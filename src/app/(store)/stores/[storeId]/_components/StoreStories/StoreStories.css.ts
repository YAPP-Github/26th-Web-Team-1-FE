import { style } from "@vanilla-extract/css";

import { radius } from "@/shared/styles";

// StoreStories 컴포넌트 스타일
export const storeStoriesContainer = style({
  paddingTop: "2.8rem",
  paddingBottom: "4rem",
});

export const storyWrapper = style({
  position: "relative",
  width: "12.4rem",
  height: "22rem",
});

export const overlay = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background:
    "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%)",
  borderRadius: radius[160],
});

export const image = style({
  objectFit: "cover",
  borderRadius: radius[160],
});

export const memberWrapper = style({
  position: "absolute",
  bottom: "0.8rem",
  left: "0.8rem",
});

export const nickname = style({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
