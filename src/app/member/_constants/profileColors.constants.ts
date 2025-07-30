export const PROFILE_COLORS = {
  0: {
    background: "#FFF1AF",
    name: "yellow",
  },
  1: {
    background: "#FFDDDA",
    name: "pink",
  },
  2: {
    background: "#C9ECFF",
    name: "blue",
  },
} as const;

export type ProfileColorIndex = keyof typeof PROFILE_COLORS;

// 프로필 색상의 개수
export const PROFILE_COLOR_COUNT = Object.keys(PROFILE_COLORS).length;
