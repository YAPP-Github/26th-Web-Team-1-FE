import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { getVar } from "@/lib/utils/getVar";

export const stackGapVar = "--stack-gap";

export const stackStyles = recipe({
  base: {
    display: "flex",
    gap: getVar(stackGapVar),
  },
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
      between: {
        justifyContent: "space-between",
      },
    },
    align: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
    wrap: {
      nowrap: {
        flexWrap: "nowrap",
      },
      wrap: {
        flexWrap: "wrap",
      },
      reverse: {
        flexWrap: "wrap-reverse",
      },
    },
  },
});

export type StackVariants = RecipeVariants<typeof stackStyles>;
