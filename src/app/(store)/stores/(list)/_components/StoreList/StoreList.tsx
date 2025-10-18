"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { first } from "es-toolkit/compat";
import Image from "next/image";
import Link from "next/link";
import { useBooleanState, useIntersectionObserver } from "react-simplikit";

import { useChipFilter } from "@/app/_shared/ChipFilter";
import { storesQueryOptions } from "@/app/(home)/_api/shop/shop.queries";
import {
  storeCheersQueryOptions,
  storeImagesQueryOptions,
} from "@/app/(store)/_api/shop";
import InfoIcon from "@/assets/info.svg";
import LogoWordMark from "@/assets/logo-wordmark.svg";
import { Bleed } from "@/shared/components/ui/Bleed";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Spacer } from "@/shared/components/ui/Spacer";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Text } from "@/shared/components/ui/Text";
import { colors } from "@/styles";

import * as styles from "./StoreList.css";

export const StoreList = ({ category }: { category: string }) => {
  const { selectedFilters } = useChipFilter();

  const {
    data: { stores },
  } = useSuspenseQuery(
    storesQueryOptions({
      size: 50,
      category,
      tag: [...selectedFilters.atmosphereTags, ...selectedFilters.utilityTags],
      location: selectedFilters.locations,
    })
  );

  if (stores.length === 0) {
    return <EmptyStoreList />;
  }

  return (
    <VStack className={styles.container}>
      <Spacer size={24} />
      <VStack gap={28}>
        {stores.map(store => (
          <Link href={`/stores/${store.id}`} key={store.id}>
            <StoreCard
              key={store.id}
              id={store.id}
              name={store.name}
              location={`${store.district} ${store.neighborhood}`}
              category={store.category}
            />
          </Link>
        ))}
      </VStack>
    </VStack>
  );
};

const EmptyStoreList = () => {
  return (
    <VStack gap={12} align='center' className={styles.emptyWrapper}>
      <InfoIcon width={44} height={44} className={styles.infoIcon} />
      <Text typo='body1Md' color='#767676'>
        검색하신 가게를 찾을 수 없습니다.
        <br />
        다시 한 번 검색해 주세요.
      </Text>
    </VStack>
  );
};

const StoreCard = ({
  id,
  name,
  location,
  category,
}: {
  id: number;
  name: string;
  location: string;
  category: string;
}) => {
  return (
    <VStack>
      <VStack gap={4}>
        <Text as='h3' typo='title2Bd'>
          {name}
        </Text>

        <HStack gap={6} align='center'>
          <Text as='span' typo='label2Md' color='text.alternative'>
            {location}
          </Text>
          <hr className={styles.divider} />
          <Text as='span' typo='label2Md' color='text.alternative'>
            {category}
          </Text>
        </HStack>
      </VStack>

      <Bleed inline={20}>
        <StoreImages storeId={id} />
      </Bleed>

      <Spacer size={20} />

      <StoreReviews storeId={id} />
    </VStack>
  );
};

const StoreImages = ({ storeId }: { storeId: number }) => {
  const [isIntersecting, setIsIntersectingTrue] = useBooleanState(false);

  const ref = useIntersectionObserver(
    entry => {
      if (entry.isIntersecting) {
        setIsIntersectingTrue();
      }
    },
    { threshold: 0.2, rootMargin: "300px" }
  );

  const { data, isLoading } = useQuery({
    ...storeImagesQueryOptions(storeId),
    enabled: isIntersecting,
  });

  const imageUrls = data?.imageUrls ?? [];

  if (!isLoading && isIntersecting && imageUrls.length === 0) {
    return null;
  }

  const thumbnailImage = first(imageUrls);

  return (
    <>
      <Spacer size={16} />
      <div ref={ref}>
        <HStack gap={12} align='center' className={styles.storeImagesContainer}>
          {thumbnailImage ? (
            <div className={styles.storeImageWrapper}>
              <Image
                key={thumbnailImage}
                src={thumbnailImage}
                alt={"이미지"}
                fill
                className={styles.storeImage}
              />
            </div>
          ) : (
            <EmptyImage />
          )}
        </HStack>
      </div>
    </>
  );
};

const EmptyImage = () => {
  return (
    <div className={styles.emptyImage}>
      <LogoWordMark width={30.16} height={16} color={colors.coolNeutral[96]} />
    </div>
  );
};

const MAX_CHEERS = 50;

const StoreReviews = ({ storeId }: { storeId: number }) => {
  const [isIntersecting, setIsIntersectingTrue] = useBooleanState(false);

  const ref = useIntersectionObserver(
    entry => {
      if (entry.isIntersecting) {
        setIsIntersectingTrue();
      }
    },
    { threshold: 0.2, rootMargin: "300px" }
  );

  const { data, isLoading } = useQuery({
    ...storeCheersQueryOptions(storeId, MAX_CHEERS),
    enabled: isIntersecting,
  });

  const cheers = data?.cheers ?? [];

  if (isLoading || !isIntersecting) {
    return (
      <div ref={ref}>
        <Bleed inline={20}>
          <HStack className={styles.cheerContainer} gap={8}>
            <Skeleton
              width={"80%"}
              height={64}
              radius={16}
              style={{ flexShrink: 0 }}
            />
            <Skeleton
              width={"80%"}
              height={64}
              radius={16}
              style={{ flexShrink: 0 }}
            />
          </HStack>
        </Bleed>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Bleed inline={20}>
        <HStack className={styles.cheerContainer} gap={8}>
          {cheers.map(cheer => (
            <Link
              key={cheer.id}
              href={`/stores/${storeId}?cheerId=${cheer.id}`}
              className={styles.cheer}
            >
              <Text
                as='p'
                typo='label1Md'
                color='text.neutral'
                className={styles.cheerText}
              >
                {cheer.description}
              </Text>
            </Link>
          ))}
        </HStack>
      </Bleed>
    </div>
  );
};
