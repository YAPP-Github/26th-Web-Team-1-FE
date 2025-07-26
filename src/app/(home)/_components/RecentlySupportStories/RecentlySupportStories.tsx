"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Separated } from "react-simplikit";

import { Bleed } from "@/components/ui/Bleed";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";
import { radius } from "@/styles";

import { storesQueryOptions } from "../../_api/shop";
import * as styles from "./RecentlySupportStories.css";

export const RecentlySupportedStores = () => {
  return (
    <VStack>
      <HStack justify='between'>
        <Text as='h2' color='text.normal' typo='title2Sb'>
          최근에 응원 받은 가게
        </Text>
        <Link href='/stores'>
          <TextButton variant='assistive' size='small'>
            전체보기
          </TextButton>
        </Link>
      </HStack>

      <Spacer size={16} />

      <Suspense clientOnly fallback={<RecentlySupportedStoresSkeleton />}>
        <RecentlySupportedStoresContent />
      </Suspense>

      <Spacer size={20} />

      <Link href='/stores'>
        <Button
          variant='custom'
          size='large'
          className={styles.showAllButton}
          fullWidth
        >
          가게 전체보기
        </Button>
      </Link>
    </VStack>
  );
};

const CHEER_SIZE = 10;

const RecentlySupportedStoresContent = () => {
  const {
    data: { stores },
  } = useSuspenseQuery(storesQueryOptions(CHEER_SIZE));

  return (
    <Bleed inline={20}>
      <HStack gap={12} className={styles.supportedStoreCardList}>
        {stores.map(store => (
          <Link href={`/stores/${store.id}`} key={store.id}>
            <SupportedStoreCard
              name={store.name}
              location={`${store.district} ${store.neighborhood}`}
              category={store.category}
              imageUrl={store.imageUrl}
            />
          </Link>
        ))}
      </HStack>
    </Bleed>
  );
};

type SupportedStoreCardProps = {
  name: string;
  location: string;
  category: string;
  imageUrl: string;
};

const SupportedStoreCard = ({
  name: storeName,
  location,
  category,
  imageUrl,
}: SupportedStoreCardProps) => {
  return (
    <VStack gap={12} className={styles.supportedStoreCard}>
      <div className={styles.supportedStoreCardImageWrapper}>
        <Image fill src={imageUrl} alt={`${storeName} 가게 이미지`} />
      </div>
      <VStack className={styles.supportedStoreCardContent}>
        <Text>{storeName}</Text>
        <Spacer size={4} />
        <HStack align='center' gap={6}>
          <Separated by={<hr className={styles.divider} />}>
            <Text as='span' typo='caption1Md' color='text.alternative'>
              {location}
            </Text>
            <Text as='span' typo='caption1Md' color='text.alternative'>
              {category}
            </Text>
          </Separated>
        </HStack>
      </VStack>
    </VStack>
  );
};

const RecentlySupportedStoresSkeleton = () => {
  return (
    <Bleed inline={20}>
      <HStack gap={12} className={styles.supportedStoreCardList}>
        {Array.from({ length: 5 }).map((_, index) => (
          <VStack key={index} gap={12} className={styles.supportedStoreCard}>
            <Skeleton width={154} height={114} radius={radius[160]} />
            <VStack className={styles.supportedStoreCardContent}>
              <Skeleton width={81} height={18} radius={radius[40]} />
              <Spacer size={4} />
              <Skeleton width={120} height={14} radius={radius[40]} />
            </VStack>
          </VStack>
        ))}
      </HStack>
    </Bleed>
  );
};
