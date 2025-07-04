import type { Meta, StoryObj } from "@storybook/react";

import { HStack, VStack } from "./Stack";

const meta: Meta<typeof HStack> = {
  title: "Components/Stack",
  component: HStack,
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "reverse"],
    },
    gap: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HStack>;

export const HorizontalStack: Story = {
  render: args => (
    <>
      <HStack {...args}>
        <span>Hello</span>
        <span>World</span>
      </HStack>
    </>
  ),
  args: {
    justify: "start",
    align: "start",
    wrap: "nowrap",
    gap: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "수평 스택 컴포넌트입니다.",
      },
    },
  },
};

export const VerticalStack: Story = {
  render: args => (
    <>
      <VStack {...args}>
        <span>Hello</span>
        <span>World</span>
      </VStack>
    </>
  ),
  args: {
    justify: "start",
    align: "start",
    wrap: "nowrap",
    gap: 10,
  },
  parameters: {
    docs: {
      description: {
        story: "수직 스택 컴포넌트입니다.",
      },
    },
  },
};
