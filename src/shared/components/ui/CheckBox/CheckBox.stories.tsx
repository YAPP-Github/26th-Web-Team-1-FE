import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

import { CheckBox } from "./CheckBox";

const meta: Meta<typeof CheckBox> = {
  title: "Components/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "`checked`, `hasBackground`, `onCheckedChange` 등의 props를 통해 상태를 제어할 수 있습니다.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "체크박스의 체크 상태",
    },
    hasBackground: {
      control: "boolean",
      description: "배경색 포함 여부",
    },
    onCheckedChange: {
      action: "onCheckedChange",
      description: "체크 상태 변경 시 호출되는 콜백",
    },
    className: { table: { disable: true } },
  },
  args: {
    checked: false,
    hasBackground: true,
  },
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

const InteractiveCheckBox = (args: Story["args"]) => {
  const [isChecked, setIsChecked] = useState(args?.checked ?? false);

  return (
    <CheckBox
      {...args}
      checked={isChecked}
      onCheckedChange={checked => {
        setIsChecked(checked);
        args?.onCheckedChange?.(checked);
      }}
    />
  );
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Default CheckBox 컴포넌트입니다. `hasBackground`가 `true`이며, 체크되지 않은 상태입니다.",
      },
    },
  },
  render: InteractiveCheckBox,
};

export const NoBackground: Story = {
  args: {
    hasBackground: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`hasBackground` prop을 `false`로 설정하여 배경이 없는 스타일을 적용한 예시입니다.",
      },
    },
  },
  render: InteractiveCheckBox,
};
