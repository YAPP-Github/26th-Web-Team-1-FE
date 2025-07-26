import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { radius, semantic, typography } from "@/styles";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
});

export const label = style({
  ...typography.label1Sb,
  color: semantic.text.alternative,
});

export const input = recipe({
  base: {
    width: "100%",
    height: "5.2rem",
    padding: "1.4rem 1.2rem",
    ...typography.body1Md,
    border: "1px solid transparent",
    borderRadius: radius[160],
    outline: "none",
  },
  variants: {
    status: {
      inactive: {
        backgroundColor: semantic.surface.gray,
        color: semantic.text.disabled,

        selectors: {
          "&:focus": {
            backgroundColor: semantic.surface.white,
            color: semantic.text.normal,
            caretColor: semantic.border.pressed,
            border: `1px solid ${semantic.border.pressed}`,
            outline: "none",
          },
          "&:disabled": {
            backgroundColor: semantic.surface.disabled,
            color: semantic.text.disabled,
            cursor: "not-allowed",
          },
          "&:not(:placeholder-shown):not(:focus)": {
            backgroundColor: semantic.surface.gray,
            color: semantic.text.normal,
          },
        },
      },
      negative: {
        backgroundColor: semantic.surface.white,
        color: semantic.text.normal,
        border: `1px solid ${semantic.status.negative}`,
      },
    },
  },
  defaultVariants: {
    status: "inactive",
  },
});

export const helperText = recipe({
  base: {
    ...typography.caption1Md,
    color: semantic.text.alternative,
  },
  variants: {
    status: {
      inactive: {},
      negative: { color: semantic.status.negative },
    },
  },
  defaultVariants: {
    status: "inactive",
  },
});

export const inputWrapper = style({
  position: "relative",
});

export const rightAddonWrapper = style({
  position: "absolute",
  right: "1.2rem",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "transparent",
  padding: "0.1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
