import type { Meta, StoryObj } from "@storybook/react";

import { Bleed } from "./Bleed";

const meta: Meta<typeof Bleed> = {
  title: "Components/Bleed",
  component: Bleed,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Bleed 컴포넌트는 부모 요소의 여백(padding)을 무시하고 특정 방향으로 확장되어야 하는 UI를 구현할 때 사용됩니다. 이를 통해 페이지나 섹션의 전체 너비를 차지하는 컴포넌트를 쉽게 만들 수 있습니다.",
      },
    },
  },
  argTypes: {
    as: {
      control: false,
      description: "컴포넌트의 HTML 태그를 설정합니다.",
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: "div" },
      },
    },
    inline: {
      control: "number",
      description:
        "좌우 여백을 설정합니다. `inlineStart`와 `inlineEnd`를 동시에 설정합니다.",
      table: {
        type: { summary: "number | string" },
      },
    },
    block: {
      control: "number",
      description:
        "상하 여백을 설정합니다. `blockStart`와 `blockEnd`를 동시에 설정합니다.",
      table: {
        type: { summary: "number | string" },
      },
    },
    inlineStart: {
      control: "number",
      description: "시작 방향(LTR 환경에서는 왼쪽)의 여백을 설정합니다.",
      table: {
        type: { summary: "number | string" },
      },
    },
    inlineEnd: {
      control: "number",
      description: "끝 방향(LTR 환경에서는 오른쪽)의 여백을 설정합니다.",
      table: {
        type: { summary: "number | string" },
      },
    },
    blockStart: {
      control: "number",
      description: "위쪽 여백을 설정합니다.",
      table: {
        type: { summary: "number | string" },
      },
    },
    blockEnd: {
      control: "number",
      description: "아래쪽 여백을 설정합니다.",
      table: {
        type: { summary: "number | string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Bleed>;

export const InlineBleed: Story = {
  render: () => (
    <div
      style={{
        padding: "16px",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        width: "300px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          padding: "12px",
          textAlign: "center",
        }}
      >
        컨텐츠 영역
      </div>
      <Bleed inline={16}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            padding: "12px",
            textAlign: "center",
          }}
        >
          Bleed 영역
        </div>
      </Bleed>
      <div
        style={{
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          padding: "12px",
          textAlign: "center",
          marginTop: "8px",
        }}
      >
        컨텐츠 영역
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`inline` prop을 사용하여 좌우로 확장된 컴포넌트입니다. 부모 요소의 `padding`을 무시하고 좌우로 확장됩니다. 붉은 영역이 부모의 padding 영역을 시각화합니다.",
      },
    },
  },
};

export const BlockBleed: Story = {
  render: () => (
    <div
      style={{
        padding: "16px",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          padding: "12px",
          textAlign: "center",
        }}
      >
        컨텐츠 영역
      </div>
      <Bleed block={16}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            padding: "12px",
            textAlign: "center",
          }}
        >
          Bleed 영역
        </div>
      </Bleed>
      <div
        style={{
          backgroundColor: "rgba(0, 255, 0, 0.1)",
          padding: "12px",
          textAlign: "center",
          marginTop: "8px",
        }}
      >
        컨텐츠 영역
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`block` prop을 사용하여 상하로 확장된 컴포넌트입니다. 부모 요소의 `padding`을 무시하고 상하로 확장됩니다. 붉은 영역이 부모의 padding 영역을 시각화합니다.",
      },
    },
  },
};

export const AllDirectionsBleed: Story = {
  render: () => (
    <div
      style={{
        padding: "16px",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
      }}
    >
      <Bleed inline={16} block={16}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            padding: "12px",
            textAlign: "center",
          }}
        >
          Bleed 영역
        </div>
      </Bleed>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`inline`과 `block` prop을 모두 사용하여 모든 방향으로 확장된 컴포넌트입니다.",
      },
    },
  },
};
