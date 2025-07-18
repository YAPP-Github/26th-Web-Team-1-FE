import type { DialogProps } from "@radix-ui/react-dialog";
import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "../Button";
import * as styles from "./AlertModal.css";

export type AlertModalProps = {
  /** 모달 제목  */
  title?: string;

  /** 모달 설명  */
  description?: string;

  /** 확인 버튼 클릭 시 실행되는 콜백 */
  onConfirm?: () => void | Promise<void>;

  /** 취소 버튼 클릭 시 실행되는 콜백 */
  onCancel?: () => void;

  /** 확인 버튼 텍스트 */
  confirmLabel?: string;

  /** 취소 버튼 텍스트 */
  cancelLabel?: string;
} & DialogProps;

/**
 * AlertModal 컴포넌트
 *
 * @description
 * Radix UI의 Dialog를 래핑한 모달 컴포넌트입니다.
 * 제목과 설명을 표시하고, 확인/취소 버튼을 제공합니다.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <AlertModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="로그아웃 하시겠어요?"
 *   description="로그아웃하면 다시 로그인해야 합니다."
 *   cancelLabel="취소"
 *   confirmLabel="로그아웃"
 *   onCancel={() => console.log("취소")}
 *   onConfirm={() => console.log("확인")}
 * />
 * ```
 */
export const AlertModal = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = "확인",
  cancelLabel = "취소",
}: AlertModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          {(title || description) && (
            <div className={styles.textWrapper}>
              {title && (
                <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              )}
              {description && (
                <Dialog.Description className={styles.description}>
                  {description}
                </Dialog.Description>
              )}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <Dialog.Close asChild>
              <Button
                className={styles.cancelButton}
                variant='assistive'
                size='large'
                onClick={onCancel}
                style={{
                  borderRadius: "0 0 0 1.2rem",
                }}
              >
                {cancelLabel}
              </Button>
            </Dialog.Close>
            <Button
              className={styles.confirmButton}
              variant='primary'
              size='large'
              onClick={onConfirm}
              style={{
                borderRadius: "0 0 1.2rem 0",
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
