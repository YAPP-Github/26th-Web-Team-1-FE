import type { ComponentProps, ReactNode } from "react";

import * as styles from "./TextButton.css";

type TextButtonVariant = "primary" | "assistive" | "custom";
type TextButtonSize = "medium" | "small";

export type TextButtonProps = {
  variant?: TextButtonVariant;
  size?: TextButtonSize;
  leftAddon?: ReactNode;
  className?: string;
} & ComponentProps<"button">;

/**
 * TextButton 컴포넌트
 * @description 텍스트 기반의 버튼 컴포넌트로, 사이즈와 색상 타입(variant)을 지정할 수 있습니다.
 * 왼쪽에 아이콘 등의 요소를 추가할 수 있습니다.
 *
 * @example
 * ```tsx
 * <TextButton>확인</TextButton>
 * <TextButton variant="assistive" size="small">취소</TextButton>
 * <TextButton leftAddon={<Icon />} variant="custom">설정</TextButton>
 * ```
 */

export const TextButton = ({
  size = "medium",
  variant = "primary",
  children,
  leftAddon,
  className,
  ...props
}: TextButtonProps) => {
  const variantClass = styles.textButton({ variant, size });

  return (
    <button className={`${variantClass} ${className ?? ""}`} {...props}>
      {leftAddon && (
        <span className={styles.leftAddonWrapper}>{leftAddon}</span>
      )}
      <span>{children}</span>
    </button>
  );
};
