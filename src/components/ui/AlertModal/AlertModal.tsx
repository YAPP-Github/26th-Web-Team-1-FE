"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { clsx } from "clsx";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import * as styles from "./AlertModal.css";

export type AlertModalRootProps = AlertDialog.AlertDialogProps;

const AlertModalRoot = ({ children, ...props }: AlertModalRootProps) => {
  return <AlertDialog.Root {...props}>{children}</AlertDialog.Root>;
};

export type AlertModalTriggerProps = {
  children: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
} & ComponentPropsWithoutRef<typeof AlertDialog.Trigger>;

const AlertModalTrigger = ({
  children,
  ref,
  ...props
}: AlertModalTriggerProps) => {
  return (
    <AlertDialog.Trigger ref={ref} {...props} asChild>
      {children}
    </AlertDialog.Trigger>
  );
};

export type AlertModalContentProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof AlertDialog.Content>;

const AlertModalContent = ({ children, className }: AlertModalContentProps) => {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Overlay className={styles.overlay} />
      <AlertDialog.Content className={clsx(styles.content, className)}>
        {children}
      </AlertDialog.Content>
    </AlertDialog.Portal>
  );
};

export type AlertModalHeaderProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"section">;

const AlertModalHeader = ({ children, className }: AlertModalHeaderProps) => {
  return (
    <section className={clsx(styles.innerContent, className)}>
      {children}
    </section>
  );
};

export type AlertModalTitleProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof AlertDialog.Title>;

const AlertModalTitle = ({ children, className }: AlertModalTitleProps) => {
  return (
    <AlertDialog.Title className={clsx(styles.title, className)}>
      {children}
    </AlertDialog.Title>
  );
};

export type AlertModalDescriptionProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof AlertDialog.Description>;

const AlertModalDescription = ({
  children,
  className,
}: AlertModalDescriptionProps) => {
  return (
    <AlertDialog.Description className={clsx(styles.description, className)}>
      {children}
    </AlertDialog.Description>
  );
};

export type AlertModalFooterProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"div">;

const AlertModalFooter = ({ children, className }: AlertModalFooterProps) => {
  return <div className={clsx(styles.footer, className)}>{children}</div>;
};

export type AlertModalCancelProps = {
  children: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  asChild?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

const AlertModalCancel = ({
  children,
  className,
  ref,
  asChild = false,
  ...props
}: AlertModalCancelProps) => {
  if (asChild) {
    return <AlertDialog.Cancel asChild>{children}</AlertDialog.Cancel>;
  }

  return (
    <AlertDialog.Cancel asChild>
      <button
        ref={ref}
        className={clsx(styles.cancelButton, className)}
        {...props}
      >
        {children}
      </button>
    </AlertDialog.Cancel>
  );
};

export type AlertModalActionProps = {
  children: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  asChild?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

const AlertModalAction = ({
  children,
  className,
  ref,
  asChild = false,
  ...props
}: AlertModalActionProps) => {
  if (asChild) {
    return <AlertDialog.Action asChild>{children}</AlertDialog.Action>;
  }

  return (
    <AlertDialog.Action asChild>
      <button
        ref={ref}
        className={clsx(styles.confirmButton, className)}
        {...props}
      >
        {children}
      </button>
    </AlertDialog.Action>
  );
};

type AlertModalComposition = {
  /**
   * 알림 모달의 상태 및 컨텍스트를 관리하는 최상위 컴포넌트
   */
  Root: typeof AlertModalRoot;

  /**
   * 알림 모달을 열기 위한 트리거 (버튼 등)
   * `asChild`로 감싸면 외부 요소를 그대로 트리거로 사용할 수 있음
   */
  Trigger: typeof AlertModalTrigger;

  /**
   * 알림 모달의 콘텐츠를 감싸는 영역. Portal을 통해 렌더링되며 Overlay와 Content를 포함
   */
  Content: typeof AlertModalContent;

  /**
   * 알림 모달의 제목 영역을 감싸는 컨테이너
   */
  Header: typeof AlertModalHeader;

  /**
   * 알림 모달의 실제 제목 컴포넌트
   */
  Title: typeof AlertModalTitle;

  /**
   * 알림 모달의 설명 텍스트
   */
  Description: typeof AlertModalDescription;

  /**
   * 알림 모달의 하단 영역. 주로 버튼/액션을 배치하는 데 사용
   */
  Footer: typeof AlertModalFooter;

  /**
   * 알림 모달의 취소 버튼
   */
  Cancel: typeof AlertModalCancel;

  /**
   * 알림 모달의 확인 버튼
   */
  Action: typeof AlertModalAction;
};

/**
 * AlertModal 컴포넌트
 * @description Compound Component Pattern을 사용하여 사용자에게 중요한 정보를 전달하고 확인을 받는 모달을 구현한 컴포넌트입니다.
 *
 * @see @radix-ui/react-alert-dialog 라이브러리를 기반으로 구현되었습니다.
 *
 * @example
 * ```tsx
 * <AlertModal.Root>
 *   <AlertModal.Trigger asChild>
 *     <Button>모달 열기</Button>
 *   </AlertModal.Trigger>
 *
 *   <AlertModal.Content>
 *     <AlertModal.Header>
 *       <AlertModal.Title>
 *         제목
 *       </AlertModal.Title>
 *       <AlertModal.Description>
 *         설명 텍스트
 *       </AlertModal.Description>
 *     </AlertModal.Header>
 *
 *     <AlertModal.Footer>
 *       <AlertModal.Cancel>취소</AlertModal.Cancel>
 *       <AlertModal.Action>확인</AlertModal.Action>
 *     </AlertModal.Footer>
 *   </AlertModal.Content>
 * </AlertModal.Root>
 * ```
 */
export const AlertModal: AlertModalComposition = {
  Root: AlertModalRoot,
  Trigger: AlertModalTrigger,
  Content: AlertModalContent,
  Header: AlertModalHeader,
  Title: AlertModalTitle,
  Description: AlertModalDescription,
  Footer: AlertModalFooter,
  Cancel: AlertModalCancel,
  Action: AlertModalAction,
};
