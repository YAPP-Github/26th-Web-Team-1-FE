"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { type HTMLAttributes } from "react";
import { useControlledState } from "react-simplikit";

import CancelIcon from "@/assets/cancel.svg";

import { Stack, type StackProps } from "../Stack";
import { PopupProvider, usePopup } from "./context";
import * as styles from "./Popup.css";

export type PopupRootProps = {} & RadixDialog.DialogProps;

const PopupRoot = ({
  children,
  open: openFromProps,
  defaultOpen = false,
  onOpenChange,
  ...props
}: PopupRootProps) => {
  const [open, setOpen] = useControlledState({
    value: openFromProps,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <PopupProvider open={open} onOpenChange={setOpen}>
      <RadixDialog.Root open={open} onOpenChange={setOpen} {...props}>
        {children}
      </RadixDialog.Root>
    </PopupProvider>
  );
};

const PopupTrigger = RadixDialog.DialogTrigger;

const PopupCloseButton = ({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <RadixDialog.Close asChild>
      <button
        className={styles.contentCloseButton + " " + className}
        aria-label='팝업 닫기'
        {...props}
      >
        <CancelIcon width={20} height={20} />
      </button>
    </RadixDialog.Close>
  );
};

export type PopupContentProps = {} & RadixDialog.DialogContentProps;

const PopupContent = ({ children, className, ...props }: PopupContentProps) => {
  const { open } = usePopup();

  return (
    <AnimatePresence>
      {open && (
        <RadixDialog.Portal forceMount>
          <RadixDialog.Overlay asChild forceMount>
            <motion.div
              className={styles.overlay}
              variants={styles.overlayVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.1, ease: "easeInOut" }}
            />
          </RadixDialog.Overlay>
          <RadixDialog.Content asChild {...props}>
            <div className={styles.content}>
              <motion.div
                className={styles.contentInner + " " + className}
                variants={styles.contentVariants}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <PopupCloseButton />
                {children}
              </motion.div>
            </div>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      )}
    </AnimatePresence>
  );
};

type PopupBodyProps = HTMLAttributes<HTMLDivElement>;

const PopupBody = ({ children, className, ...props }: PopupBodyProps) => {
  return (
    <div className={styles.body + " " + className} {...props}>
      {children}
    </div>
  );
};

type PopupFooterProps = {} & StackProps<"div">;

const PopupFooter = ({
  children,
  direction = "column",
  gap = 10,
  className,
  ...props
}: PopupFooterProps) => {
  return (
    <Stack
      direction={direction}
      gap={gap}
      className={styles.footer + " " + className}
      {...props}
    >
      {children}
    </Stack>
  );
};

const PopupClose = RadixDialog.DialogClose;

export const Popup = {
  Root: PopupRoot,
  Trigger: PopupTrigger,
  Content: PopupContent,
  Body: PopupBody,
  Footer: PopupFooter,
  Close: PopupClose,
};
