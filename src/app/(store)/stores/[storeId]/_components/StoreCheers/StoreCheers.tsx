"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

import { storeCheersQueryOptions } from "@/app/(store)/_api/shop";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";

import * as styles from "./StoreCheers.css";

export const StoreCheers = ({ storeId }: { storeId: number }) => {
  return (
    <VStack gap={16} className={styles.storeCheersContainer}>
      <Text as='h3' typo='title2Sb' color='text.normal'>
        가게에 담긴 응원
      </Text>

      <Suspense clientOnly fallback={<CheerCardSkeleton />}>
        <CheerContent storeId={storeId} />
      </Suspense>
    </VStack>
  );
};

const CHEERS_SIZE = 50;

const CheerContent = ({ storeId }: { storeId: number }) => {
  const {
    data: { cheers },
  } = useSuspenseQuery(storeCheersQueryOptions(storeId, CHEERS_SIZE));

  const [visibleCount, setVisibleCount] = useState(3);

  const ITEMS_PER_PAGE = 3;
  const totalItems = cheers.length;
  const isAllVisible = visibleCount >= totalItems;
  const shouldShowToggleButton = totalItems > ITEMS_PER_PAGE;

  const handleToggle = () => {
    if (isAllVisible) {
      // 접기: 처음 3개만 보여주기
      setVisibleCount(ITEMS_PER_PAGE);
    } else {
      // 더보기: 3개씩 추가
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalItems));
    }
  };

  const visibleCards = cheers.slice(0, visibleCount);

  return (
    <VStack>
      <VStack gap={24}>
        {visibleCards.map(card => (
          <CheerCard
            key={card.id}
            author={card.memberNickname}
            content={card.description}
          />
        ))}
      </VStack>
      {shouldShowToggleButton && (
        <>
          <Spacer size={20} />
          <Button
            variant='assistive'
            size='large'
            fullWidth
            onClick={handleToggle}
          >
            {isAllVisible ? "접기" : "더보기"}
          </Button>
        </>
      )}

      <Spacer size={shouldShowToggleButton ? 12 : 20} />

      {/* 
        TODO: 가게 응원하기 버튼 클릭 시 가게 응원 페이지로 이동
        추후 가게 응원 등록 작업할 때 연결 예정
      */}
      <Link href={""}>
        <Button variant='primary' size='large' fullWidth>
          가게 응원하기
        </Button>
      </Link>
    </VStack>
  );
};

const CheerCard = ({
  author,
  content,
}: {
  author: string;
  content: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = content.length > 50;

  return (
    <VStack gap={12}>
      <HStack align='center' gap={8}>
        <span className={styles.cheerCardProfileImage}>아이콘</span>
        <Text as='span' typo='body1Sb' color='text.normal'>
          {author}
        </Text>
      </HStack>

      <HStack align='stretch'>
        <hr className={styles.cheerCardDivider} />
        <VStack className={styles.cheerCardContent} gap={4} align='start'>
          <Text
            as='p'
            typo='body2Rg'
            color='text.normal'
            className={styles.cheerCardContentText}
            data-expanded={isExpanded}
            data-long-text={isLongText}
          >
            {content}
          </Text>
          {isLongText && (
            <TextButton
              size='small'
              variant='assistive'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "접기" : "더보기"}
            </TextButton>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

const CheerCardSkeleton = () => {
  return (
    <VStack gap={12}>
      <Skeleton width='30%' height={28} radius={12} />
      <Skeleton width='100%' height={54} radius={12} />
    </VStack>
  );
};
