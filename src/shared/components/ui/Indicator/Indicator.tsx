import { HStack } from "../Stack";
import * as styles from "./Indicator.css";

export type IndicatorProps = {
  /**
   * 전체 인디케이터의 개수
   */
  totalCount: number;

  /**
   * 현재 활성화된 인덱스
   */
  currentIndex: number;

  /**
   * 인디케이터 클릭 시 호출되는 콜백. 클릭한 인덱스를 인자로 전달
   */
  onClickDot: (index: number) => void;
};

/**
 * Indicator 컴포넌트
 * @description 현재 진행 중인 단계를 시각적으로 보여주는 도트 인디케이터 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Indicator
 *   totalCount={4}
 *   currentIndex={2}
 *   onClickDot={(index) => console.log("선택한 인덱스:", index)}
 * />
 * ```
 */
export const Indicator = ({
  totalCount,
  currentIndex,
  onClickDot,
}: IndicatorProps) => {
  return (
    <HStack gap={6}>
      {Array.from({ length: totalCount }).map((_, index) => (
        <span
          key={index}
          data-active={currentIndex === index}
          className={styles.dot}
          onClick={() => onClickDot(index)}
        />
      ))}
    </HStack>
  );
};
