"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import {
  storeDetailQueryOptions,
  storeImagesQueryOptions,
} from "@/app/(store)/_api/shop";
import LocationIcon from "@/assets/location-20.svg";
import MapIcon from "@/assets/map-20.svg";
import { Bleed } from "@/components/ui/Bleed";
import { Skeleton } from "@/components/ui/Skeleton";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";
import { semantic } from "@/styles";

import * as styles from "./StoreInfo.css";

export const StoreInfo = ({ storeId }: { storeId: number }) => {
  return (
    <VStack>
      <Suspense clientOnly fallback={<StoreImagesSkeleton />}>
        <StoreInfoImageCarousel storeId={storeId} />
      </Suspense>
      <Suspense clientOnly fallback={<StoreInfoContentSkeleton />}>
        <StoreInfoContent storeId={storeId} />
      </Suspense>
    </VStack>
  );
};

const StoreInfoImageCarousel = ({ storeId }: { storeId: number }) => {
  const {
    data: { imageUrls },
  } = useSuspenseQuery(storeImagesQueryOptions(storeId));

  return (
    <Bleed inline={20}>
      <div className={styles.storeInfoImageCarousel}>
        {imageUrls.map((image, index) => (
          <div key={index} className={styles.storeInfoImageWrapper}>
            <Image
              key={index}
              className={styles.storeInfoImage}
              src={image}
              fill
              alt={`${index + 1}번째 가게 이미지`}
            />
          </div>
        ))}
      </div>
    </Bleed>
  );
};

const StoreInfoContent = ({ storeId }: { storeId: number }) => {
  const {
    data: { name, district, neighborhood, category, placeUrl },
  } = useSuspenseQuery(storeDetailQueryOptions(storeId));
  const address = `${district} ${neighborhood}`;
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
          <LocationIcon color={semantic.icon.primary} />
          <Text as='span' typo='label1Md' color='text.alternative'>
            {address}
          </Text>
          <hr className={styles.divider} />
          <Text as='span' typo='label1Md' color='text.alternative'>
            {category}
          </Text>
        </HStack>
        <Link href={placeUrl} target='_blank' rel='noopener noreferrer'>
          <TextButton
            size='small'
            variant='custom'
            className={styles.kakaoMapButton}
            leftAddon={<MapIcon color={semantic.icon.primary} />}
          >
            카카오맵 바로가기
          </TextButton>
        </Link>
      </VStack>
    </VStack>
  );
};

const StoreImagesSkeleton = () => {
  return <Skeleton width='100%' height={239} radius={24} />;
};

const StoreInfoContentSkeleton = () => {
  return (
    <VStack gap={16} className={styles.storeInfoContentContainer}>
      <VStack gap={4}>
        <Text as='span' typo='body1Md' color='text.alternative'>
          잇다가 응원하는
        </Text>
        <Skeleton width='40%' height={32} radius={8} />
      </VStack>
      <VStack gap={4} align='start' style={{ paddingInline: "0.8rem" }}>
        <Skeleton width='40%' height={20} radius={8} />
        <Skeleton width='45%' height={28} radius={8} />
      </VStack>
    </VStack>
  );
};
