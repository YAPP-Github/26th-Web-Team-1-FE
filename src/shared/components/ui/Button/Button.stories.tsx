import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "텍스트",
  },
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["primary", "dark", "assistive", "disabled"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large", "fullWidth"],
    },
    disabled: {
      control: "boolean",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "medium",
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
    size: "medium",
  },
};

export const Assistive: Story = {
  args: {
    variant: "assistive",
    size: "medium",
  },
};

export const Sizes: Story = {
  render: args => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button {...args} size='small' />
      <Button {...args} size='medium' />
      <Button {...args} size='large' />
      <Button {...args} size='fullWidth' />
    </div>
  ),
};
