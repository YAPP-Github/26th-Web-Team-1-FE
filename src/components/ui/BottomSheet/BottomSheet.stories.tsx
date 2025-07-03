import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Button } from "../Button";
import { BottomSheet } from "./BottomSheet";
import * as styles from "./BottomSheet.css";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  argTypes: {
    open: { table: { disable: true } },
    title: { control: "text" },
    trigger: { control: false },
    footer: { control: false },
    content: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof BottomSheet>;

const BottomSheetWrapper = (
  args: React.ComponentProps<typeof BottomSheet> & {
    content?: React.ReactNode;
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
      content={args.content}
    />
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
      content={
        <>
          <h2 className={styles.sheetBodyTitle}>비밀번호를 변경해 안내 설명</h2>
          <p className={styles.sheetBodyDescription}>
            회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인 경우
            비밀번호 변경을 안내해 드리고 있습니다. 회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인
            경우 비밀번호 변경을 안내해 드리고 있습니다.회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인
            경우 비밀번호 변경을 안내해 드리고 있습니다.회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인
            경우 비밀번호 변경을 안내해 드리고 있습니다.회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인
            경우 비밀번호 변경을 안내해 드리고 있습니다.회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인
            경우 비밀번호 변경을 안내해 드리고 있습니다.회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인
            경우 비밀번호 변경을 안내해 드리고 있습니다.회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인
            경우 비밀번호 변경을 안내해 드리고 있습니다.회원님의 개인정보 보호를
            위해 장기간 비밀번호를 유지 중인 경우 비밀번호 변경을 안내해 드리고
            있습니다.
          </p>
        </>
      }
    />
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
        content={
          <>
            <h2 className={styles.sheetBodyTitle}>
              비밀번호를 변경해 안내 설명
            </h2>
            <p className={styles.sheetBodyDescription}>
              회원님의 개인정보 보호를 위해 장기간 비밀번호를 유지 중인 경우
              비밀번호 변경을 안내해 드리고 있습니다.
            </p>
          </>
        }
      />
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
