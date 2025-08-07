import { overlay } from "overlay-kit";
import { useEffect, useState } from "react";

import { SearchStoreBottomSheet } from "@/app/(search)/_components/SearchStoreBottomSheet";
import SearchIcon from "@/assets/search.svg";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { semantic } from "@/styles";

type StoreInfoStepProps = {
  onNext: ({
    storeName,
    storeKakaoId,
  }: {
    storeName: string;
    storeKakaoId: string;
  }) => void;
  storeName?: string;
  storeKakaoId?: string;
};

export const StoreInfoStep = ({
  onNext,
  storeName,
  storeKakaoId,
}: StoreInfoStepProps) => {
  const [storeInfo, setStoreInfo] = useState<{
    storeName: string;
    storeKakaoId: string;
  }>({
    storeName: storeName ?? "",
    storeKakaoId: storeKakaoId ?? "",
  });

  useEffect(() => {
    if (storeName && storeKakaoId) {
      setStoreInfo({ storeName, storeKakaoId });
    }
  }, [storeName, storeKakaoId]);

  return (
    <VStack justify='between' style={{ height: "100%" }}>
      <VStack>
        <Spacer size={32} />

        <VStack gap={12}>
          <Text as='h2' typo='title1Bd' color='text.normal'>
            나만의 이야기가 담긴 가게,
            <br />
            소개해주실 수 있나요?
          </Text>

          <Text as='p' typo='label1Md' color='text.alternative'>
            *프렌차이즈의 경우, 반려될 수 있습니다.
          </Text>
        </VStack>
        <Spacer size={44} />

        <TextField
          label='그 가게가 기다리고 있어요!'
          rightAddon={
            <SearchIcon width={20} height={20} color={semantic.icon.black} />
          }
          value={storeInfo.storeName}
          readOnly
          placeholder='가게명을 입력해주세요'
          onClick={() => {
            overlay.open(({ isOpen, close }) => {
              return (
                <SearchStoreBottomSheet
                  open={isOpen}
                  onOpenChange={close}
                  onSelect={({ kakaoId, name }) => {
                    setStoreInfo({ storeName: name, storeKakaoId: kakaoId });
                  }}
                />
              );
            });
          }}
        />
      </VStack>

      <Button
        variant='primary'
        size='fullWidth'
        type='button'
        disabled={!storeInfo.storeName || !storeInfo.storeKakaoId}
        onClick={() => onNext(storeInfo)}
      >
        다음
      </Button>
    </VStack>
  );
};
