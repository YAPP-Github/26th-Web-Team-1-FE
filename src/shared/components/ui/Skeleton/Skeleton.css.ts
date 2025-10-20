import { createVar, style } from "@vanilla-extract/css";

import { colors } from "@/shared/styles";

export const widthVar = createVar();
export const heightVar = createVar();
export const radiusVar = createVar();

export const wrapper = style({
  width: widthVar,
  height: heightVar,
  borderRadius: radiusVar,
  backgroundColor: colors.coolNeutral[98],
});
