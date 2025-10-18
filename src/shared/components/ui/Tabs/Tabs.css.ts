import { recipe } from "@vanilla-extract/recipes";

import { colors, semantic } from "@/shared/styles";

export const tabsList = recipe({
  base: {
    display: "flex",
  },
  variants: {
    layout: {
      content: {
        gap: "2.4rem",
      },
      equal: {
        gap: 0,
      },
    },
  },
  defaultVariants: {
    layout: "content",
  },
});

export const tabsTrigger = recipe({
  base: {
    paddingBlock: "1.2rem",
    position: "relative",
    selectors: {
      "&[data-state='active']": {
        color: semantic.text.normal,
      },
      "&[data-state='inactive']": {
        color: colors.coolNeutral[80],
      },
      "&[data-state='active']::after": {
        content: "''",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "2px",
        backgroundColor: colors.neutral[10],
      },
    },
  },
  variants: {
    layout: {
      content: {},
      equal: {
        flex: 1,
        borderBottom: `1px solid ${colors.coolNeutral[90]}`,
      },
    },
  },
  defaultVariants: {
    layout: "content",
  },
});
