import type { Meta, StoryObj } from "@storybook/nextjs";

import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs.Root> = {
  title: "Components/Tabs",
  component: Tabs.Root,
  tags: ["autodocs"],
  argTypes: {
    triggerLayout: {
      control: { type: "radio" },
      options: ["content", "equal"],
      description: "트리거의 레이아웃 방식을 설정합니다.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Tabs는 탭 메뉴를 구현할 때 사용합니다. triggerLayout prop으로 트리거의 레이아웃을 제어할 수 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

export const Default: Story = {
  args: {
    defaultValue: "tab1",
    triggerLayout: "content",
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본 탭 컴포넌트입니다. triggerLayout을 'content'로 설정하면 트리거가 컨텐츠 크기만큼 차지하고 사이에 gap이 있습니다.",
      },
    },
  },
  render: args => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value='tab1'>Tab 1</Tabs.Trigger>
        <Tabs.Trigger value='tab2'>Tab 2</Tabs.Trigger>
        <Tabs.Trigger value='tab3'>Tab 3</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  ),
};

export const EqualLayout: Story = {
  args: {
    defaultValue: "tab1",
    triggerLayout: "equal",
  },
  parameters: {
    docs: {
      description: {
        story:
          "triggerLayout을 'equal'로 설정하면 트리거들이 균등하게 분할되어 gap 없이 전체 너비를 차지합니다.",
      },
    },
  },
  render: args => (
    <Tabs.Root {...args}>
      <Tabs.List>
        <Tabs.Trigger value='tab1'>Short</Tabs.Trigger>
        <Tabs.Trigger value='tab2'>Medium Tab</Tabs.Trigger>
        <Tabs.Trigger value='tab3'>Very Long Tab Name</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  ),
};
