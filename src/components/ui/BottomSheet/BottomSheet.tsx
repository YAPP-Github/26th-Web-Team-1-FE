import { type ReactNode } from "react";
import { type DialogProps,Drawer } from "vaul";

import * as styles from "./BottomSheet.css";

export type BottomSheetProps = {
  title: string;
  trigger?: ReactNode;
  footer?: ReactNode;
  content?: ReactNode;
} & DialogProps;

export const BottomSheet = ({
  title,
  trigger,
  footer,
  content,
  ...props
}: BottomSheetProps) => {
  return (
    <Drawer.Root {...props}>
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content}>
          <section className={styles.innerContent}>
            <div className={styles.handleContainer}>
              <div className={styles.handle} />
            </div>
            <Drawer.Title className={styles.title}>{title}</Drawer.Title>
            <div className={styles.sheetBody}>{content}</div>
            {footer && <div className={styles.buttonContainer}>{footer}</div>}
          </section>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
