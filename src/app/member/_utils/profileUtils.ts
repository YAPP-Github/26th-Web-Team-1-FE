import {
  PROFILE_COLOR_COUNT,
  type ProfileColorIndex,
} from "../_constants/profileColors.constants";

/**
 * memberId를 기반으로 프로필 색상 인덱스 반환 (0, 1, 2)
 * memberId를 색상 개수로 나눈 나머지 사용
 */
export const getProfileColorIndex = (memberId: number): ProfileColorIndex => {
  return (Math.abs(memberId) % PROFILE_COLOR_COUNT) as ProfileColorIndex;
};
