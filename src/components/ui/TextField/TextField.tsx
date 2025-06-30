import { type ComponentProps, useId } from "react";

import * as styles from "./TextField.css";

type Status = "inactive" | "negative";

export type TextFieldProps = {
  label?: string;
  helperText?: string;
  status?: Status;
  rightAddon?: React.ReactNode;
} & ComponentProps<"input">;

export const TextField = ({
  label,
  helperText,
  status = "inactive",
  rightAddon,
  ...props
}: TextFieldProps) => {
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
        <input
          id={inputId}
          className={styles.input({ status })}
          aria-label={label}
          aria-describedby={helperText ? helperId : undefined}
          {...props}
        />

        {rightAddon && (
          <span className={styles.rightAddonWrapper}>{rightAddon}</span>
        )}
      </div>

      {helperText && (
        <p id={helperId} className={styles.helperText({ status })}>
          {helperText}
        </p>
      )}
    </div>
  );
};
