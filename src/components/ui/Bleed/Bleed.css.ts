import { createVar, style } from "@vanilla-extract/css";

export const bleedInlineStartVar = createVar();
export const bleedInlineEndVar = createVar();
export const bleedBlockStartVar = createVar();
export const bleedBlockEndVar = createVar();

export const bleedStyles = style({
  marginInlineStart: `calc(${bleedInlineStartVar} * -1)`,
  marginInlineEnd: `calc(${bleedInlineEndVar} * -1)`,
  marginBlockStart: `calc(${bleedBlockStartVar} * -1)`,
  marginBlockEnd: `calc(${bleedBlockEndVar} * -1)`,
});
