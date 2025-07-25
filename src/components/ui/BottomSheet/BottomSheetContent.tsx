"use client";

import { type ReactNode } from "react";
import { Drawer } from "vaul";

import * as styles from "./BottomSheet.css";

export type BottomSheetContentProps = {
  children: ReactNode;
  className?: string;
};

export function BottomSheetContent({
  children,
  className,
}: BottomSheetContentProps) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className={styles.overlay} />
      <Drawer.Content className={styles.content}>
        <section
          className={
            className
              ? `${styles.innerContent} ${className}`
              : styles.innerContent
          }
        >
          {children}
        </section>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

BottomSheetContent.displayName = "BottomSheet.Content";
