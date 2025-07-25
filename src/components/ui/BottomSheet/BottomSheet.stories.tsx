import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

import { Button } from "../Button";
import { Text } from "../Text";
import { BottomSheet } from "./BottomSheet";

const meta: Meta<typeof BottomSheet.Root> = {
  title: "Components/BottomSheet",
  component: BottomSheet.Root,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof BottomSheet.Root>;

const BottomSheetWrapper = ({
  defaultOpen = false,
  title = "서비스 필수 이용 약관",
  bodyText = "회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고 있습니다.",
  confirmText = "동의하고 계속하기",
}: {
  defaultOpen?: boolean;
  title?: string;
  bodyText?: string;
  confirmText?: string;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <BottomSheet.Root open={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger>
        <Button variant='primary' onClick={() => setIsOpen(true)}>
          바텀시트 열기
        </Button>
      </BottomSheet.Trigger>

      <BottomSheet.Content>
        <BottomSheet.Title>
          <Text typo='title3Sb'>{title}</Text>
        </BottomSheet.Title>

        <BottomSheet.Body>
          <Text>{bodyText}</Text>
        </BottomSheet.Body>

        <BottomSheet.Footer>
          <Button size='fullWidth' onClick={() => setIsOpen(false)}>
            {confirmText}
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};

export const Default: Story = {
  render: () => (
    <BottomSheetWrapper
      defaultOpen={false}
      title='서비스 필수 이용 약관'
      bodyText={`회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고 있습니다.
동일한 설명이 반복되어 내용이 길어지면, Body 영역에 scroll이 적용됩니다.`}
      confirmText='동의하고 계속하기'
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Trigger 버튼을 클릭하면 BottomSheet가 열리고 Title/Body/Footer가 표시됩니다.",
      },
    },
  },
};

export const Opened: Story = {
  render: (_, { viewMode }) => {
    const forceClosedInDocs = viewMode === "docs";

    return (
      <BottomSheetWrapper
        defaultOpen={!forceClosedInDocs}
        title='즉시 열리는 바텀시트'
        bodyText='회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고 있습니다.'
        confirmText='확인'
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canvas에선 열린 상태로 시작되며, 닫기 버튼을 통해 닫을 수 있습니다.",
      },
    },
  },
};
