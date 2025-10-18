"use client";

import { type ReactNode } from "react";

import * as styles from "./BottomSheet.css";

export type BottomSheetBodyProps = {
  children: ReactNode;
  className?: string;
};

export function BottomSheetBody({ children, className }: BottomSheetBodyProps) {
  return (
    <div
      className={
        className ? `${styles.sheetBody} ${className}` : styles.sheetBody
      }
    >
      {children}
    </div>
  );
}

BottomSheetBody.displayName = "BottomSheet.Body";
