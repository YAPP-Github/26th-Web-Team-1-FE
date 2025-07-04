import { style } from "@vanilla-extract/css";

import { getVar } from "@/lib/utils/getVar";

export const fontSizeVar = "--text-font-size";
export const lineHeightVar = "--text-line-height";
export const letterSpacingVar = "--text-letter-spacing";
export const colorVar = "--text-color";

export const textStyles = style({
  color: getVar(colorVar, "inherit"),
  fontSize: getVar(fontSizeVar),
  lineHeight: getVar(lineHeightVar),
  letterSpacing: getVar(letterSpacingVar),
});
