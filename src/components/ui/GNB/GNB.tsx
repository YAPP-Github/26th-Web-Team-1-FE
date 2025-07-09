import { type ReactNode } from "react";

import * as styles from "./GNB.css";

type AlignVariant = "left" | "center";
type WrapperVariants = "white" | "transparent";

export type GNBProps = {
  /**
   * SubGNB의 타이틀 텍스트
   */
  title?: string | ReactNode;

  /**
   * 타이틀 정렬 방식
   * @default "center"
   */
  align?: AlignVariant;

  /**
   * 왼쪽에 배치할 커스텀 요소 (예: 버튼, 아이콘 등)
   */
  leftAddon?: ReactNode;

  /**
   * 오른쪽에 배치할 커스텀 요소 (예: 버튼, 아이콘 등)
   */
  rightAddon?: ReactNode;

  /**
   * SubGNB의 배경색
   * @default "white"
   */
  background?: WrapperVariants;
};

/**
 * SubGNB 컴포넌트
 * @description 상단에 고정되어 표시되는 Global Navigation Bar 컴포넌트입니다.
 * 타이틀과 좌/우 Addon 요소(버튼, 아이콘 등)를 유연하게 조합할 수 있으며,
 * 배경 색상과 타이틀 정렬 방식을 설정할 수 있습니다.
 *
 * @example
 * ```tsx
 * <SubGNB
 *   title="타이틀"
 *   align="left"
 *   background="transparent"
 *   leftAddon={<LeftArrowIcon />}
 *   rightAddon={
 *     <>
 *       <SearchIcon width={24} height={24} />
 *       <MenuIcon width={24} height={24} />
 *     </>
 *   }
 * />
 * ```
 */

export const GNB = ({
  title,
  align = "center",
  leftAddon,
  rightAddon,
  background,
}: GNBProps) => {
  return (
    <header className={styles.wrapper({ background })}>
      <div
        className={
          leftAddon && title && align === "left"
            ? `${styles.leftWrapper} ${styles.leftWrapperWithMargin}`
            : styles.leftWrapper
        }
      >
        {leftAddon}
      </div>

      {title && (
        <div
          className={
            align === "center"
              ? styles.titleWrapperAbsoluteCenter
              : styles.titleWrapperLeft
          }
        >
          <span className={styles.title}>{title}</span>
        </div>
      )}

      <div className={styles.rightWrapper}>{rightAddon}</div>
    </header>
  );
};
