import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { type FilterValues } from "@/shared/components/FilterBottomSheet";
import {
  ATMOSPHERE_TAGS,
  UTILITY_TAGS,
} from "@/shared/constants/tag.constants";

/**
 * useChipFilter 훅
 *
 * @description
 * ChipFilter 컴포넌트에서 사용하는 필터 상태를 관리하고 URL 파라미터와 동기화하는 훅입니다.
 * 지역, 분위기, 실용도 필터의 선택 상태를 URL 쿼리 파라미터로 관리하며,
 * 필터 적용 시 URL을 업데이트하고 다른 컴포넌트에서 필터 상태를 읽을 수 있도록 합니다.
 *
 * @returns {FilterValues} selectedFilters - 현재 선택된 모든 필터 값들
 * @returns {Function} handleFilterApply - 필터 적용 시 호출되는 함수
 *
 */
export const useChipFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const selectedFilters: FilterValues = {
    locations: searchParams.get("location")?.split(",").filter(Boolean) || [],
    atmosphereTags:
      searchParams
        .get("tag")
        ?.split(",")
        .filter(tag =>
          ATMOSPHERE_TAGS.some(atmosphereTag => atmosphereTag.name === tag)
        ) || [],
    utilityTags:
      searchParams
        .get("tag")
        ?.split(",")
        .filter(tag =>
          UTILITY_TAGS.some(utilityTag => utilityTag.name === tag)
        ) || [],
  };

  const handleFilterApply = (filters: FilterValues) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.locations.length > 0) {
      params.set("location", filters.locations.join(","));
    } else {
      params.delete("location");
    }

    const allTags = [...filters.atmosphereTags, ...filters.utilityTags];
    if (allTags.length > 0) {
      params.set("tag", allTags.join(","));
    } else {
      params.delete("tag");
    }

    const newUrl = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl);
  };

  return {
    selectedFilters,
    handleFilterApply,
  };
};
