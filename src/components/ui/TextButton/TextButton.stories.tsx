import type { Meta, StoryObj } from "@storybook/nextjs";

import ChevronLeftIcon from "@/assets/chevron-left.svg";

import { TextButton } from "./TextButton";

const meta: Meta<typeof TextButton> = {
  title: "Components/TextButton",
  component: TextButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "assistive", "custom"],
      description: "버튼 색상 타입 (primary, assistive, custom)",
    },
    size: {
      control: "select",
      options: ["medium", "small"],
      description: "버튼 크기 (medium, small)",
    },
    leftAddon: {
      control: false,
      description: "왼쪽에 들어갈 아이콘 등 커스텀 요소",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "텍스트 버튼 컴포넌트입니다. variant, size, leftAddon, disabled 등 다양한 조합을 지원합니다.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TextButton>;

export const Primary: Story = {
  args: {
    children: "기본 텍스트 버튼",
    variant: "primary",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story: "기본(primary) 텍스트 버튼입니다.",
      },
    },
  },
};

export const Assistive: Story = {
  args: {
    children: "보조 텍스트 버튼",
    variant: "assistive",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story: "보조(assistive) 색상의 텍스트 버튼입니다.",
      },
    },
  },
};

export const Custom: Story = {
  args: {
    children: "커스텀 텍스트 버튼",
    variant: "custom",
    size: "medium",
  },
  parameters: {
    docs: {
      description: {
        story:
          "custom variant는 색상 스타일을 직접 오버라이드할 때 사용합니다.",
      },
    },
  },
};

export const Small: Story = {
  args: {
    children: "작은 텍스트 버튼",
    variant: "primary",
    size: "small",
  },
  parameters: {
    docs: {
      description: {
        story: "작은 크기(small)의 텍스트 버튼입니다.",
      },
    },
  },
};

export const WithLeftAddon: Story = {
  args: {
    children: "아이콘 + 텍스트",
    variant: "primary",
    size: "medium",
    leftAddon: <ChevronLeftIcon width={20} height={20} />,
  },
  parameters: {
    docs: {
      description: {
        story: "왼쪽에 아이콘(leftAddon)이 추가된 텍스트 버튼입니다.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    children: "비활성화 텍스트 버튼",
    variant: "primary",
    size: "medium",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "비활성화(disabled) 상태의 텍스트 버튼입니다.",
      },
    },
  },
};
