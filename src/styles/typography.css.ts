import { createGlobalTheme } from "@vanilla-extract/css";

export const typography = createGlobalTheme(":root", {
  display1: {
    fontSize: "40px",
    lineHeight: "52px",
    letterSpacing: "-0.0282em",
  },
  display2: {
    fontSize: "36px",
    lineHeight: "48px",
    letterSpacing: "-0.027em",
  },
  display3: {
    fontSize: "32px",
    lineHeight: "42px",
    letterSpacing: "-0.025em",
  },
  title1: {
    fontSize: "24px",
    lineHeight: "32px",
    letterSpacing: "-0.023em",
  },
  title2: {
    fontSize: "20px",
    lineHeight: "28px",
    letterSpacing: "-0.012em",
  },
  title3: {
    fontSize: "18px",
    lineHeight: "26px",
    letterSpacing: "-0.002em",
  },
  body1: {
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.0057em",
  },
  body2: {
    fontSize: "15px",
    lineHeight: "22px",
    letterSpacing: "0.0096em",
  },
  label1: {
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.0145em",
  },
  label2: {
    fontSize: "13px",
    lineHeight: "18px",
    letterSpacing: "0.0194em",
  },
  caption1: {
    fontSize: "12px",
    lineHeight: "16px",
    letterSpacing: "0.0252em",
  },
  caption2: {
    fontSize: "11px",
    lineHeight: "14px",
    letterSpacing: "0.0311em",
  },
});
