import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

import { semantic } from "@/styles";

export const floatingButton = recipe({
  base: {
    position: "fixed",
    right: "calc((100vw - min(100vw, 480px)) / 2 + 1rem)",
    bottom: "calc(6.5rem + env(safe-area-inset-bottom, 0))",
    borderRadius: "4rem",
    zIndex: 1000,
    boxShadow: "0 0 24px 0 rgba(79, 79, 79, 0.24)",
    backgroundColor: semantic.button.primaryNormalSolid,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",

    selectors: {
      "&:hover": { transform: "scale(1.05)" },
      "&:active": { transform: "scale(0.9)" },
    },
  },
  variants: {
    variant: {
      initial: {
        padding: "1.1rem 1.6rem",
      },
      scrolled: {
        padding: "1.4rem",
      },
    },
  },
  defaultVariants: {
    variant: "initial",
  },
});

export type FloatingButtonVariants = RecipeVariants<typeof floatingButton>;
