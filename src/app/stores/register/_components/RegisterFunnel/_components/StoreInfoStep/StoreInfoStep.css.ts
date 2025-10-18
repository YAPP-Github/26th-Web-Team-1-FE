import { globalStyle, style } from "@vanilla-extract/css";

import { semantic } from "@/shared/styles";

export const registrationGuideBottomSheetTitle = style({
  padding: "2rem 2.4rem",
});

export const registrationGuideInfo = style({
  padding: "1.6rem 2.4rem",
  borderRadius: "1.6rem",
  background: semantic.surface.gray,
});

export const registrationGuideBottomSheetContent = style({
  paddingTop: "1.6rem",
});

export const registrationGuideInfoDescription = style({
  color: semantic.text.alternative,
});

export const registrationGuideInfoTitle = style({});

globalStyle(`${registrationGuideInfoTitle} b`, {
  color: semantic.text.primary,
});
