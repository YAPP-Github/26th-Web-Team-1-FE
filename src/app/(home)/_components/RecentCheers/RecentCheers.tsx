"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { chunk, noop } from "es-toolkit";
import Image from "next/image";
import { type HTMLAttributes, useState } from "react";
import { Separated } from "react-simplikit";

import ChevronLeft from "@/assets/chevron-left.svg";
import ChevronRight from "@/assets/chevron-right.svg";
import { Skeleton } from "@/components/ui/Skeleton";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import { cheerQueryOptions } from "../../_api/cheer";
import * as styles from "./RecentCheers.css";

const BACKGROUND_COLORS = ["#FEF8DD", "#FDE5E3", "#E0F2FF"];

export const RecentCheers = () => {
  return (
    <VStack gap={16}>
      <Text as='h2' color='text.normal' typo='title2Sb'>
        가게에 전하는 따뜻한 응원
      </Text>

      <Suspense clientOnly fallback={<RecentSupportCardContentSkeleton />}>
        <RecentSupportCardContent />
      </Suspense>
    </VStack>
  );
};

const RecentSupportCardContent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data } = useSuspenseQuery(cheerQueryOptions(10));

  const chunkedList = chunk(data.cheers, 3);

  return (
    <VStack gap={24}>
      <VStack>
        {chunkedList[currentIndex]?.map((cheer, index) => (
          <RecentSupportCard
            key={cheer.cheerId}
            style={{
              backgroundColor: BACKGROUND_COLORS[index % 3],
              transform: index === 1 ? "rotate(-4deg)" : "translate3d(0,0,0)",
            }}
            store={{
              name: cheer.storeName,
              imageUrl: cheer.imageUrl,
              location: `${cheer.storeDistrict} ${cheer.storeDistrict}`,
              category: cheer.storeCategory,
            }}
            content={cheer.cheerDescription}
          />
        ))}
      </VStack>

      <RecentSupportButtons
        currentIndex={currentIndex}
        totalCount={chunkedList.length - 1}
        onPrevious={() => setCurrentIndex(currentIndex - 1)}
        onNext={() => setCurrentIndex(currentIndex + 1)}
      />
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
          alt={store.name}
          className={styles.storeImage}
          src={store.imageUrl}
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

const RecentSupportButtons = ({
  currentIndex,
  totalCount,
  onPrevious,
  onNext,
}: {
  currentIndex: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
}) => {
  return (
    <HStack justify='between'>
      <button
        className={styles.recentCheersButton}
        disabled={currentIndex === 0}
        onClick={onPrevious}
      >
        <ChevronLeft width={24} height={24} />
      </button>
      <button
        className={styles.recentCheersButton}
        disabled={currentIndex === totalCount}
        onClick={onNext}
      >
        <ChevronRight width={24} height={24} />
      </button>
    </HStack>
  );
};

const RecentSupportCardContentSkeleton = () => {
  return (
    <VStack gap={24}>
      <Skeleton width='100%' height={400} radius={26} />
      <RecentSupportButtons
        currentIndex={0}
        totalCount={0}
        onPrevious={noop}
        onNext={noop}
      />
    </VStack>
  );
};
