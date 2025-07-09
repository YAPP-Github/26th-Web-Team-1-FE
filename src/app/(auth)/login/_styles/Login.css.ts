import { style } from "@vanilla-extract/css";

import { semantic, typography } from "@/styles";

export const wrapper = style({
  width: "100%",
  height: "100vh",
  overflow: "hidden",
});

export const backgroundWrapper = style({
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundImage: "url(\"/images/login-background.webp\")",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
});

export const textButton = style({
  color: semantic.text.neutral,
});

export const logoWrapper = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2.4rem",
});

export const logoIcon = style({
  width: "7.7rem",
  height: "4rem",
});

export const gradientOverlay = style({
  position: "absolute",
  top: "60%",
  left: 0,
  width: "100%",
  height: "50%",
  background: `linear-gradient(
    180deg,
    rgba(255, 245, 214, 0) 0%,
    rgba(255, 246, 218, 1) 40%,
    rgba(255, 255, 255, 1) 100%
  )`,
  zIndex: 0,
});

export const contentWrapper = style({
  zIndex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  gap: "2.1rem",
});

export const titleWrapper = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
});

export const title = style({
  ...typography.title1Bd,
});

export const subtitle = style({
  ...typography.body1Md,
  color: semantic.text.alternative,
});

export const kakaoButtonWrapper = style({
  width: "100%",
  padding: "4rem 2rem",
});

export const kakaoButton = style({
  backgroundColor: "#FAE300",
  gap: "0.8rem",
});

export const kakaoLogo = style({
  width: "2.4rem",
  height: "2.4rem",
});

export const kakaoText = style({
  ...typography.body1Sb,
  color: semantic.text.normal,
});
