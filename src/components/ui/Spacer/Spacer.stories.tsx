import type { Meta, StoryObj } from "@storybook/react";

import { HStack, VStack } from "../Stack/Stack";
import { Spacer } from "./Spacer";

const meta: Meta<typeof Spacer> = {
  title: "Components/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "number",
    },
    direction: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const HorizontalSpacer: Story = {
  render: ({ size, direction }) => (
    <>
      <HStack justify='start' align='start' wrap='nowrap' gap={10}>
        <span>Hello</span>
        <Spacer size={size} direction={direction} />
        <span>World</span>
      </HStack>
    </>
  ),
  args: {
    size: 10,
    direction: "horizontal",
  },
  parameters: {
    docs: {
      description: {
        story: "수평 여백 컴포넌트입니다.",
      },
    },
  },
};

export const VerticalSpacer: Story = {
  render: ({ size, direction }) => (
    <>
      <VStack justify='start' align='start' wrap='nowrap' gap={10}>
        <span>Hello</span>
        <Spacer size={size} direction={direction} />
        <span>World</span>
      </VStack>
    </>
  ),
  args: {
    size: 10,
    direction: "vertical",
  },
  parameters: {
    docs: {
      description: {
        story: "수직 여백 컴포넌트입니다.",
      },
    },
  },
};
