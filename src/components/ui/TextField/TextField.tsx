import { type ElementType, type ReactNode, useId } from "react";

import { type PolymorphicComponentPropsWithRef } from "@/types/polymorphic.types";

import * as styles from "./TextField.css";

type Status = "inactive" | "negative";

export type TextFieldProps<T extends ElementType> =
  PolymorphicComponentPropsWithRef<
    T,
    {
      label?: string | ReactNode;
      helperText?: string | ReactNode;
      status?: Status;
      rightAddon?: ReactNode;
    }
  >;

/**
 * TextField 컴포넌트
 * @description 기본은 input이지만, as="textarea"처럼 다른 태그로도 변경 가능
 * @example
 * ```tsx
 * <TextField placeholder="기본 input" />
 * <TextField as="textarea" placeholder="textarea로 사용" rows={4} />
 * ```
 */
export const TextField = <T extends ElementType = "input">({
  as,
  className,
  label,
  helperText,
  status = "inactive",
  rightAddon,
  ref,
  ...props
}: TextFieldProps<T>) => {
  const Component = as || "input";
  const inputId = useId();
  const helperId = `${inputId}-helper`;

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputWrapper}>
        <Component
          id={inputId}
          ref={ref}
          className={`${styles.input({ status })} ${className ?? ""}`}
          aria-label={typeof label === "string" ? label : undefined}
          aria-describedby={helperText ? helperId : undefined}
          {...props}
        />

        {rightAddon && (
          <span className={styles.rightAddonWrapper}>{rightAddon}</span>
        )}
      </div>

      {helperText && (
        <div id={helperId} className={styles.helperText({ status })}>
          {helperText}
        </div>
      )}
    </div>
  );
};
