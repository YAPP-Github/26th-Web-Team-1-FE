import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type HTMLAttributes } from "react";

import { coerceCssRemValue } from "@/shared/lib/utils/style";

import * as styles from "./Skeleton.css";

export type SkeletonProps = {
  /** 스켈레톤 너비 */
  width: number | string;

  /** 스켈레톤 높이 */
  height: number | string;

  /** border-radius(px, rem, %, 토큰 모두 가능) */
  radius?: number | string;
} & HTMLAttributes<HTMLDivElement>;

/**
 * Skeleton 컴포넌트
 * @example
 * ```tsx
 * <Skeleton width={120} height={24} radius={8} />
 * ```
 */
export const Skeleton = ({
  width,
  height,
  radius,
  style: customStyle,
  ...rest
}: SkeletonProps) => {
  const style = {
    ...assignInlineVars({
      [styles.widthVar]: coerceCssRemValue(width),
      [styles.heightVar]: coerceCssRemValue(height),
      [styles.radiusVar]: radius ? coerceCssRemValue(radius) : undefined,
    }),
    ...customStyle,
  };

  return <div className={styles.wrapper} style={style} {...rest} />;
};
