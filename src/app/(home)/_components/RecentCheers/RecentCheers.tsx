"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { chunk } from "es-toolkit";
import Image from "next/image";
import Link from "next/link";
import { type HTMLAttributes, useState } from "react";
import { Separated } from "react-simplikit";

import ResetIcon from "@/assets/reset-20.svg";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";

import { cheerQueryOptions } from "../../_api/cheer";
import * as styles from "./RecentCheers.css";

const BACKGROUND_COLORS = ["#FEF8DD", "#FDE5E3", "#E0F2FF"];

export const RecentCheers = () => {
  return (
    <Suspense clientOnly fallback={<RecentSupportCardContentSkeleton />}>
      <RecentSupportCardContent />
    </Suspense>
  );
};

const RecentSupportCardContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useSuspenseQuery(cheerQueryOptions(15));

  const chunkedList = chunk(data.cheers, 3);

  const handleRefresh = () => {
    setCurrentIndex((currentIndex + 1) % chunkedList.length);
  };

  return (
    <VStack gap={16}>
      <HStack justify='between'>
        <Text as='h2' color='text.normal' typo='title2Sb'>
          가게에 전하는 따뜻한 응원
        </Text>
        <TextButton variant='assistive' size='small' onClick={handleRefresh}>
          <HStack gap={4} align='center'>
            새로고침
            <ResetIcon width={16} height={16} />
          </HStack>
        </TextButton>
      </HStack>
      <VStack gap={20}>
        <VStack>
          {chunkedList[currentIndex]?.map((cheer, index) => (
            <Link key={cheer.cheerId} href={`/stores/${cheer.storeId}`}>
              <RecentSupportCard
                style={{
                  backgroundColor: BACKGROUND_COLORS[index % 3],
                  transform:
                    index === 1 ? "rotate(-4deg)" : "translate3d(0,0,0)",
                }}
                store={{
                  name: cheer.storeName,
                  imageUrl: cheer.imageUrl,
                  location: `${cheer.storeDistrict} ${cheer.storeNeighborhood}`,
                  category: cheer.storeCategory,
                }}
                content={cheer.cheerDescription}
              />
            </Link>
          ))}
        </VStack>
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
    </VStack>
  );
};

type RecentSupportCardProps = {
  store: {
    name: string;
    imageUrl: string;
    location: string;
    category: string;
  };
  content: string;
} & HTMLAttributes<HTMLDivElement>;

const RecentSupportCard = ({
  store,
  content,
  ...restProps
}: RecentSupportCardProps) => {
  return (
    <VStack gap={8} className={styles.recentSupportCard} {...restProps}>
      <HStack gap={12}>
        <Image
          width={40}
          height={40}
          alt={`${store.name} 가게 이미지`}
          className={styles.storeImage}
          src={store.imageUrl}
          // TODO: 추후 제거
          unoptimized
        />
        <VStack gap={2}>
          <Text as='span' typo='body2Sb' color='text.normal'>
            {store.name}
          </Text>
          <HStack gap={6} align='center'>
            <Separated by={<hr className={styles.divider} />}>
              <Text as='span' typo='caption1Md' color='text.alternative'>
                {store.location}
              </Text>
              <Text as='span' typo='caption1Md' color='text.alternative'>
                {store.category}
              </Text>
            </Separated>
          </HStack>
        </VStack>
      </HStack>
      <Text
        as='p'
        typo='body2Md'
        color='text.normal'
        className={styles.cheersContent}
      >
        {content}
      </Text>
    </VStack>
  );
};

const RecentSupportCardContentSkeleton = () => {
  return (
    <VStack gap={16}>
      <HStack justify='between'>
        <Text as='h2' color='text.normal' typo='title2Sb'>
          가게에 전하는 따뜻한 응원
        </Text>
        <TextButton variant='assistive' size='small' disabled>
          <HStack gap={4} align='center'>
            새로고침
            <ResetIcon width={16} height={16} />
          </HStack>
        </TextButton>
      </HStack>

      <VStack gap={20}>
        <Skeleton width='100%' height={400} radius={26} />
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
    </VStack>
  );
};
