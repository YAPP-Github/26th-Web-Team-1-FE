"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { at } from "es-toolkit";
import Image from "next/image";
import Link from "next/link";
import {
  Separated,
  useBooleanState,
  useIntersectionObserver,
} from "react-simplikit";

import { storesQueryOptions } from "@/app/(home)/_api/shop/shop.queries";
import {
  storeCheersQueryOptions,
  storeImagesQueryOptions,
} from "@/app/(store)/_api/shop";
import ChevronRightIcon from "@/assets/chevron-right.svg";
import LogoWordMark from "@/assets/logo-wordmark.svg";
import { Bleed } from "@/components/ui/Bleed";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { colors } from "@/styles";

import * as styles from "./StoreList.css";

export const StoreList = ({ category }: { category: string }) => {
  const {
    data: { stores },
  } = useSuspenseQuery(storesQueryOptions({ size: 50, category }));

  return (
    <VStack className={styles.container}>
      <Separated by={<hr className={styles.separator} />}>
        {stores.map(store => (
          <StoreCard
            key={store.id}
            id={store.id}
            name={store.name}
            location={`${store.district} ${store.neighborhood}`}
            category={store.category}
          />
        ))}
      </Separated>
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
    <VStack className={styles.storeCard}>
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

  const images = at(imageUrls, [0, 1, 2]);

  return (
    <>
      <Spacer size={16} />
      <div ref={ref}>
        <HStack gap={12} align='center' className={styles.storeImagesContainer}>
          <HStack gap={4} className={styles.storeImages}>
            {images.map((imageUrl, index) =>
              imageUrl ? (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  alt={"이미지"}
                  width={126}
                  height={168}
                  data-first={index === 0}
                  data-last={index === images.length - 1}
                  className={styles.storeImage}
                  // TODO: 추후 제거
                  unoptimized
                />
              ) : (
                <EmptyImage
                  key={index}
                  first={index === 0}
                  last={index === images.length - 1}
                />
              )
            )}
          </HStack>

          <Link href={`/stores/${storeId}`}>
            <VStack gap={4} align='center'>
              <Button variant='assistive' className={styles.moreButton}>
                <ChevronRightIcon width={16} height={16} />
              </Button>
              <Text
                as='p'
                typo='label1Rg'
                color='text.neutral'
                className={styles.moreButtonText}
              >
                더보기
              </Text>
            </VStack>
          </Link>
        </HStack>
      </div>
    </>
  );
};

const EmptyImage = ({ first, last }: { first: boolean; last: boolean }) => {
  return (
    <div className={styles.emptyImage} data-first={first} data-last={last}>
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
