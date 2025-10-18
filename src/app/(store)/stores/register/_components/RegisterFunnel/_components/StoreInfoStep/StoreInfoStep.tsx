import Image from "next/image";
import { overlay } from "overlay-kit";
import { useEffect, useState } from "react";

import { SearchStoreBottomSheet } from "@/app/(search)/_components/SearchStoreBottomSheet";
import InfoIcon from "@/assets/info.svg";
import SearchIcon from "@/assets/search.svg";
import { BottomSheet } from "@/shared/components/ui/BottomSheet";
import { Button } from "@/shared/components/ui/Button";
import { Spacer } from "@/shared/components/ui/Spacer";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Text } from "@/shared/components/ui/Text";
import { TextField } from "@/shared/components/ui/TextField";
import { semantic } from "@/styles";

import * as styles from "./StoreInfoStep.css";

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

          <HStack gap={4} align='center'>
            <Text as='p' typo='label1Md' color='text.alternative'>
              검수된 맛집만 제공하여 기준에 따라 반려될 수 있어요.
            </Text>
            <button
              type='button'
              aria-label='가게 등록 주의사항'
              onClick={() => {
                overlay.open(({ isOpen, close }) => (
                  <StoreRegistrationGuideBottomSheet
                    open={isOpen}
                    onOpenChange={close}
                  />
                ));
              }}
            >
              <InfoIcon width={16} height={16} color={semantic.icon.primary} />
            </button>
          </HStack>
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

type StoreRegistrationGuideBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const GUIDE_INFO_LIST = [
  {
    iconUrl: "/images/register/guide-1.png",
    title: (
      <>
        <b>프랜차이즈 기준</b>은 어떻게 결정되나요?
      </>
    ),
    description:
      "맥도날드나 스타벅스와 같은 대형 프랜차이즈는 등록이 어려워요.",
  },
  {
    iconUrl: "/images/register/guide-2.png",
    title: (
      <>
        응원은 <b>최대 3곳</b>까지 가능해요
      </>
    ),
    description:
      "최대 3곳까지 가게를 응원할 수 있어요. 신중하게 가게를 응원해주세요.",
  },
];

const StoreRegistrationGuideBottomSheet = ({
  open,
  onOpenChange,
}: StoreRegistrationGuideBottomSheetProps) => {
  return (
    <BottomSheet.Root open={open} onOpenChange={onOpenChange}>
      <BottomSheet.Content>
        <BottomSheet.Title className={styles.registrationGuideBottomSheetTitle}>
          <Text typo='title3Sb' color='neutral.10'>
            가게를 등록할 때 주의할 사항이에요
          </Text>
        </BottomSheet.Title>
        <BottomSheet.Body
          className={styles.registrationGuideBottomSheetContent}
        >
          {GUIDE_INFO_LIST.map(({ title, description, iconUrl }, index) => (
            <VStack
              gap={10}
              className={styles.registrationGuideInfo}
              key={index}
            >
              <HStack align='center' gap={8}>
                <Image
                  src={iconUrl}
                  alt='가게 등록 주의사항'
                  width={24}
                  height={24}
                />
                <Text
                  as='h4'
                  typo='body1Sb'
                  color='text.normal'
                  className={styles.registrationGuideInfoTitle}
                >
                  {title}
                </Text>
              </HStack>
              <Text as='p' typo='body1Md' color='text.alternative'>
                {description}
              </Text>
            </VStack>
          ))}
        </BottomSheet.Body>
        <BottomSheet.Footer>
          <Button size='fullWidth' onClick={() => onOpenChange(false)}>
            확인
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};
