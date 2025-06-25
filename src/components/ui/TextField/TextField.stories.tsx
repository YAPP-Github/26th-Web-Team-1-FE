import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    title: "Title",
    placeholder: "텍스트를 입력해 주세요.",
    helperText: "보조 메세지입니다.",
    disabled: false,
  },
  argTypes: {
    value: {
      control: "text",
    },
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
    onChange: { action: "changed" },
  },
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Inactive: Story = {
  render: args => <TextFieldWithHooks {...args} />,
};

export const Negative: Story = {
  render: args => <TextFieldWithHooks {...args} />,
  args: {
    status: "negative",
    value: "텍스트를 입력해 주세요.",
    helperText: "에러 메시지입니다.",
  },
};

const TextFieldWithHooks = (args: React.ComponentProps<typeof TextField>) => {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <TextField
      {...args}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};
