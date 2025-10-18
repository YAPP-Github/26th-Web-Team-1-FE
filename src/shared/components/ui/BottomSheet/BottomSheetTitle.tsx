"use client";

import { type ReactNode } from "react";
import { Drawer } from "vaul";

import * as styles from "./BottomSheet.css";

export type BottomSheetTitleProps = {
  children: ReactNode;
  className?: string;
};

export function BottomSheetTitle({
  children,
  className,
  ...props
}: BottomSheetTitleProps) {
  return (
    <div>
      <div className={styles.handle} />
      <Drawer.Title
        className={className ? `${styles.title} ${className}` : styles.title}
        {...props}
      >
        {children}
      </Drawer.Title>
    </div>
  );
}

BottomSheetTitle.displayName = "BottomSheet.Title";
