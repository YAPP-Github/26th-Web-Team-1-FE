import { assignInlineVars } from "@vanilla-extract/dynamic";

import { coerceCssRemValue } from "@/lib/utils/coerceCssRemValue";

import * as styles from "./Skeleton.css";

export type SkeletonProps = {
  /** 스켈레톤 너비 */
  width: number;

  /** 스켈레톤 높이 */
  height: number;

  /** border-radius(px 또는 string) */
  radius?: number | string;
};

/**
 * Skeleton 컴포넌트
 * @example
 * ```tsx
 * <Skeleton width={120} height={24} radius={8} />
 * ```
 */
export const Skeleton = ({ width, height, radius }: SkeletonProps) => {
  const style = assignInlineVars({
    [styles.widthVar]: coerceCssRemValue(width),
    [styles.heightVar]: coerceCssRemValue(height),
    [styles.radiusVar]:
      typeof radius === "number" ? coerceCssRemValue(radius) : radius,
  });

  return <div className={styles.wrapper} style={style} />;
};
