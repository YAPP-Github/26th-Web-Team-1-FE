import { useState } from "react";

import { FilterBottomSheet } from "@/app/_shared/FilterBottomSheet";
import ChevronDownIcon from "@/assets/chevron-down.svg";
import { Chip } from "@/components/ui/Chip";
import { HStack } from "@/components/ui/Stack";

import * as styles from "./ChipFilter.css";
import { type FilterTabType } from "./chipFilter.types";
import { getChipDisplayText } from "./chipFilterUtils";
import { useChipFilter } from "./useChipFilter";

/**
 * ChipFilter 컴포넌트
 *
 * @description
 * 지역, 분위기, 실용도 필터를 선택할 수 있는 Chip 버튼들을 제공합니다.
 * 각 Chip을 클릭하면 FilterBottomSheet가 열리고, 선택된 필터에 따라 Chip의 텍스트가 동적으로 변경됩니다.
 *
 * @features
 * - 3개의 필터 타입: 지역(location), 분위기(mood), 실용도(utility)
 * - 선택된 필터가 있으면 Chip이 활성화 상태로 표시
 * - 선택된 필터 개수에 따라 "외 N개" 형태로 표시
 * - FilterBottomSheet와 연동하여 필터 선택 UI 제공
 *
 */
export const ChipFilter = () => {
  const { selectedFilters, handleFilterApply } = useChipFilter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FilterTabType>("location");

  const handleChipClick = (tab: FilterTabType) => {
    setActiveTab(tab);
    setIsFilterOpen(true);
  };

  const filterConfigs = [
    {
      type: "location" as const,
      getActiveState: () => selectedFilters.locations.length > 0,
    },
    {
      type: "mood" as const,
      getActiveState: () => selectedFilters.atmosphereTags.length > 0,
    },
    {
      type: "utility" as const,
      getActiveState: () => selectedFilters.utilityTags.length > 0,
    },
  ];

  return (
    <>
      <HStack gap={8} className={styles.container}>
        {filterConfigs.map(({ type, getActiveState }) => (
          <Chip
            key={type}
            active={getActiveState()}
            onClick={() => handleChipClick(type)}
          >
            {getChipDisplayText(type, selectedFilters)}
            <ChevronDownIcon width={16} height={16} />
          </Chip>
        ))}
      </HStack>

      <FilterBottomSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        onApply={handleFilterApply}
        defaultTab={activeTab}
        defaultValues={selectedFilters}
      />
    </>
  );
};
