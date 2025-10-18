"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { head } from "es-toolkit";
import Image from "next/image";
import Link from "next/link";

import {
  storeDetailQueryOptions,
  storeImagesQueryOptions,
  storeTagsQueryOptions,
} from "@/app/(store)/_api/shop";
import LocationIcon from "@/assets/location-20.svg";
import MapIcon from "@/assets/map-20.svg";
import { Bleed } from "@/shared/components/ui/Bleed";
import { Button } from "@/shared/components/ui/Button";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Tag } from "@/shared/components/ui/Tag";
import { Text } from "@/shared/components/ui/Text";
import { TextButton } from "@/shared/components/ui/TextButton";
import { ALL_TAGS } from "@/shared/constants/tag.constants";
import { semantic } from "@/shared/styles";

import * as styles from "./StoreInfo.css";

export const StoreInfo = ({ storeId }: { storeId: number }) => {
  return (
    <VStack>
      <Suspense clientOnly fallback={<StoreImagesSkeleton />}>
        <StoreInfoImageCarousel storeId={storeId} />
      </Suspense>
      <Suspense
        clientOnly
        fallback={<StoreInfoContentSkeleton storeId={storeId} />}
      >
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
  const [
    {
      data: { name, district, neighborhood, category, placeUrl },
    },
    {
      data: { tags },
    },
  ] = useSuspenseQueries({
    queries: [storeDetailQueryOptions(storeId), storeTagsQueryOptions(storeId)],
  });

  const firstTag = head(ALL_TAGS.filter(tag => tags.includes(tag.name)));

  const showAdditionalTags = tags.length > 1;

  const address = `${district} ${neighborhood}`;
  return (
    <VStack gap={20} className={styles.storeInfoContentContainer}>
      <VStack gap={16}>
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

        {firstTag && (
          <HStack gap={8}>
            <Tag key={firstTag.name} variant='primaryLow'>
              <Image
                src={firstTag.iconUrl}
                alt={firstTag.label}
                width={16}
                height={16}
              />
              <Text as='span' typo='label1Sb' color='transparent'>
                {firstTag.label}
              </Text>
            </Tag>
            {showAdditionalTags && (
              <Tag variant='primaryLow'>
                <Text as='span' typo='label1Sb' color='transparent'>
                  +{tags.length - 1}
                </Text>
              </Tag>
            )}
          </HStack>
        )}
      </VStack>

      <StoreRegisterButton storeId={storeId} />
    </VStack>
  );
};

const StoreRegisterButton = ({ storeId }: { storeId: number }) => {
  return (
    <Link href={`/stores/register?storeId=${storeId}`}>
      <Button variant='primary' size='large' fullWidth>
        가게 응원하기
      </Button>
    </Link>
  );
};

const StoreImagesSkeleton = () => {
  return <Skeleton width='100%' height={239} radius={24} />;
};

const StoreInfoContentSkeleton = ({ storeId }: { storeId: number }) => {
  return (
    <VStack gap={20} className={styles.storeInfoContentContainer}>
      <VStack gap={16}>
        <VStack gap={4}>
          <Text as='span' typo='body1Md' color='text.alternative'>
            잇다가 응원하는
          </Text>
          <Skeleton width='40%' height={32} radius={8} />
        </VStack>
        <VStack gap={4} align='start' style={{ paddingInline: "0.8rem" }}>
          <Skeleton width='40%' height={20} radius={8} />
          <Skeleton width='45%' height={20} radius={8} />
        </VStack>
        <HStack gap={8}>
          <Skeleton width={100} height={36} radius={100} />
          <Skeleton width={44} height={36} radius={100} />
        </HStack>
      </VStack>

      <StoreRegisterButton storeId={storeId} />
    </VStack>
  );
};
