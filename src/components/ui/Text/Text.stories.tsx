import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Fragment } from "react";

import { typography } from "@/styles/typography.css";

import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text 컴포넌트는 일관된 타이포그래피 시스템을 적용하기 위한 핵심 요소입니다.\n\n `typo` prop을 통해 미리 정의된 스타일을 쉽게 적용할 수 있으며, `color` prop으로 디자인 시스템의 색상 토큰을 사용하거나 직접 색상을 지정할 수 있습니다. `as` prop을 이용해 시맨틱적으로 올바른 HTML 태그로 렌더링할 수 있습니다.",
      },
    },
  },
  argTypes: {
    typo: {
      control: "select",
      options: Object.keys(typography),
      description: "미리 정의된 타이포그래피 스타일을 적용합니다.",
      table: {
        type: { summary: "keyof typeof typography" },
        defaultValue: { summary: "body1Sb" },
      },
    },
    color: {
      control: "text",
      description:
        "텍스트 색상을 설정합니다. 디자인 시스템의 색상 토큰(예: 'neutral.10', 'text.primary') 또는 CSS 색상 값(예: '#FF0000', 'rgb(0,0,255)')을 사용할 수 있습니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "neutral.10" },
      },
    },
    as: {
      control: "text",
      description:
        "컴포넌트의 HTML 태그를 설정합니다. SEO와 웹 접근성을 위해 의미에 맞는 태그를 사용하세요.",
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: "p" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "이것은 기본 텍스트입니다.",
    typo: "body1Sb",
    color: "neutral.10",
  },
};

export const AllTypographies: Story = {
  render: () => (
    <div>
      {Object.keys(typography).map(typo => (
        <Fragment key={typo}>
          <Text as='p' typo={typo as keyof typeof typography}>
            {`${typo}`}
          </Text>
        </Fragment>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "디자인 시스템에 정의된 모든 타이포그래피 스타일을 보여줍니다.",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div>
      <Text color='text.primary'>Primary Text (text.primary)</Text>
      <Text color='text.secondary'>Secondary Text (text.secondary)</Text>
      <Text color='text.alternative'>Alternative Text (text.alternative)</Text>
      <Text color='blue.50'>Blue 50 (blue.50)</Text>
      <Text color='#FF5733'>Custom Color (#FF5733)</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "미리 정의된 색상 토큰 또는 커스텀 CSS 색상 값을 사용하여 텍스트 색상을 지정할 수 있습니다.",
      },
    },
  },
};

export const AsHeading: Story = {
  render: () => (
    <div>
      <Text as='h1' typo='title1Bd'>
        이것은 H1 태그입니다. (typo: title1)
      </Text>
      <Text as='h2' typo='title2Sb'>
        이것은 H2 태그입니다. (typo: title2)
      </Text>
      <Text as='span' typo='body1Sb'>
        이것은 SPAN 태그입니다.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`as` prop을 사용하여 시맨틱한 HTML 태그로 렌더링할 수 있습니다. 스타일은 `typo` prop에 의해 결정됩니다.",
      },
    },
  },
};
