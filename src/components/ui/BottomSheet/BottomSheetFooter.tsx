"use client";

import { type ReactNode } from "react";

import * as styles from "./BottomSheet.css";

export type BottomSheetFooterProps = {
  children: ReactNode;
  className?: string;
};

export function BottomSheetFooter({
  children,
  className,
  ...props
}: BottomSheetFooterProps) {
  return (
    <div
      className={
        className
          ? `${styles.buttonContainer} ${className}`
          : styles.buttonContainer
      }
      {...props}
    >
      {children}
    </div>
  );
}

BottomSheetFooter.displayName = "BottomSheet.Footer";
