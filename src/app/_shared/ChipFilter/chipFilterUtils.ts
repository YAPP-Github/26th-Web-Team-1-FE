import { type FilterValues } from "@/app/_shared/FilterBottomSheet";
import { LOCATIONS } from "@/constants/location.constants";
import { ALL_TAGS } from "@/constants/tag.constants";

import { type FilterTabType } from "./chipFilter.types";

/**
 * 지역별 라벨 매핑 (value -> districts[0] 또는 label)
 */
const LOCATION_LABEL: Record<string, string> = Object.fromEntries(
  LOCATIONS.map(location => [
    location.value,
    location.districts[0] ?? location.label,
  ])
);

/**
 * 태그별 라벨 매핑 (name -> label)
 */
const TAG_LABEL: Record<string, string> = Object.fromEntries(
  ALL_TAGS.map(tag => [tag.name, tag.label])
);

/**
 * 각 필터 타입별 기본 표시 텍스트
 */
const DEFAULT_TEXT: Record<FilterTabType, string> = {
  location: "서울 전체",
  mood: "분위기",
  utility: "실용도",
} as const;

/**
 * 필터 타입에 따라 해당하는 값들을 선택
 */
const pickValues = (type: FilterTabType, selected: FilterValues): string[] => {
  switch (type) {
    case "location":
      return selected.locations;
    case "mood":
      return selected.atmosphereTags;
    case "utility":
      return selected.utilityTags;
  }
};

/**
 * 필터 값에 대한 실제 표시 라벨을 반환
 */
const labelFor = (type: FilterTabType, value: string): string => {
  if (type === "location") {
    return LOCATION_LABEL[value] ?? value;
  }

  return TAG_LABEL[value] ?? value;
};

/**
 * Chip에 표시할 텍스트를 생성
 * 선택된 필터 개수에 따라 "외 N개" 형태로 표시
 */
export const getChipDisplayText = (
  type: FilterTabType,
  selected: FilterValues
): string => {
  const values = pickValues(type, selected);
  if (values.length === 0) {
    return DEFAULT_TEXT[type];
  }

  const firstLabel = labelFor(type, values[0] ?? "");
  return values.length === 1
    ? firstLabel
    : `${firstLabel} 외 ${values.length - 1}개`;
};
