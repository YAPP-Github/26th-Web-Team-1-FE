import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

import { radius, semantic, typography } from "@/styles";

export const wrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const title = style({
  ...typography.label1,
  fontWeight: 600,
  color: semantic.text.alternative,
});

export const input = recipe({
  base: {
    width: "100%",
    height: "52px",
    padding: "14px 12px",
    ...typography.body1,
    fontWeight: "500",
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
    ...typography.caption1,
    fontWeight: "500",
    color: semantic.text.alternative,
  },
  variants: {
    status: {
      inactive: {},
      focus: {},
      filled: {},
      disabled: {},
      negative: { color: semantic.status.negative },
    },
  },
  defaultVariants: {
    status: "inactive",
  },
});
