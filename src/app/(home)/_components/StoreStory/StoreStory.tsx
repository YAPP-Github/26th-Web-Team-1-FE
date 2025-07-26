"use client";

import { Suspense } from "@suspensive/react";
import { noop, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Slider from "react-slick";

import { Skeleton } from "@/components/ui/Skeleton";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { convertNewlineToJSX } from "@/lib/utils/convertNewlineToJSX";
import { radius } from "@/styles";

import { articleQueryOptions } from "../../_api/articles";
import * as styles from "./StoreStory.css";

const ARTICLE_SIZE = 3;

export const StoreStory = () => {
  return (
    <VStack gap={16}>
      <Text as='h2' color='text.normal' typo='title2Sb'>
        가게에 담긴 이야기
      </Text>

      <Suspense clientOnly fallback={<StoreStorySkeleton />}>
        <StoreStoryContent />
      </Suspense>
    </VStack>
  );
};

const StoreStoryContent = () => {
  const slickRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: { articles },
  } = useSuspenseQuery(articleQueryOptions(ARTICLE_SIZE));

  const handleDotClick = (index: number) => {
    slickRef.current?.slickGoTo(index);
  };

  return (
    <VStack gap={16} align='center'>
      <div className={styles.storeStoryList}>
        <Slider
          ref={slickRef}
          dots
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          beforeChange={(_, next) => setCurrentIndex(next)}
        >
          {articles.map(({ imageUrl, title, subtitle, articleUrl }) => (
            <Link
              key={title}
              href={articleUrl}
              target='_blank'
              rel='noopener noreferrer'
              draggable={false}
            >
              <StoreStoryCard
                src={imageUrl}
                title={title}
                description={subtitle}
              />
            </Link>
          ))}
        </Slider>
      </div>
      <StoreStoryIndicator
        totalCount={articles.length}
        currentIndex={currentIndex}
        onClickDot={handleDotClick}
      />
    </VStack>
  );
};

type StoreStoryCardProps = {
  src: string;
  title: string;
  description: string;
};

const StoreStoryCard = ({ src, title, description }: StoreStoryCardProps) => {
  return (
    <div className={styles.storyCard}>
      <Image fill src={src} alt='story' className={styles.storyImage} />
      <div className={styles.storyCardGradient} />
      <VStack gap={4} style={{ zIndex: 1, position: "relative" }}>
        <Text as='h4' color='text.white' typo='title3Sb'>
          {convertNewlineToJSX(title)}
        </Text>
        <Text as='p' color='neutral.95' typo='label2'>
          {convertNewlineToJSX(description)}
        </Text>
      </VStack>
    </div>
  );
};

type StoreStoryIndicatorProps = {
  totalCount: number;
  currentIndex: number;
  onClickDot: (index: number) => void;
};

const StoreStoryIndicator = ({
  totalCount,
  currentIndex,
  onClickDot,
}: StoreStoryIndicatorProps) => {
  return (
    <HStack gap={6}>
      {Array.from({ length: totalCount }).map((_, index) => (
        <span
          key={index}
          data-active={currentIndex === index}
          className={styles.dot}
          onClick={() => onClickDot(index)}
        />
      ))}
    </HStack>
  );
};

const StoreStorySkeleton = () => {
  return (
    <VStack gap={16} align='center'>
      <Skeleton width='100%' height={172} radius={radius[160]} />
      <StoreStoryIndicator totalCount={3} currentIndex={0} onClickDot={noop} />
    </VStack>
  );
};
