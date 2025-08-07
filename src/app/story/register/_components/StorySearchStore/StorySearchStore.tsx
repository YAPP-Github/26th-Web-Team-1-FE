"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { SearchStoreBottomSheet } from "@/app/(search)/_components/SearchStoreBottomSheet";
import { type SelectedStore } from "@/app/(search)/_types/searchStore.types";
import SearchIcon from "@/assets/search.svg";
import { TextField } from "@/components/ui/TextField";

import { type StoryRegisterFormData } from "../../_schemas";
import * as styles from "./StorySearchStore.css";

export const StorySearchStore = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, setValue, watch } = useFormContext<StoryRegisterFormData>();

  const selectedStoreValue = watch("storeName");

  const handleOpenClick = () => {
    setIsOpen(true);
  };

  const handleSelectStore = (store: SelectedStore) => {
    setValue("storeName", store.name, { shouldValidate: true });
    setValue("storeKakaoId", store.kakaoId, { shouldValidate: true });
  };

  return (
    <div>
      <TextField
        {...register("storeName", { required: true })}
        label={
          <>
            <span>방문한 가게</span>
            <span className={styles.star}>*</span>
          </>
        }
        placeholder='가게명을 입력해주세요'
        value={selectedStoreValue || ""}
        rightAddon={<SearchIcon width={20} height={20} />}
        onClick={handleOpenClick}
        className={styles.field}
        readOnly
      />
      <SearchStoreBottomSheet
        open={isOpen}
        onOpenChange={setIsOpen}
        onSelect={handleSelectStore}
      />
    </div>
  );
};
