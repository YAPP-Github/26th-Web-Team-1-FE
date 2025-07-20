import { createGlobalTheme } from "@vanilla-extract/css";

export const zIndex = createGlobalTheme(":root", {
  base: "0",
  gnb: "100",
  overlay: "900",
  modal: "1000",
  toast: "1100",
});
