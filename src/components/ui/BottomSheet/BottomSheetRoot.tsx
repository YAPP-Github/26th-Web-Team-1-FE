import { type ReactNode } from "react";
import { type DialogProps, Drawer } from "vaul";

export type BottomSheetRootProps = {
  children: ReactNode;
} & DialogProps;

export function BottomSheetRoot({ children, ...props }: BottomSheetRootProps) {
  return (
    <Drawer.Root {...props} repositionInputs={false}>
      {children}
    </Drawer.Root>
  );
}

BottomSheetRoot.displayName = "BottomSheet.Root";
