import { style } from "@vanilla-extract/css";

import { colors, semantic } from "@/shared/styles";

export const contentWrapper = style({
  height: "calc(100dvh - 52px)",
  display: "flex",
  flexDirection: "column",
});

export const titleWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const clearButtonWrapper = style({
  display: "flex",
  alignItems: "center",
});

export const icon = style({
  color: colors.neutral[90],
});

export const helperTextWrapper = style({
  display: "flex",
  gap: "0.4rem",
});

export const infoIcon = style({
  color: semantic.icon.gray,
});

export const searchResultItems = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
  height: "49rem",
  overflowY: "auto",
});

export const searchResultItem = style({
  padding: "1.2rem 1.6rem",
  cursor: "pointer",
});

export const skeletonItem = style({
  padding: "1.2rem 1.6rem",
  borderRadius: "8px",
});

export const skeletonContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const listVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};
