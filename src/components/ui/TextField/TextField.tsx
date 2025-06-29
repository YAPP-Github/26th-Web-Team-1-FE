import { useId, useRef } from "react";
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import * as styles from "./TextField.css";

type Status = "inactive" | "negative";

type TextFieldProps<T extends FieldValues> = {
  label?: string;
  helperText?: string;
  status?: Status;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;

  name: FieldPath<T>;
  control: Control<T>;
  disabled?: boolean;
  placeholder?: string;
};

export const TextField = <T extends FieldValues>({
  label,
  helperText,
  status = "inactive",
  rightIcon,
  onRightIconClick,
  name,
  control,
  disabled,
  placeholder,
}: TextFieldProps<T>) => {
  const inputId = useId();
  const helperId = `${inputId}-helper`;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { value, onChange } = field;
        const showIcon = !disabled && value;

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
                ref={inputRef}
                className={styles.input({ status })}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                aria-label={label}
                aria-describedby={helperText ? helperId : undefined}
              />

              {rightIcon && showIcon && (
                <button
                  type='button'
                  className={styles.rightIconWrapper}
                  onClick={onRightIconClick}
                  onMouseDown={handleMouseDown}
                >
                  {rightIcon}
                </button>
              )}
            </div>

            {helperText && (
              <p id={helperId} className={styles.helperText({ status })}>
                {helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};
