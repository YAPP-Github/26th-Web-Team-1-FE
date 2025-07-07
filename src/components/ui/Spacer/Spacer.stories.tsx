import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Stack } from "../Stack";
import { Text } from "../Text";
import { Spacer } from "./Spacer";

const meta: Meta<typeof Spacer> = {
  title: "Components/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Spacer 컴포넌트는 UI 요소들 사이에 시각적인 간격을 만들기 위해 사용됩니다. `size`와 `direction` prop을 통해 간격의 크기와 방향(수직/수평)을 조절할 수 있습니다. 레이아웃의 유연성을 높이고 일관된 간격 시스템을 유지하는 데 도움이 됩니다.",
      },
    },
  },
  argTypes: {
    size: {
      control: "number",
      description: "간격의 크기를 설정합니다. `rem` 단위로 변환됩니다.",
      table: {
        type: { summary: "number | string" },
        defaultValue: { summary: "0" },
      },
    },
    direction: {
      control: "radio",
      options: ["vertical", "horizontal"],
      description: "간격의 방향을 설정합니다.",
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: "vertical" },
      },
    },
    as: {
      control: false,
      description: "컴포넌트의 HTML 태그를 설정합니다.",
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: "span" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const Vertical: Story = {
  render: args => (
    <Stack direction='column'>
      <Text>첫 번째 문단입니다.</Text>
      <Spacer {...args} />
      <Text>Spacer 위에 있는 두 번째 문단입니다.</Text>
    </Stack>
  ),
  args: {
    size: 20,
    direction: "vertical",
  },
  parameters: {
    docs: {
      description: {
        story: "수직 방향으로 간격을 만듭니다 (`direction: 'vertical'`).",
      },
    },
  },
};

export const Horizontal: Story = {
  render: args => (
    <Stack direction='row' align='center'>
      <Text>왼쪽 텍스트</Text>
      <Spacer {...args} />
      <Text>오른쪽 텍스트</Text>
    </Stack>
  ),
  args: {
    size: 20,
    direction: "horizontal",
  },
  parameters: {
    docs: {
      description: {
        story: "수평 방향으로 간격을 만듭니다 (`direction: 'horizontal'`).",
      },
    },
  },
};
