import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

import { Indicator } from "./Indicator";

const meta: Meta<typeof Indicator> = {
  title: "Components/Indicator",
  component: Indicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Indicator 컴포넌트는 현재 단계를 시각적으로 보여주는 도트 UI입니다. 도트 클릭 시 콜백을 통해 인덱스를 전달할 수 있습니다.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Indicator>;

const InteractiveIndicator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCount = 4;

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f8f8f8" }}>
      <Indicator
        totalCount={totalCount}
        currentIndex={currentIndex}
        onClickDot={index => setCurrentIndex(index)}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveIndicator />,
  parameters: {
    docs: {
      description: {
        story:
          "총 4개의 도트 중 현재 선택된 인덱스를 반영하여 스타일이 변경됩니다.",
      },
    },
  },
};
