import { noop } from "es-toolkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePreservedCallback } from "react-simplikit";

import { BottomSheet } from "@/components/ui/BottomSheet";
import { type BottomSheetRootProps } from "@/components/ui/BottomSheet/BottomSheetRoot";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Spacer } from "@/components/ui/Spacer";
import { HStack } from "@/components/ui/Stack";
import { Tabs } from "@/components/ui/Tabs";
import { LOCATIONS } from "@/constants/location.constants";
import { ATMOSPHERE_TAGS, UTILITY_TAGS } from "@/constants/tag.constants";

import * as styles from "./FilterBottomSheet.css";

export type FilterValues = {
  locations: string[];
  atmosphereTags: string[];
  utilityTags: string[];
};

export type FilterBottomSheetProps = {
  /**
   * 필터 적용 시 호출되는 콜백 ("결과 보기" 버튼 클릭 또는 바텀시트 닫힐 때)
   */
  onApply?: (filters: FilterValues) => void;
  /**
   * 초기 선택된 필터 값들
   */
  defaultValues?: FilterValues;
  /**
   * 실시간 필터 변경 시 호출되는 콜백 (제공되면 자동으로 실시간 업데이트 활성화)
   */
  onChange?: (filters: FilterValues) => void;
} & Omit<BottomSheetRootProps, "children">;

/**
 * 필터 바텀시트
 *
 * 지역, 분위기, 실용도별로 다중 선택이 가능한 필터 바텀시트입니다.
 * 기본적으로는 "결과 보기" 버튼 클릭 시 필터가 적용되며,
 * onChange 콜백을 제공하면 실시간으로 필터 변경사항을 추적할 수 있습니다.
 *
 * @example
 * ```tsx
 * // 기본 사용법 (배치 적용)
 * <FilterBottomSheet
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onApply={setFilters}
 *   defaultValues={{
 *     locations: ["GANGNAM"],
 *     atmosphereTags: ["OLD_STORE_MOOD"],
 *     utilityTags: ["GROUP_RESERVATION"],
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Overlay 패턴과 함께 사용
 * <button
 *   onClick={async () => {
 *     const result = await overlay.openAsync(({ isOpen, close }) => {
 *       return (
 *         <FilterBottomSheet
 *           open={isOpen}
 *           onOpenChange={close}
 *           onApply={close}
 *           defaultValues={{
 *             locations: ["GANGNAM"],
 *             atmosphereTags: ["OLD_STORE_MOOD"],
 *             utilityTags: ["GROUP_RESERVATION"],
 *           }}
 *         />
 *       );
 *     });
 *     console.log(result);
 *   }}
 * >
 *   필터 열기
 * </button>
 * ```
 *
 * @example
 * ```tsx
 * // 실시간 업데이트 방식
 * const [resultCount, setResultCount] = useState(0);
 *
 * return (
 *   <FilterBottomSheet
 *     open={isOpen}
 *     onOpenChange={setIsOpen}
 *     onApply={setFilters}
 *     onChange={async (filters) => {
 *       // 필터 변경될 때마다 즉시 호출됨
 *       const count = await getFilteredStoreCount(filters);
 *       setResultCount(count);
 *     }}
 *   />
 * );
 * ```
 */
