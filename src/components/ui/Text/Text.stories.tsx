import type { Meta, StoryObj } from "@storybook/react";

import { typography } from "@/styles/typography.css";

import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    typo: {
      control: "select",
      options: Object.keys(typography),
    },
    children: {
      control: "text",
      description: "텍스트 내용",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Inactive: Story = {
  render: args => (
    <>
      <Text {...args} />
      <Text {...args} color='neutral.99' />
      <Text {...args} color='neutral.20' />
      <Text {...args} color='text.primary' />
      <Text {...args} color='text.neutral' />
      <Text {...args} color='text.alternative' />
      <Text as='p' typo='body2' color='neutral.10'>
        body2
      </Text>
    </>
  ),
  args: {
    typo: "body1",
    children: "Hello",
  },
  parameters: {
    docs: {
      description: {
        story: "기본 상태의 텍스트입니다.",
      },
    },
  },
};
