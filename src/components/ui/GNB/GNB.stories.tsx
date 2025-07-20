import type { Meta, StoryObj } from "@storybook/nextjs";

import ChevronLeftIcon from "@/assets/chevron-left.svg";
import MenuIcon from "@/assets/menu.svg";
import SearchIcon from "@/assets/search.svg";

import { GNB } from "./GNB";

const meta: Meta<typeof GNB> = {
  title: "Components/GNB",
  component: GNB,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["center", "left"],
      description: "타이틀 정렬 방식 (center: 중앙, left: 좌측)",
    },
    background: {
      control: "select",
      options: ["white", "transparent"],
      description: "배경색 (white: 흰색, transparent: 투명)",
    },
    title: {
      control: "text",
      description: "GNB의 타이틀 요소 (예: 텍스트, 로고 아이콘 등)",
    },
    leftAddon: {
      control: false,
      description: "왼쪽에 들어갈 커스텀 요소 (예: 뒤로가기 버튼, 아이콘 등)",
    },
    rightAddon: {
      control: false,
      description: "오른쪽에 들어갈 커스텀 요소 (예: 설정 버튼, 아이콘 등)",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "GNB는 상단 네비게이션 바로, 타이틀과 좌우 Addon(버튼, 아이콘 등)을 유연하게 배치할 수 있습니다. align, background, leftAddon, rightAddon 등 다양한 props로 상황에 맞게 사용할 수 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GNB>;

export const Primary: Story = {
  args: {
    title: "타이틀",
    background: "white",
    leftAddon: <ChevronLeftIcon width={24} height={24} />,
    rightAddon: (
      <>
        <SearchIcon width={24} height={24} />
        <MenuIcon width={24} height={24} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "title, leftAddon, rightAddon(여러 아이콘), background 모두 포함된 기본 조합입니다. (모든 props 조합)",
      },
    },
  },
};

export const CenteredTitle: Story = {
  args: {
    title: "타이틀",
    align: "center",
  },
  parameters: {
    docs: {
      description: {
        story:
          "타이틀이 중앙에 위치한 기본 GNB입니다. (Centered title only)\n\n- title만 전달하면 중앙 정렬로 표시됩니다.",
      },
    },
  },
};

export const LeftAlignedTitle: Story = {
  args: {
    title: "타이틀",
    align: "left",
  },
  parameters: {
    docs: {
      description: {
        story:
          "타이틀이 좌측에 위치한 GNB입니다. (Left aligned title)\n\n- align='left'로 전달하면 좌측 정렬로 표시됩니다.",
      },
    },
  },
};

export const WithLeftAddon: Story = {
  args: {
    title: "타이틀",
    leftAddon: <ChevronLeftIcon width={24} height={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: "왼쪽에 아이콘(Addon)만 추가한 예시입니다.",
      },
    },
  },
};

export const WithRightAddon: Story = {
  args: {
    title: "타이틀",
    rightAddon: <MenuIcon width={24} height={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: "오른쪽에 아이콘(Addon)만 추가한 예시입니다.",
      },
    },
  },
};

export const WithBothAddons: Story = {
  args: {
    title: "타이틀",
    leftAddon: <ChevronLeftIcon width={24} height={24} />,
    rightAddon: <MenuIcon width={24} height={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: "좌우에 아이콘(Addon)을 모두 추가한 예시입니다.",
      },
    },
  },
};

export const TransparentBackground: Story = {
  args: {
    title: "타이틀",
    background: "transparent",
    leftAddon: <ChevronLeftIcon width={24} height={24} />,
    rightAddon: <MenuIcon width={24} height={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: "background prop을 'transparent'로 주면 배경이 투명해집니다.",
      },
    },
  },
};

export const NoTitle: Story = {
  args: {
    leftAddon: <ChevronLeftIcon width={24} height={24} />,
    rightAddon: <MenuIcon width={24} height={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: "타이틀 없이 좌우 Addon만 사용하는 경우입니다.",
      },
    },
  },
};

export const RightAddonMultipleIcons: Story = {
  args: {
    title: "타이틀",
    rightAddon: (
      <>
        <SearchIcon width={24} height={24} />
        <MenuIcon width={24} height={24} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "오른쪽에 여러 아이콘을 배치한 예시입니다.",
      },
    },
  },
};
