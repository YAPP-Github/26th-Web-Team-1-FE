import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "../Button";
import { AlertModal } from "./AlertModal";
import * as styles from "./AlertModal.css";

const meta: Meta = {
  title: "Components/AlertModal",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AlertModal은 Compound Component Pattern을 사용하여 사용자에게 중요한 정보를 전달하고 확인을 받는 모달입니다. AlertModal.Root, AlertModal.Trigger, AlertModal.Content 등의 컴포넌트를 조합하여 사용합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertModal.Root>
      <AlertModal.Trigger asChild>
        <Button>모달 열기</Button>
      </AlertModal.Trigger>
      <AlertModal.Content>
        <AlertModal.Header>
          <AlertModal.Title>정말 삭제하시겠어요?</AlertModal.Title>
          <AlertModal.Description>
            삭제하면 복구할 수 없습니다.
          </AlertModal.Description>
        </AlertModal.Header>
        <AlertModal.Footer>
          <AlertModal.Cancel asChild>
            <Button
              variant='assistive'
              className={styles.cancelButton}
              style={{ borderRadius: "0 0 0 1.2rem" }}
            >
              취소
            </Button>
          </AlertModal.Cancel>
          <AlertModal.Action asChild>
            <Button
              variant='primary'
              className={styles.confirmButton}
              style={{ borderRadius: "0 0 1.2rem 0" }}
            >
              삭제
            </Button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "기본 AlertModal. 타이틀과 설명, 확인/취소 버튼을 모두 포함합니다.",
      },
    },
  },
};

export const NoDescription: Story = {
  render: () => (
    <AlertModal.Root>
      <AlertModal.Trigger asChild>
        <Button>모달 열기</Button>
      </AlertModal.Trigger>
      <AlertModal.Content>
        <AlertModal.Header>
          <AlertModal.Title>약관을 동의하시겠습니까?</AlertModal.Title>
        </AlertModal.Header>
        <AlertModal.Footer>
          <AlertModal.Cancel asChild>
            <Button
              variant='assistive'
              className={styles.cancelButton}
              style={{ borderRadius: "0 0 0 1.2rem" }}
            >
              취소
            </Button>
          </AlertModal.Cancel>
          <AlertModal.Action asChild>
            <Button
              variant='primary'
              className={styles.confirmButton}
              style={{ borderRadius: "0 0 1.2rem 0" }}
            >
              동의
            </Button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "description 없이 타이틀과 버튼만 표시되는 AlertModal입니다.",
      },
    },
  },
};

export const SingleButton: Story = {
  render: () => (
    <AlertModal.Root>
      <AlertModal.Trigger asChild>
        <Button>모달 열기</Button>
      </AlertModal.Trigger>
      <AlertModal.Content>
        <AlertModal.Header>
          <AlertModal.Title>알림</AlertModal.Title>
          <AlertModal.Description>
            작업이 완료되었습니다.
          </AlertModal.Description>
        </AlertModal.Header>
        <AlertModal.Footer>
          <AlertModal.Action asChild>
            <Button
              variant='primary'
              className={styles.confirmButton}
              style={{ borderRadius: "0 0 1.2rem 1.2rem" }}
            >
              확인
            </Button>
          </AlertModal.Action>
        </AlertModal.Footer>
      </AlertModal.Content>
    </AlertModal.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "확인 버튼만 있는 단순한 알림 모달입니다.",
      },
    },
  },
};
