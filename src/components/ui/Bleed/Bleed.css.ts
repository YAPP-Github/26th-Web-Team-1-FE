import { style } from "@vanilla-extract/css";

import { getVar } from "@/lib/utils/getVar";

export const bleedInlineStartVar = "--bleed-inline-start";
export const bleedInlineEndVar = "--bleed-inline-end";
export const bleedBlockStartVar = "--bleed-block-start";
export const bleedBlockEndVar = "--bleed-block-end";

export const bleedStyles = style({
  marginInlineStart: `calc(${getVar(bleedInlineStartVar)} * -1)`,
  marginInlineEnd: `calc(${getVar(bleedInlineEndVar)} * -1)`,
  marginBlockStart: `calc(${getVar(bleedBlockStartVar)} * -1)`,
  marginBlockEnd: `calc(${getVar(bleedBlockEndVar)} * -1)`,
});
