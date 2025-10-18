"use client";

import CancelIcon from "@/assets/cancel.svg";
import ChevronLeftIcon from "@/assets/chevron-left.svg";
import { GNB } from "@/shared/components/ui/GNB";
import { semantic } from "@/shared/styles";

type StoreRegisterGNBProps = {
  onCancel?: () => void;
  onBack?: () => void;
};

export const StoreRegisterGNB = ({
  onCancel,
  onBack,
}: StoreRegisterGNBProps) => {
  return (
    <GNB
      title='가게 등록'
      leftAddon={
        onBack && (
          <button aria-label='뒤로가기' onClick={onBack}>
            <ChevronLeftIcon
              width={24}
              height={24}
              color={semantic.icon.black}
            />
          </button>
        )
      }
      rightAddon={
        onCancel && (
          <button aria-label='뒤로가기' onClick={onCancel}>
            <CancelIcon width={24} height={24} color={semantic.icon.black} />
          </button>
        )
      }
    />
  );
};
