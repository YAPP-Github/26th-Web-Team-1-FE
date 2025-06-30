import { type ReactNode } from "react";
import { Drawer } from "vaul";

import * as styles from "./BottomSheet.css";

export type BottomSheetProps = {
  open: boolean;
  children: ReactNode;
  title?: string;
  trigger?: ReactNode;
  footer?: ReactNode;
  onOpenChange: (open: boolean) => void;
};

export const BottomSheet = ({
  open,
  title,
  onOpenChange,
  children,
  trigger,
  footer,
}: BottomSheetProps) => {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content}>
          <section
            className={styles.innerContent}
            aria-modal='true'
            role='dialog'
          >
            <div className={styles.handleContainer}>
              <div className={styles.handle} />
            </div>
            <Drawer.Title className={styles.title}>{title}</Drawer.Title>
            <main className={styles.main}>{children}</main>
            {footer && <div className={styles.buttonContainer}>{footer}</div>}
          </section>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
