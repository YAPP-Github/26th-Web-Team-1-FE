import { compact } from "es-toolkit";
import { useState } from "react";
import { toast } from "sonner";

import {
  ALL_TAGS,
  ATMOSPHERE_TAGS,
  UTILITY_TAGS,
} from "@/constants/tag.constants";

const MAX_TAGS = 4;
const MAX_TAGS_PER_CATEGORY = 2;

type UseTagSelectionProps = {
  /**
   * 초기 선택된 태그 목록
   * @example ["OLD_STORE_MOOD", "ENERGETIC"]
   */
  initialTags?: string[];
};

export const useTagSelection = ({
  initialTags = [],
}: UseTagSelectionProps = {}) => {
  const [_selectedTags, setSelectedTags] = useState<string[]>(initialTags);

  const selectTag = (tagName: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagName)) {
        return prev.filter(t => t !== tagName);
      }

      try {
        if (prev.length >= MAX_TAGS) {
          throw new Error(`총 ${MAX_TAGS}개까지 선택할 수 있어요.`);
        }

        const isAtmosphereTag = ATMOSPHERE_TAGS.some(
          ({ name }) => name === tagName
        );
        const isUtilityTag = UTILITY_TAGS.some(({ name }) => name === tagName);

        if (isAtmosphereTag) {
          if (
            prev.filter(t => ATMOSPHERE_TAGS.some(({ name }) => name === t))
              .length >= MAX_TAGS_PER_CATEGORY
          ) {
            throw new Error(
              `종류당 최대 ${MAX_TAGS_PER_CATEGORY}개까지 선택할 수 있어요.`
            );
          }
        }

        if (isUtilityTag) {
          if (
            prev.filter(t => UTILITY_TAGS.some(({ name }) => name === t))
              .length >= MAX_TAGS_PER_CATEGORY
          ) {
            throw new Error(
              `종류당 최대 ${MAX_TAGS_PER_CATEGORY}개까지 선택할 수 있어요.`
            );
          }
        }

        return [...prev, tagName];
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        return prev;
      }
    });
  };

  const selectedTags = compact(
    _selectedTags.map(name => ALL_TAGS.find(t => t.name === name))
  );

  return {
    selectedTags,
    selectTag,
    atmosphereTags: ATMOSPHERE_TAGS,
    utilityTags: UTILITY_TAGS,
  };
};
