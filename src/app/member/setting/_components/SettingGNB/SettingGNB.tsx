"use client";

import { useRouter } from "next/navigation";

import ChevronLeftIcon from "@/assets/chevron-left.svg";
import { GNB } from "@/components/ui/GNB";

export const SettingGNB = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <GNB
      align='center'
      title='설정'
      leftAddon={
        <button
          type='button'
          onClick={handleClick}
          aria-label='홈으로 이동하기'
        >
          <ChevronLeftIcon width={24} height={24} onClick={handleClick} />
        </button>
      }
    />
  );
};
