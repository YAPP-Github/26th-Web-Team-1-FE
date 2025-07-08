import type { Meta, StoryObj } from "@storybook/nextjs";
import { type ComponentProps } from "react";

import ClearIcon from "@/assets/circle-clear.svg";

import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["inactive", "negative"],
    },
    helperText: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

const TextFieldWrapper = ({
  status,
  label,
  helperText,
  placeholder,
  disabled,
  value,
  onChange,
}: ComponentProps<typeof TextField>) => {
  return (
    <TextField
      label={label}
      status={status}
      helperText={helperText}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      rightAddon={value && !disabled ? <ClearIcon /> : null}
    />
  );
};

export const Inactive: Story = {
  render: args => <TextFieldWrapper {...args} />,
  args: {
    label: "닉네임",
    placeholder: "닉네임을 입력해 주세요.",
    helperText: "2~10자 이내로 입력해주세요.",
    status: "inactive",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 상태의 텍스트 필드입니다. 입력값이 없거나 정상적인 입력일 경우 사용됩니다.",
      },
    },
  },
};

export const Negative: Story = {
  render: args => <TextFieldWrapper {...args} />,
  args: {
    label: "닉네임",
    placeholder: "닉네임을 입력해 주세요.",
    helperText: "닉네임은 10자 이내로 입력해주세요.",
    status: "negative",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "에러 상태의 텍스트 필드입니다. 유효성 검사 실패 등 부정적인 피드백을 제공할 때 사용됩니다.",
      },
    },
  },
};
