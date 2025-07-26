"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
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

  const { data } = useSuspenseQuery(articleQueryOptions(ARTICLE_SIZE));

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
          {data.articles.map(({ imageUrl, title, subtitle, articleUrl }) => (
            <StoreStoryCard
              key={title}
              src={imageUrl}
              title={title}
              description={subtitle}
              articleUrl={articleUrl}
            />
          ))}
        </Slider>
      </div>
      <HStack gap={6}>
        {data.articles.map((_, index) => (
          <span
            key={index}
            data-active={currentIndex === index}
            className={styles.dot}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </HStack>
    </VStack>
  );
};

type StoreStoryCardProps = {
  src: string;
  title: string;
  description: string;
  articleUrl: string;
};

const StoreStoryCard = ({
  src,
  title,
  description,
  articleUrl,
  ...props
}: StoreStoryCardProps) => {
  return (
    <Link
      href={articleUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.storyCard}
      draggable={false}
      {...props}
    >
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
    </Link>
  );
};

const StoreStorySkeleton = () => {
  return (
    <VStack gap={16} align='center'>
      <Skeleton width='100%' height={172} radius={radius[160]} />
      <HStack gap={6}>
        {Array.from({ length: 3 }).map((_, id) => (
          <span key={id} className={styles.dot} />
        ))}
      </HStack>
    </VStack>
  );
};
