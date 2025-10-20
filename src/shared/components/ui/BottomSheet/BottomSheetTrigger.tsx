"use client";

import { type ReactNode } from "react";
import { Drawer } from "vaul";

export type BottomSheetTriggerProps = {
  children: ReactNode;
};

export function BottomSheetTrigger({ children }: BottomSheetTriggerProps) {
  return <Drawer.Trigger asChild>{children}</Drawer.Trigger>;
}

BottomSheetTrigger.displayName = "BottomSheet.Trigger";
