import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { type ReactNode } from "react";

import * as styles from "./AlertModal.css";

export type AlertModalProps = {
  /** 모달의 제목 */
  title?: string;

  /** 모달을 열기 위한 트리거(버튼 등, 선택) */
  trigger?: ReactNode;

  /** 본문(설명 등, ReactNode로 자유롭게 구성) */
  content?: ReactNode;

  /**
   * 하단 푸터(버튼 영역 등, ReactNode로 자유롭게 구성)
   * Radix의 <AlertDialog.Cancel asChild> 또는 <AlertDialog.Action asChild>를 조합하여 사용 가능
   * 예시:
   * <>
   *   <AlertDialog.Cancel asChild>
   *     <Button>취소</Button>
   *   </AlertDialog.Cancel>
   *   <AlertDialog.Action asChild>
   *     <Button>확인</Button>
   *   </AlertDialog.Action>
   * </>
   */
  footer?: ReactNode;
};

/**
 * AlertModal 컴포넌트
 *
 * @example
 * ```tsx
 * <AlertModal
 *   title="정말 삭제하시겠어요?"
 *   trigger={<Button>모달 열기</Button>}
 *   content={<div>삭제하면 복구할 수 없습니다.</div>}
 *   footer={
 *     <>
 *       <Button variant="assistive">취소</Button>
 *       <Button variant="primary">삭제</Button>
 *     </>
 *   }
 * />
 * ```
 */
export const AlertModal = ({
  title,
  trigger,
  content,
  footer,
}: AlertModalProps) => {
  return (
    <AlertDialog.Root>
      {trigger && <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.overlay} />
        <AlertDialog.Content className={styles.content}>
          <section className={styles.innerContent}>
            {title && (
              <AlertDialog.Title className={styles.title}>
                {title}
              </AlertDialog.Title>
            )}
            {content && <div className={styles.description}>{content}</div>}
          </section>
          {footer && <div className={styles.footer}>{footer}</div>}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
