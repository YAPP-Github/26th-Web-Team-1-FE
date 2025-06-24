import { createGlobalTheme } from "@vanilla-extract/css";

export const radius = createGlobalTheme(":root", {
  20: "2px",
  40: "4px",
  60: "6px",
  80: "8px",
  100: "10px",
  120: "12px",
  160: "16px",
  circle: "999px",
});
