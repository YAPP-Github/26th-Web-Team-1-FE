"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { at, chunk, compact } from "es-toolkit";
import { isEmpty } from "es-toolkit/compat";
import Image from "next/image";
import Link from "next/link";
import { type HTMLAttributes, useState } from "react";
import { Separated } from "react-simplikit";

import LogoWordMark from "@/assets/logo-wordmark.svg";
import ResetIcon from "@/assets/reset-20.svg";
import { cheerQueryOptions } from "@/features/cheer";
import { Button } from "@/shared/components/ui/Button";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Tag } from "@/shared/components/ui/Tag";
import { Text } from "@/shared/components/ui/Text";
import { TextButton } from "@/shared/components/ui/TextButton";
import { ALL_TAGS } from "@/shared/constants/tag.constants";
import { colors } from "@/shared/styles";

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
                  imageUrl: cheer.images[0]?.url ?? "",
                  location: `${cheer.storeDistrict} ${cheer.storeNeighborhood}`,
                  category: cheer.storeCategory,
                }}
                content={cheer.cheerDescription}
                tags={cheer.tags}
              />
            </Link>
          ))}
        </VStack>
        <Link href='/cheer'>
          <Button
            variant='custom'
            size='large'
            className={styles.showAllButton}
            fullWidth
          >
            응원 전체보기
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
  tags: string[];
} & HTMLAttributes<HTMLDivElement>;

const RecentSupportCard = ({
  store,
  content,
  tags,
  ...restProps
}: RecentSupportCardProps) => {
  const selectedTags = ALL_TAGS.filter(tag => tags?.includes(tag.name));

  const visibleTags = compact(at(selectedTags, [0, 1]));

  return (
    <VStack gap={8} className={styles.recentSupportCard} {...restProps}>
      <HStack gap={12}>
        {store.imageUrl ? (
          <Image
            width={40}
            height={40}
            alt={`${store.name} 가게 이미지`}
            className={styles.storeImage}
            src={store.imageUrl}
          />
        ) : (
          <span className={styles.storeImageFallback}>
            <LogoWordMark
              width={30.16}
              height={16}
              color={colors.coolNeutral[96]}
            />
          </span>
        )}
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

      {isEmpty(selectedTags) ? null : (
        <HStack gap={8}>
          {visibleTags.map(tag => (
            <Tag key={tag.name}>
              <Image src={tag.iconUrl} alt={tag.label} width={14} height={14} />
              {tag.label}
            </Tag>
          ))}
          {selectedTags.length > 2 && <Tag>+{selectedTags.length - 2}</Tag>}
        </HStack>
      )}
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
