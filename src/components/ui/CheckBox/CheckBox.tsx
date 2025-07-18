"use client";

import { type ChangeEvent, type ComponentProps } from "react";

import CheckIcon from "@/assets/check.svg";

import * as styles from "./CheckBox.css";

type CheckBoxProps = {
  /**
   * 체크박스의 체크 상태를 나타냅니다.
   */
  checked: boolean;

  /**
   * 배경색 포함 여부를 결정합니다. `true`일 경우 배경색이 있는 스타일이 적용됩니다.
   * @default true
   */
  hasBackground?: boolean;

  /**
   * 체크 상태가 변경될 때 호출되는 콜백 함수입니다.
   */
  onCheckedChange: (checked: boolean) => void;

  /**
   * 컴포넌트에 적용할 추가적인 CSS 클래스명입니다.
   */
  className?: string;
} & ComponentProps<"input">;

/**
 * CheckBox UI 컴포넌트
 * @example
 * ```tsx
 * <CheckBox
 *   checked={checked}
 *   onCheckedChange={setChecked}
 *   hasBackground={true}       // 기본값이 true 이므로 생략 가능
 *   className="my-custom-class" // 추가 스타일링이 필요할 때
 * />
 * ```
 */
export const CheckBox = ({
  checked,
  hasBackground = true,
  className,
  onCheckedChange,
  onChange,
  ...props
}: CheckBoxProps) => {
  const variantClass = styles.checkboxWrapper({ hasBackground, checked });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);

    if (!event.defaultPrevented) {
      onCheckedChange(event.target.checked);
    }
  };

  return (
    <label className={`${variantClass} ${className ?? ""}`}>
      <input
        type='checkbox'
        className={styles.hiddenCheckbox}
        checked={checked}
        onChange={event => handleChange(event)}
        {...props}
      />
      <CheckIcon className={styles.icon} />
    </label>
  );
};
