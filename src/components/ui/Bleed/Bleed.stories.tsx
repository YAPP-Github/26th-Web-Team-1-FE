import type { Meta, StoryObj } from "@storybook/react";

import { Bleed } from "./Bleed";

const meta: Meta<typeof Bleed> = {
  title: "Components/Bleed",
  component: Bleed,
  tags: ["autodocs"],
  argTypes: {
    inline: {
      control: "number",
    },
    block: {
      control: "number",
    },
    inlineStart: {
      control: "number",
    },
    inlineEnd: {
      control: "number",
    },
    blockStart: {
      control: "number",
    },
    blockEnd: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Bleed>;

export const InlineBleed: Story = {
  render: () => (
    <div style={{ padding: "10px" }}>
      <Bleed inline={10}>
        <span>Hello</span>
        <span>World</span>
      </Bleed>
      <span>요거</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "인라인 블레드 컴포넌트입니다.",
      },
    },
  },
};

export const BlockBleed: Story = {
  render: () => (
    <div style={{ padding: "10px" }}>
      <Bleed block={10}>
        <span>Hello</span>
        <span>World</span>
      </Bleed>
      <span>요거</span>
    </div>
  ),
  args: {},
  parameters: {
    docs: {
      description: {
        story: "블럭 블레드 컴포넌트입니다.",
      },
    },
  },
};
