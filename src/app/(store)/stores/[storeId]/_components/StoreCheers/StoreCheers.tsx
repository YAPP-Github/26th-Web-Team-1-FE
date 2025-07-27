"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { TextButton } from "@/components/ui/TextButton";

import * as styles from "./StoreCheers.css";

const MOCK_CHEER_CARDS = [
  {
    author: "구마",
    content: "짧은 응원 내용입니다.",
  },
  {
    author: "감자",
    content:
      "정말 긴 응원 내용입니다. 이 가게는 정말 맛있고 사장님도 친절하시고 음식도 정성스럽게 만들어주시고 가격도 저렴해서 자주 와서 먹고 있습니다. 앞으로도 계속 번창하시길 바라며 많은 사람들이 이 맛집을 알아봤으면 좋겠습니다. 진짜 최고의 가게입니다!",
  },
  {
    author: "호박",
    content: "짧은 응원 내용입니다.",
  },
  {
    author: "감구마",
    content: "짧은 응원 내용입니다.",
  },
  {
    author: "바나나",
    content:
      "중간 길이의 응원 메시지입니다. 이 가게 음식이 정말 맛있어서 자주 방문하고 있어요. 사장님도 너무 친절하셔서 기분 좋게 식사할 수 있습니다.",
  },
  {
    author: "딸기",
    content: "여기 진짜 맛집이에요! 강추합니다.",
  },
  {
    author: "수박",
    content:
      "이 가게는 제가 가장 좋아하는 곳 중 하나입니다. 음식 맛도 훌륭하고 분위기도 좋아서 친구들과 자주 오곤 해요. 특히 이곳의 대표 메뉴는 정말 일품이라고 생각합니다. 앞으로도 계속 번창하시길 바라며, 더 많은 사람들이 이 맛집을 알게 되었으면 좋겠어요!",
  },
  {
    author: "포도",
    content: "맛있어요!",
  },
];

export const StoreCheers = ({ storeId }: { storeId: string }) => {
  void storeId;

  const [visibleCount, setVisibleCount] = useState(3);

  const ITEMS_PER_PAGE = 3;
  const totalItems = MOCK_CHEER_CARDS.length;
  const isAllVisible = visibleCount >= totalItems;

  const handleToggle = () => {
    if (isAllVisible) {
      // 접기: 처음 3개만 보여주기
      setVisibleCount(ITEMS_PER_PAGE);
    } else {
      // 더보기: 3개씩 추가
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, totalItems));
    }
  };

  const visibleCards = MOCK_CHEER_CARDS.slice(0, visibleCount);

  return (
    <VStack gap={16} className={styles.storeCheersContainer}>
      <Text as='h3' typo='title2Sb' color='text.normal'>
        가게에 담긴 응원
      </Text>

      <VStack>
        <VStack gap={24}>
          {visibleCards.map(card => (
            <CheerCard
              key={card.author}
              author={card.author}
              content={card.content}
            />
          ))}
        </VStack>
        <Spacer size={20} />
        <Button
          variant='assistive'
          size='large'
          fullWidth
          onClick={handleToggle}
        >
          {isAllVisible ? "접기" : "더보기"}
        </Button>
        <Spacer size={12} />

        {/* TODO: 가게 응원하기 버튼 클릭 시 가게 응원 페이지로 이동 */}
        <Link href={""}>
          <Button variant='primary' size='large' fullWidth>
            가게 응원하기
          </Button>
        </Link>
      </VStack>
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
