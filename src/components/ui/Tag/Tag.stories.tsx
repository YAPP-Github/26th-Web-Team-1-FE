import type { Meta, StoryObj } from "@storybook/nextjs";
import Image from "next/image";
import React from "react";

import {
  ALL_TAGS,
  ATMOSPHERE_TAGS,
  UTILITY_TAGS,
} from "@/constants/tag.constants";

import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "primaryLow", "assistive"],
    },
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Tag size='small' variant='primary'>
          Small Primary
        </Tag>
        <Tag size='small' variant='primaryLow'>
          Small PrimaryLow
        </Tag>
        <Tag size='small' variant='assistive'>
          Small Assistive
        </Tag>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Tag size='large' variant='primary'>
          Large Primary
        </Tag>
        <Tag size='large' variant='primaryLow'>
          Large PrimaryLow
        </Tag>
        <Tag size='large' variant='assistive'>
          Large Assistive
        </Tag>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tag 컴포넌트의 모든 variant와 size 조합을 보여줍니다.",
      },
    },
  },
};

export const AtmosphereTags: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        maxWidth: "600px",
      }}
    >
      {ATMOSPHERE_TAGS.map(tag => (
        <Tag key={tag.name} size='small' variant='assistive'>
          <Image
            src={tag.iconUrl}
            alt={tag.label}
            width={14}
            height={14}
            style={{ marginRight: "0.4rem" }}
          />
          {tag.label}
        </Tag>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "분위기 관련 태그들을 Tag 컴포넌트로 표시합니다.",
      },
    },
  },
};

export const UtilityTags: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        maxWidth: "600px",
      }}
    >
      {UTILITY_TAGS.map(tag => (
        <Tag key={tag.name} size='small' variant='assistive'>
          <Image
            src={tag.iconUrl}
            alt={tag.label}
            width={14}
            height={14}
            style={{ marginRight: "0.4rem" }}
          />
          {tag.label}
        </Tag>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "편의시설 관련 태그들을 Tag 컴포넌트로 표시합니다.",
      },
    },
  },
};

export const AllTags: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        maxWidth: "800px",
      }}
    >
      {ALL_TAGS.map(tag => (
        <Tag key={tag.name} size='small' variant='assistive'>
          <Image
            src={tag.iconUrl}
            alt={tag.label}
            width={14}
            height={14}
            style={{ marginRight: "0.4rem" }}
          />
          {tag.label}
        </Tag>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "모든 태그를 Tag 컴포넌트로 표시합니다.",
      },
    },
  },
};

export const VariantGroups: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3
          style={{ marginBottom: "1rem", fontSize: "16px", fontWeight: "bold" }}
        >
          Primary Variant
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {ATMOSPHERE_TAGS.slice(0, 4).map(tag => (
            <Tag key={tag.name} size='small' variant='primary'>
              <Image
                src={tag.iconUrl}
                alt={tag.label}
                width={14}
                height={14}
                style={{ marginRight: "0.4rem" }}
              />
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "1rem", fontSize: "16px", fontWeight: "bold" }}
        >
          PrimaryLow Variant
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {UTILITY_TAGS.slice(0, 4).map(tag => (
            <Tag key={tag.name} size='small' variant='primaryLow'>
              <Image
                src={tag.iconUrl}
                alt={tag.label}
                width={14}
                height={14}
                style={{ marginRight: "0.4rem" }}
              />
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>

      <div>
        <h3
          style={{ marginBottom: "1rem", fontSize: "16px", fontWeight: "bold" }}
        >
          Assistive Variant
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {ALL_TAGS.slice(0, 6).map(tag => (
            <Tag key={tag.name} size='small' variant='assistive'>
              <Image
                src={tag.iconUrl}
                alt={tag.label}
                width={14}
                height={14}
                style={{ marginRight: "0.4rem" }}
              />
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "각 variant별로 태그들을 그룹화하여 보여줍니다.",
      },
    },
  },
};
