import { style } from "@vanilla-extract/css";

import { semantic } from "@/shared/styles";
import { radius } from "@/shared/styles";

export const imageUploader = style({
  width: "12rem",
  height: "12rem",

  flexShrink: 0,

  borderRadius: radius[160],

  selectors: {
    "&[data-has-image='false']": {
      background: semantic.surface.gray,
      border: `1px dashed ${semantic.border.grayLight}`,
    },
  },
});

export const emptyImageUploader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
  height: "100%",

  cursor: "pointer",
});

export const imagePreviewContainer = style({
  position: "relative",

  width: "100%",
  height: "100%",

  objectFit: "cover",
});

export const imagePreviewWrapper = style({
  width: "100%",
  height: "100%",

  overflow: "hidden",
  borderRadius: radius[160],
});

export const imageRemoveButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  position: "absolute",
  top: 0,
  right: 0,

  transform: "translate(30%, -20%)",
});

export const imagePreview = style({
  width: "100%",
  height: "100%",

  objectFit: "cover",
});
