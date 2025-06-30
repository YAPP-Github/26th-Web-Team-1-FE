import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../Button";
import { BottomSheet } from "./BottomSheet";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  argTypes: {
    open: { table: { disable: true } },
    title: { control: "text" },
    trigger: { control: false },
    footer: { control: false },
    children: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof BottomSheet>;

const BottomSheetWrapper = (
  args: React.ComponentProps<typeof BottomSheet> & {
    children?: React.ReactNode;
    footer?: React.ReactNode;
  }
) => {
  const [isOpen, setIsOpen] = useState(args.open || false);

  return (
    <BottomSheet
      {...args}
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button variant='primary' onClick={() => setIsOpen(true)}>
          바텀시트 열기
        </Button>
      }
    >
      {args.children}
    </BottomSheet>
  );
};

export const Default: Story = {
  render: args => (
    <BottomSheetWrapper
      {...args}
      title='서비스 필수 이용약관'
      footer={
        <Button size='fullWidth' onClick={() => alert("동의합니다")}>
          동의하고 계속하기
        </Button>
      }
    >
      <p>버튼을 클릭하면 바텀시트가 열리고, 여기엔 기본 설명이 표시됩니다.</p>
    </BottomSheetWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "버튼을 클릭하면 바텀시트가 열리고, 하단에 footer 버튼이 렌더링됩니다.",
      },
    },
  },
};

export const Opened: Story = {
  render: (args, { viewMode }) => {
    const forceClosedInDocs = viewMode === "docs";
    return (
      <BottomSheetWrapper
        {...args}
        open={forceClosedInDocs ? false : args.open}
        title='즉시 열리는 바텀시트'
        footer={
          <Button size='fullWidth' onClick={() => alert("닫기")}>
            확인
          </Button>
        }
      >
        <p className='text-[15px] leading-[22px] tracking-[0.0096em] font-normal text-gray-500'>
          이 스토리는 Canvas에서 열린 상태로 시작되며, Docs에서는 닫혀있습니다.
        </p>
      </BottomSheetWrapper>
    );
  },
  args: {
    open: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canvas에선 열린 상태로 시작되며, 하단에 버튼이 함께 표시됩니다.",
      },
    },
  },
};
