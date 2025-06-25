import { type ComponentProps } from "react";

import * as styles from "./TextField.css";

type Status = "inactive" | "negative";

type TextFieldProps = {
  title?: string;
  helperText?: string;
  status?: Status;
} & ComponentProps<"input">;

export function TextField({
  title,
  helperText,
  status = "inactive",
  ref,
  ...props
}: TextFieldProps) {
  return (
    <div className={styles.wrapper}>
      {title && <p className={styles.title}>{title}</p>}
      <input ref={ref} className={styles.input({ status })} {...props} />
      {helperText && (
        <p className={styles.helperText({ status })}>{helperText}</p>
      )}
    </div>
  );
}
