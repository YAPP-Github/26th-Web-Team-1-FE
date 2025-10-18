"use client";

import { type ComponentProps, type ReactNode } from "react";

import {
  floatingButton,
  type FloatingButtonVariants,
} from "./FloatingButton.css";

export type FloatingButtonProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"button"> &
  FloatingButtonVariants;

/**
 * 플로팅 버튼 컴포넌트
 * @description 플로팅 버튼 컴포넌트는 화면에 고정되어 표시되는 액션 버튼입니다. 스크롤 상태에 따라 크기와 내용이 변경됩니다.'
 * @example
 * ```tsx
 * <FloatingButton variant="initial">
 *   <HStack align="center" gap={4}>
 *     <PlusIcon width={16} height={16} />
 *     <Text typo="body2Sb" color="text.white">
 *       응원 등록
 *     </Text>
 *   </HStack>
 * </FloatingButton>
 *
 * <FloatingButton variant="scrolled">
 *   <PlusIcon width={24} height={24} />
 * </FloatingButton>
 * ```
 */
export const FloatingButton = ({
  children,
  className,
  variant,
  ...props
}: FloatingButtonProps) => {
  const floatingButtonStyle = floatingButton({ variant });

  return (
    <button
      type='button'
      className={`${floatingButtonStyle} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
