import type { Meta, StoryObj } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import { TextField } from "./TextField";
// import ClearIcon from "@/assets/Clear.svg";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    label: "닉네임",
    placeholder: "닉네임을 입력해 주세요.",
    helperText: "2~10자 이내로 입력해주세요.",
    disabled: false,
  },
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

const StoryWrapper = (args: React.ComponentProps<typeof TextField>) => {
  const methods = useForm({
    defaultValues: { nickname: "" },
  });
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      <TextField
        {...args}
        name='nickname'
        control={control}
        // rightIcon={<ClearIcon />}
      />
    </FormProvider>
  );
};

export const Inactive: Story = {
  render: args => <StoryWrapper {...args} />,
};

export const Negative: Story = {
  render: args => <StoryWrapper {...args} />,
  args: {
    status: "negative",
    helperText: "닉네임은 10자 이내로 입력해주세요.",
  },
};
