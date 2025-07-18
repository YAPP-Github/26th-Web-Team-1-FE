import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

import { Button } from "../Button";
import { AlertModal, type AlertModalProps } from "./AlertModal";

const meta: Meta<typeof AlertModal> = {
  title: "Components/AlertModal",
  component: AlertModal,
  tags: ["autodocs"],
  argTypes: {
    open: { control: false },
    onOpenChange: { control: false },
    title: { control: "text", description: "모달의 타이틀" },
    description: { control: "text", description: "모달의 서브 설명" },
    confirmLabel: { control: "text", description: "확인 버튼 라벨" },
    cancelLabel: { control: "text", description: "취소 버튼 라벨" },
    onConfirm: { action: "onConfirm", description: "확인 버튼 클릭 시 콜백" },
    onCancel: { action: "onCancel", description: "취소 버튼 클릭 시 콜백" },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AlertModal은 사용자에게 확인/취소 액션을 요청할 때 사용하는 모달입니다. title, description, confirmLabel, cancelLabel, onConfirm, onCancel 등을 지원합니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

const AlertModalTemplate = (args: Partial<AlertModalProps>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>모달 열기</Button>
      <AlertModal {...args} open={open} onOpenChange={setOpen} />
    </>
  );
};

export const Default: Story = {
  render: args => <AlertModalTemplate {...args} />,
  args: {
    title: "정말 삭제하시겠어요?",
    description: "삭제 후에는 복구할 수 없습니다.",
    confirmLabel: "삭제",
    cancelLabel: "취소",
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
  render: args => <AlertModalTemplate {...args} />,
  args: {
    title: "약관을 동의하시겠습니까?",
    confirmLabel: "동의",
    cancelLabel: "취소",
  },
  parameters: {
    docs: {
      description: {
        story: "description 없이 타이틀과 버튼만 표시되는 AlertModal입니다.",
      },
    },
  },
};

export const AsyncConfirm: Story = {
  render: args => {
    const AsyncTemplate = () => {
      const [open, setOpen] = useState(false);
      const [loading, setLoading] = useState(false);

      const handleConfirm = async () => {
        setLoading(true);
        await new Promise(res => setTimeout(res, 1500));
        setLoading(false);
        setOpen(false);
        alert("비동기 작업 완료!");
      };

      return (
        <>
          <Button onClick={() => setOpen(true)}>모달 열기</Button>
          <AlertModal
            {...args}
            open={open}
            onOpenChange={setOpen}
            onConfirm={handleConfirm}
            confirmLabel={loading ? "처리 중..." : args.confirmLabel}
          />
        </>
      );
    };

    return <AsyncTemplate />;
  },
  args: {
    title: "비동기 확인 예시",
    description: "확인 버튼 클릭 시 비동기 작업을 실행합니다.",
    confirmLabel: "확인",
    cancelLabel: "취소",
  },
  parameters: {
    docs: {
      description: {
        story:
          "확인 버튼 클릭 시 비동기 작업을 수행하는 AlertModal 예시입니다. 버튼 라벨이 로딩 상태로 변경됩니다.",
      },
    },
  },
};
