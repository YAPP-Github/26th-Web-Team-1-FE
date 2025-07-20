import type { Meta, StoryObj } from "@storybook/nextjs";

import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Skeleton 컴포넌트는 로딩 상태를 시각적으로 표시하기 위한 사각형 스켈레톤 UI입니다. width, height, radius를 지정할 수 있습니다.",
      },
    },
  },
  argTypes: {
    width: {
      control: "number",
      description: "스켈레톤의 너비 (px)",
    },
    height: {
      control: "number",
      description: "스켈레톤의 높이 (px)",
    },
    radius: {
      control: "text",
      description: "스켈레톤의 border-radius (px 또는 string)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: args => <Skeleton {...args} />,
  args: {
    width: 120,
    height: 24,
    radius: 8,
  },
};

export const CustomRadius: Story = {
  render: args => <Skeleton {...args} />,
  args: {
    width: 120,
    height: 24,
    radius: "50%",
  },
};

export const VariousSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Skeleton width={40} height={40} radius={20} />
      <Skeleton width={80} height={16} radius={4} />
      <Skeleton width={120} height={24} radius={8} />
      <Skeleton width={200} height={32} radius={16} />
    </div>
  ),
};
