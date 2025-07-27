"use client";

import Link from "next/link";

import { Bleed } from "@/components/ui/Bleed";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";

import * as styles from "./StoreInfo.css";

const MOCK_STORE_INFO = {
  name: "댈러스피자",
  address: "서울 영등포구",
  category: "양식",
  kakaoMapUrl: "https://place.map.kakao.com/974847893",
};

const MOCK_STORE_IMAGES = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
];

export const StoreInfo = ({ storeId }: { storeId: string }) => {
  void storeId;

  return (
    <VStack>
      <StoreInfoImageCarousel images={MOCK_STORE_IMAGES} />
      <StoreInfoContent
        name={MOCK_STORE_INFO.name}
        address={MOCK_STORE_INFO.address}
        category={MOCK_STORE_INFO.category}
        kakaoMapUrl={MOCK_STORE_INFO.kakaoMapUrl}
      />
    </VStack>
  );
};

const StoreInfoImageCarousel = ({ images }: { images: string[] }) => {
  return (
    <Bleed inline={20}>
      <div className={styles.storeInfoImageCarousel}>
        {images.map((image, index) => (
          // TODO: NextImage 사용, priority 1~3 high
          <img
            key={index}
            className={styles.storeInfoImage}
            src={image}
            alt={`${index + 1}번째 가게 이미지`}
          />
        ))}
      </div>
    </Bleed>
  );
};

const StoreInfoContent = ({
  name,
  address,
  category,
  kakaoMapUrl,
}: {
  name: string;
  address: string;
  category: string;
  kakaoMapUrl: string;
}) => {
  return (
    <VStack gap={16} className={styles.storeInfoContentContainer}>
      <VStack gap={4}>
        <Text as='span' typo='body1Md' color='text.alternative'>
          잇다가 응원하는
        </Text>
        <Text as='span' typo='title1Bd' color='text.normal'>
          {name}
        </Text>
      </VStack>

      <VStack gap={4} align='start' style={{ paddingInline: "0.8rem" }}>
        <HStack gap={4} align='center'>
          <span>아이콘</span>
          <Text as='span' typo='label1Md' color='text.alternative'>
            {address}
          </Text>
          <hr className={styles.divider} />
          <Text as='span' typo='label1Md' color='text.alternative'>
            {category}
          </Text>
        </HStack>
        <Link href={kakaoMapUrl} target='_blank' rel='noopener noreferrer'>
          <TextButton
            size='small'
            variant='custom'
            className={styles.kakaoMapButton}
            leftAddon={<span>맵 아이콘</span>}
          >
            카카오맵 바로가기
          </TextButton>
        </Link>
      </VStack>
    </VStack>
  );
};
