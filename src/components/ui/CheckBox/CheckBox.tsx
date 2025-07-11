"use client";

import { type ComponentProps } from "react";

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
 *
 * @param {boolean} checked - 체크박스의 체크 상태
 * @param {boolean} [hasBackground=true] - 배경색 포함 여부
 * @param {function} onCheckedChange - 체크 상태 변경 콜백
 * @param {string} [className] - 추가 CSS 클래스
 */
export const CheckBox = ({
  checked,
  hasBackground = true,
  className,
  onCheckedChange,
  ...props
}: CheckBoxProps) => {
  const variantClass = styles.checkboxWrapper({ hasBackground, checked });

  return (
    <label className={`${variantClass} ${className ?? ""}`}>
      <input
        type='checkbox'
        className={styles.hiddenCheckbox}
        checked={checked}
        onChange={e => onCheckedChange(e.target.checked)}
        {...props}
      />
      <CheckIcon className={styles.icon} />
    </label>
  );
};
