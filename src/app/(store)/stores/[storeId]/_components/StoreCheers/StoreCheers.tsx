"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { slice } from "es-toolkit/compat";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { storeCheersQueryOptions } from "@/app/(store)/_api/shop";
import { Avatar } from "@/app/member/_components/Avatar";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Tag } from "@/components/ui/Tag";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";
import { ALL_TAGS } from "@/constants/tag.constants";

import * as styles from "./StoreCheers.css";
import { getContentBackgroundColor, getHeaderBackgroundColor } from "./utils";

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

const ITEMS_PER_PAGE = 3;

const THEMES = ["yellow", "pink", "blue"] as const;
type Theme = (typeof THEMES)[number];

const CheerContent = ({ storeId }: { storeId: number }) => {
  const {
    data: { cheers },
  } = useSuspenseQuery(storeCheersQueryOptions(storeId, CHEERS_SIZE));

  const [visibleCount, setVisibleCount] = useState(3);

  const totalItems = cheers.length;
  const isAllVisible = visibleCount >= totalItems;
  const showToggleButton = totalItems > ITEMS_PER_PAGE;

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
        {visibleCards.map((card, index) => (
          <CheerCard
            key={card.id}
            author={card.memberNickname}
            content={card.description}
            tags={card.tags}
            theme={THEMES[index % THEMES.length] as Theme}
          />
        ))}
      </VStack>
      {showToggleButton && (
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

      <Spacer size={showToggleButton ? 12 : 20} />

      <Link href={`/stores/register?storeId=${storeId}`}>
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
  tags,
  theme,
}: {
  author: string;
  content: string;
  tags: string[];
  theme: Theme;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongText = content.length > 50;

  const selectedTags = ALL_TAGS.filter(tag => tags.includes(tag.name));
  const visibleTags = isExpanded ? selectedTags : slice(selectedTags, 0, 2);
  const additionalTagsCount = Math.max(
    0,
    selectedTags.length - visibleTags.length
  );
  const showAdditionalTags = additionalTagsCount > 0 && !isExpanded;

  return (
    <motion.div
      className={styles.cheerCard}
      onClick={() => setIsExpanded(!isExpanded)}
      role='button'
      tabIndex={0}
      transition={{ duration: 0.3 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={styles.cheerCardHeader}
        style={{
          backgroundColor: getHeaderBackgroundColor(theme),
        }}
      >
        <Avatar
          // TODO: 추후 theme 지정 가능하게끔 수정
          memberId={THEMES.findIndex(t => t === theme)}
          className={styles.cheerCardAvatar}
        />
        <Text as='span' typo='body1Sb' color='text.normal'>
          {author}
        </Text>
      </div>

      <div
        className={styles.cheerCardContent}
        style={{
          backgroundColor: getContentBackgroundColor(theme),
        }}
      >
        <VStack gap={8} align='start'>
          <VStack gap={4} align='start'>
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

          <HStack gap={8} align='start' wrap='wrap'>
            {visibleTags.map(tag => (
              <Tag key={tag.name}>
                <Image
                  src={tag.iconUrl}
                  alt={tag.label}
                  width={16}
                  height={16}
                  className={styles.tagIcon}
                />
                <Text as='span' typo='caption1Sb' color='text.primary'>
                  {tag.label}
                </Text>
              </Tag>
            ))}

            {showAdditionalTags && (
              <Tag>
                <Text as='span' typo='caption1Sb' color='text.primary'>
                  +{additionalTagsCount}
                </Text>
              </Tag>
            )}
          </HStack>
        </VStack>
      </div>
    </motion.div>
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
