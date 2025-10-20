import * as AlertDialog from "@radix-ui/react-alert-dialog";
import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "../Button";
import { AlertModal } from "./AlertModal";
import * as styles from "./AlertModal.css";

const meta: Meta<typeof AlertModal> = {
  title: "Components/AlertModal",
  component: AlertModal,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "모달의 제목",
    },
    trigger: {
      control: false,
      description: "모달을 열기 위한 트리거(버튼 등, ReactNode)",
    },
    content: {
      control: false,
      description: "본문(설명 등, ReactNode)",
    },
    footer: {
      control: false,
      description:
        "하단 푸터(버튼 영역 등, ReactNode). Radix의 <AlertDialog.Cancel asChild> 또는 <AlertDialog.Action asChild>를 조합하여 사용.",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AlertModal은 사용자에게 확인/취소 액션을 요청할 때 사용하는 모달입니다. title, trigger, content, footer props를 지원합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Default: Story = {
  render: args => <AlertModal {...args} />,
  args: {
    title: "정말 삭제하시겠어요?",
    trigger: <Button>모달 열기</Button>,
    content: <div>삭제하면 복구할 수 없습니다.</div>,
    footer: (
      <>
        <AlertDialog.Cancel asChild>
          <Button
            variant='assistive'
            className={styles.cancelButton}
            style={{ borderRadius: "0 0 0 1.2rem" }}
          >
            취소
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action asChild>
          <Button
            variant='primary'
            className={styles.confirmButton}
            style={{ borderRadius: "0 0 1.2rem 0" }}
          >
            삭제
          </Button>
        </AlertDialog.Action>
      </>
    ),
  },
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
  render: args => <AlertModal {...args} />,
  args: {
    title: "약관을 동의하시겠습니까?",
    trigger: <Button>모달 열기</Button>,
    footer: (
      <>
        <AlertDialog.Cancel asChild>
          <Button
            variant='assistive'
            className={styles.cancelButton}
            style={{ borderRadius: "0 0 0 1.2rem" }}
          >
            취소
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action asChild>
          <Button
            variant='primary'
            className={styles.confirmButton}
            style={{ borderRadius: "0 0 1.2rem 0" }}
          >
            동의
          </Button>
        </AlertDialog.Action>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "description 없이 타이틀과 버튼만 표시되는 AlertModal입니다.",
      },
    },
  },
};
