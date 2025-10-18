import type { Meta, StoryObj } from "@storybook/nextjs";
import { Fragment } from "react";

import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Stack 컴포넌트는 Flexbox 레이아웃을 쉽게 만들기 위한 유틸리티 컴포넌트입니다. 자식 요소들을 수직 또는 수평으로 정렬하고 간격, 맞춤, 줄 바꿈 등을 제어할 수 있습니다. `HStack`과 `VStack`은 `Stack` 컴포넌트의 `direction`을 각각 `row`와 `column`으로 고정한 단축형 컴포넌트입니다.",
      },
    },
  },
  argTypes: {
    direction: {
      control: "radio",
      options: ["row", "column"],
      description: "자식 요소들의 정렬 방향을 설정합니다.",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
      description: "주축(main-axis) 방향으로 자식 요소들을 정렬합니다.",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch", "baseline"],
      description: "교차축(cross-axis) 방향으로 자식 요소들을 정렬합니다.",
    },
    wrap: {
      control: "radio",
      options: ["nowrap", "wrap", "reverse"],
      description: "자식 요소들의 줄 바꿈 동작을 설정합니다.",
    },
    gap: {
      control: "number",
      description:
        "자식 요소들 사이의 간격을 설정합니다. `rem` 단위로 변환됩니다.",
    },
    as: {
      control: false,
      description: "컴포넌트의 HTML 태그를 설정합니다.",
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: "div" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "60px",
      height: "60px",
      backgroundColor: "rgba(0, 123, 255, 0.5)",
      color: "white",
      borderRadius: "4px",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  render: args => (
    <Stack {...args}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
    </Stack>
  ),
  args: {
    direction: "row",
    gap: 8,
  },
};

export const Justify: Story = {
  render: args => (
    <Stack direction='column' gap={16}>
      {(["start", "center", "end", "between"] as const).map(justify => (
        <Fragment key={justify}>
          <p>{`justify: "${justify}"`}</p>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
            }}
          >
            <Stack {...args} justify={justify}>
              <Box>1</Box>
              <Box>2</Box>
              <Box>3</Box>
            </Stack>
          </div>
        </Fragment>
      ))}
    </Stack>
  ),
  args: {
    direction: "row",
    gap: 8,
  },
};

export const Align: Story = {
  render: args => (
    <Stack direction='column' gap={16}>
      {(["start", "center", "end", "stretch"] as const).map(align => (
        <Fragment key={align}>
          <p>{`align: "${align}"`}</p>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              borderRadius: "4px",
              minHeight: "80px",
            }}
          >
            <Stack {...args} align={align}>
              <Box>1</Box>
              <Box style={{ height: "40px" }}>2</Box>
              <Box>3</Box>
            </Stack>
          </div>
        </Fragment>
      ))}
    </Stack>
  ),
  args: {
    direction: "row",
    gap: 8,
  },
};

export const Wrap: Story = {
  render: args => (
    <div
      style={{
        width: "200px",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: "4px",
      }}
    >
      <Stack {...args}>
        {Array.from({ length: 5 }, (_, i) => (
          <Box key={i}>{i + 1}</Box>
        ))}
      </Stack>
    </div>
  ),
  args: {
    direction: "row",
    wrap: "wrap",
    gap: 8,
  },
};
