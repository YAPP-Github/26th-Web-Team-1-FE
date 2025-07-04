import { createVar, style } from "@vanilla-extract/css";

export const fontSizeVar = createVar();
export const lineHeightVar = createVar();
export const letterSpacingVar = createVar();
export const colorVar = createVar();

export const textStyles = style({
  color: colorVar,
  fontSize: fontSizeVar,
  lineHeight: lineHeightVar,
  letterSpacing: letterSpacingVar,
});