export const FilterBottomSheet = ({
  open,
  onOpenChange,
  onApply,
  defaultValues,
  onChange,
}: FilterBottomSheetProps) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    defaultValues?.locations ?? []
  );
  const [selectedAtmosphereTags, setSelectedAtmosphereTags] = useState<
    string[]
  >(defaultValues?.atmosphereTags ?? []);
  const [selectedUtilityTags, setSelectedUtilityTags] = useState<string[]>(
    defaultValues?.utilityTags ?? []
  );

  const onChangeCallback = usePreservedCallback(onChange ?? noop);
  const hasOnChange = !!onChange;

  useEffect(() => {
    if (!hasOnChange) {
      return;
    }

    const filters: FilterValues = {
      locations: selectedLocations,
      atmosphereTags: selectedAtmosphereTags,
      utilityTags: selectedUtilityTags,
    };

    onChangeCallback(filters);
  }, [
    hasOnChange,
    onChangeCallback,
    selectedAtmosphereTags,
    selectedLocations,
    selectedUtilityTags,
  ]);

  const handleReset = () => {
    setSelectedLocations([]);
    setSelectedAtmosphereTags([]);
    setSelectedUtilityTags([]);
  };

  const handleApplyFilters = () => {
    const filters: FilterValues = {
      locations: selectedLocations,
      atmosphereTags: selectedAtmosphereTags,
      utilityTags: selectedUtilityTags,
    };
    onApply?.(filters);
    onOpenChange?.(false);
  };

  return (
    <BottomSheet.Root
      open={open}
      onOpenChange={opened => {
        if (!opened) {
          handleApplyFilters();
          return;
        }
        onOpenChange?.(opened);
      }}
    >
      <BottomSheet.Content className={styles.bottomSheetContent}>
        <BottomSheet.Title>
          <></>
        </BottomSheet.Title>
        <Tabs.Root defaultValue='location'>
          <Tabs.List>
            <Tabs.Trigger value='location'>지역</Tabs.Trigger>
            <Tabs.Trigger value='mood'>분위기</Tabs.Trigger>
            <Tabs.Trigger value='utility'>실용도</Tabs.Trigger>
          </Tabs.List>
          <Spacer size={20} />
          <Tabs.Content value='location' className={styles.tabsContent}>
            <LocationTab
              selectedValues={selectedLocations}
              onSelectionChange={setSelectedLocations}
            />
          </Tabs.Content>
          <Tabs.Content value='mood' className={styles.tabsContent}>
            <MoodTab
              selectedValues={selectedAtmosphereTags}
              onSelectionChange={setSelectedAtmosphereTags}
            />
          </Tabs.Content>
          <Tabs.Content value='utility' className={styles.tabsContent}>
            <UtilityTab
              selectedValues={selectedUtilityTags}
              onSelectionChange={setSelectedUtilityTags}
            />
          </Tabs.Content>
        </Tabs.Root>
        <BottomSheet.Footer className={styles.bottomSheetFooter}>
          <HStack gap={8}>
            <Button
              variant='assistive'
              size='fullWidth'
              style={{ width: "auto" }}
              onClick={handleReset}
            >
              초기화
            </Button>
            <Button size='fullWidth' onClick={handleApplyFilters}>
              결과 보기
            </Button>
          </HStack>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};

type FilterTabProps = {
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
};

const LocationTab = ({ selectedValues, onSelectionChange }: FilterTabProps) => {
  const handleLocationToggle = (locationValue: string) => {
    const isSelected = selectedValues.includes(locationValue);
    if (isSelected) {
      onSelectionChange(
        selectedValues.filter(value => value !== locationValue)
      );
    } else {
      onSelectionChange([...selectedValues, locationValue]);
    }
  };

  return (
    <HStack wrap='wrap' gap='1.2rem 0.8rem '>
      {LOCATIONS.map(location => (
        <Chip
          key={location.value}
          active={selectedValues.includes(location.value)}
          onClick={() => handleLocationToggle(location.value)}
        >
          {location.label}
        </Chip>
      ))}
    </HStack>
  );
};

const MoodTab = ({ selectedValues, onSelectionChange }: FilterTabProps) => {
  const handleTagToggle = (tagName: string) => {
    const isSelected = selectedValues.includes(tagName);
    if (isSelected) {
      onSelectionChange(selectedValues.filter(value => value !== tagName));
    } else {
      onSelectionChange([...selectedValues, tagName]);
    }
  };

  return (
    <HStack wrap='wrap' gap='1.2rem 0.8rem '>
      {ATMOSPHERE_TAGS.map(tag => (
        <Chip
          key={tag.name}
          active={selectedValues.includes(tag.name)}
          onClick={() => handleTagToggle(tag.name)}
        >
          <Image src={tag.iconUrl} alt={tag.label} width={16} height={16} />
          {tag.label}
        </Chip>
      ))}
    </HStack>
  );
};

const UtilityTab = ({ selectedValues, onSelectionChange }: FilterTabProps) => {
  const handleTagToggle = (tagName: string) => {
    const isSelected = selectedValues.includes(tagName);
    if (isSelected) {
      onSelectionChange(selectedValues.filter(value => value !== tagName));
    } else {
      onSelectionChange([...selectedValues, tagName]);
    }
  };

  return (
    <HStack wrap='wrap' gap='1.2rem 0.8rem '>
      {UTILITY_TAGS.map(tag => (
        <Chip
          key={tag.name}
          active={selectedValues.includes(tag.name)}
          onClick={() => handleTagToggle(tag.name)}
        >
          <Image src={tag.iconUrl} alt={tag.label} width={16} height={16} />
          {tag.label}
        </Chip>
      ))}
    </HStack>
  );
};
