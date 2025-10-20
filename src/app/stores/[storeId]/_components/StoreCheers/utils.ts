import { type Theme } from "./types";

export const getCheerCardTheme = (memberId: number) => {
  return ["yellow", "pink", "blue"][memberId % 3];
};

// 색상 테마별 배경색 헬퍼 함수
export const getHeaderBackgroundColor = (colorName: Theme) => {
  switch (colorName) {
    case "yellow":
      return "#fceb9c";
    case "pink":
      return "#fabdb8";
    case "blue":
      return "#b2dfff";
    default:
      return "#fceb9c";
  }
};

export const getContentBackgroundColor = (colorName: Theme) => {
  switch (colorName) {
    case "yellow":
      return "#fef8dd";
    case "pink":
      return "#fde5e3";
    case "blue":
      return "#e0f2ff";
    default:
      return "#fef8dd";
  }
};
