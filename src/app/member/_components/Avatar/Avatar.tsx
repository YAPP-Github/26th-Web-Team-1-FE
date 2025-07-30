import Bapurit from "@/assets/logo/symbol.svg";

import { PROFILE_COLORS } from "../../_constants";
import { getProfileColorIndex } from "../../_utils";
import * as styles from "./Avatar.css";

type AvatarProps = {
  /** 사용자 고유 ID */
  memberId: number;

  className?: string;
};

/**
 * 사용자별 고유한 색상 배경을 가진 프로필 아바타 컴포넌트
 *
 * @description
 * memberId를 기반으로 3가지 색상(노랑, 분홍, 파랑) 중 하나를 자동으로 할당합니다.
 * 같은 memberId는 항상 같은 색상을 가집니다.
 *
 * @example
 * ```tsx
 * <Avatar memberId={123} />
 * <Avatar memberId={story.memberId} />
 * ```
 */
export const Avatar = ({ memberId, className }: AvatarProps) => {
  const colorIndex = getProfileColorIndex(memberId);
  const colorConfig = PROFILE_COLORS[colorIndex];

  return (
    <div
      className={`${styles.avatar} ${className || ""}`}
      style={{
        backgroundColor: colorConfig.background,
      }}
    >
      <Bapurit width={23} height={23} />
    </div>
  );
};
