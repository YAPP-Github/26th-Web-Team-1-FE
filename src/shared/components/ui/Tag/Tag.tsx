import clsx from "clsx";
import { type HTMLAttributes } from "react";

import { tag, type TagVariants } from "./Tag.css";

export type TagProps = HTMLAttributes<HTMLDivElement> & TagVariants;

/**
 * Tag 컴포넌트
 *
 * @description
 * 아이콘과 텍스트를 포함할 수 있는 태그 형태의 UI 컴포넌트입니다.
 * 다양한 크기와 스타일 변형을 지원하며, 카테고리나 라벨 표시에 적합합니다.
 *
 * @example
 * ```tsx
 * <Tag size="small" variant="primary">
 *   <Image src="/icon.png" alt="아이콘" width={16} height={16} />
 *   태그 라벨
 * </Tag>
 *
 * // 크기 변형
 * <Tag size="large" variant="assistive">
 *   큰 태그
 * </Tag>
 *
 * // 스타일 변형
 * <Tag variant="primaryLow">
 *   주황색 배경 태그
 * </Tag>
 * ```
 */
export const Tag = ({
  size,
  variant,
  children,
  className,
  ...restProps
}: TagProps) => {
  return (
    <div className={clsx(tag({ size, variant }), className)} {...restProps}>
      {children}
    </div>
  );
};
