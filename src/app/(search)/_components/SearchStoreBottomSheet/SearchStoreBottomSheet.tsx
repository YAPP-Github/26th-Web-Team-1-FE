"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "react-simplikit";

import CircleCloseIcon from "@/assets/circle-close.svg";
import InfoFillIcon from "@/assets/info-fill.svg";
import SearchIcon from "@/assets/search.svg";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";
import { TextField } from "@/components/ui/TextField";

import { storeSearchQueryOptions } from "../../_api";
import { type SearchStoreFormValues } from "../../_types";
import { type SelectedStore } from "../../_types/searchStore.types";
import * as styles from "./SearchStoreBottomSheet.css";

export type SearchStoreBottomSheetProps = {
  /** 바텀시트 열림/닫힘 상태 */
  open: boolean;

  /** 바텀시트 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;

  /** 가게 선택 시 호출되는 핸들러 */
  onSelect: (store: SelectedStore) => void;
};

/**
 * 가게 검색 바텀시트 컴포넌트
 *
 * 사용자가 가게명을 검색하고 선택할 수 있는 바텀시트 UI를 제공합니다.
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * const handleStoreSelect = (store: SelectedStore) => {
 *   setValue('storeName', store.name);
 *   setValue('storeKakaoId', store.kakaoId);
 * };
 *
 * <SearchStoreBottomSheet
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onSelect={handleStoreSelect}
 * />
 * ```
 */
export const SearchStoreBottomSheet = ({
  open,
  onOpenChange,
  onSelect,
}: SearchStoreBottomSheetProps) => {
  const { register, reset, watch, setValue } = useForm<SearchStoreFormValues>({
    defaultValues: { searchTerm: "" },
    mode: "onChange",
  });

  const searchTermValue = watch("searchTerm");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // TODO: 검색 디바운스 시간 의논
  const debouncedSearch = useDebounce((value: string) => {
    setDebouncedSearchTerm(value);
    setIsTyping(false);
  }, 2000);

  const { data: list, isLoading } = useQuery(
    storeSearchQueryOptions(debouncedSearchTerm)
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setIsTyping(true);

      if (!value.trim()) {
        debouncedSearch.cancel();
        setDebouncedSearchTerm("");
        setIsTyping(false);
        return;
      }

      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleSelect = (store: SelectedStore) => {
    onSelect(store);
    onOpenChange(false);
  };

  const handleCloseClick = () => {
    reset();
    setDebouncedSearchTerm("");
    onOpenChange(false);
  };

  const handleClearClick = () => {
    setValue("searchTerm", "");
    setDebouncedSearchTerm("");
  };

  useEffect(() => {
    if (!open) {
      reset();
      setDebouncedSearchTerm("");
      debouncedSearch.cancel();
    }
  }, [open, reset, debouncedSearch]);

  const isSearching = (!!debouncedSearchTerm && isLoading) || isTyping;

  return (
    <BottomSheet.Root open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content className={styles.contentWrapper}>
        <BottomSheet.Title className={styles.titleWrapper}>
          <Text typo='title2Sb' color='neutral.10'>
            가게 검색
          </Text>
          <TextButton
            variant='primary'
            size='medium'
            onClick={handleCloseClick}
          >
            취소
          </TextButton>
        </BottomSheet.Title>

        <BottomSheet.Body>
          <TextField
            {...register("searchTerm", {
              onChange: e => handleSearchChange(e.target.value),
            })}
            placeholder='가게명을 입력해주세요'
            rightAddon={
              searchTermValue ? (
                <button
                  className={styles.clearButtonWrapper}
                  onClick={handleClearClick}
                  type='button'
                >
                  <CircleCloseIcon
                    width={22}
                    height={22}
                    className={styles.icon}
                  />
                </button>
              ) : (
                <SearchIcon width={20} height={20} />
              )
            }
            helperText={
              <div className={styles.helperTextWrapper}>
                <InfoFillIcon
                  width={16}
                  height={16}
                  className={styles.infoIcon}
                />
                <Text typo='caption1Md' color='text.alternative'>
                  현재는 서울 지역 가게만 검색할 수 있어요.
                </Text>
              </div>
            }
          />

          <AnimatePresence mode='wait'>
            {isSearching ? (
              <motion.ul
                key='loading'
                className={styles.searchResultItems}
                initial='hidden'
                animate='visible'
                exit={{ opacity: 0 }}
                variants={styles.listVariants}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <SearchResultItemSkeleton key={index} />
                ))}
              </motion.ul>
            ) : (
              <motion.ul
                className={styles.searchResultItems}
                initial='hidden'
                animate='visible'
                variants={styles.listVariants}
              >
                {list?.stores?.map(store => (
                  <SearchResultItemLayout
                    key={store.kakaoId}
                    onSelect={handleSelect}
                    store={store}
                  >
                    <Text typo='body1Sb'>{store.name}</Text>
                    <Text typo='label2Sb' color='neutral.50'>
                      {store.address}
                    </Text>
                  </SearchResultItemLayout>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </BottomSheet.Body>

        <BottomSheet.Footer>
          <Button size='fullWidth' onClick={handleCloseClick}>
            확인
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};

const SearchResultItemLayout = ({
  onSelect,
  store,
  className = styles.searchResultItem,
  children,
}: {
  children: ReactNode;
  onSelect?: (store: SelectedStore) => void;
  store?: SelectedStore;
  className?: string;
}) => (
  <motion.li
    className={className}
    variants={styles.itemVariants}
    onClick={onSelect && store ? () => onSelect(store) : undefined}
  >
    {children}
  </motion.li>
);

const SearchResultItemSkeleton = () => {
  return (
    <SearchResultItemLayout className={styles.skeletonItem}>
      <div className={styles.skeletonContent}>
        <Skeleton width='60%' height={20} radius={4} />
        <Skeleton width='80%' height={16} radius={4} />
      </div>
    </SearchResultItemLayout>
  );
};
