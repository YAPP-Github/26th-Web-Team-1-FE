import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Slider, { type Settings } from "react-slick";

import InfoIcon from "@/assets/info.svg";
import { cheerListQueryOptions, type CheerResponse } from "@/features/cheer";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Tag } from "@/shared/components/ui/Tag";
import { Text } from "@/shared/components/ui/Text";
import { TextButton } from "@/shared/components/ui/TextButton";
import { ALL_TAGS } from "@/shared/constants/tag.constants";

import { CHEER_CARD_CONSTANTS, SLIDER_SETTINGS } from "../../constants";
import { useExpandableText } from "../../hooks";
import * as styles from "./CheerCard.css";

export const CheerCard = ({
  category,
  location,
  tag,
}: {
  category: string;
  location: string[];
  tag: string[];
}) => {
  const { data } = useQuery(
    cheerListQueryOptions({
      size: CHEER_CARD_CONSTANTS.DEFAULT_SIZE,
      category,
      location,
      tag,
    })
  );

  if (!data?.cheers || data.cheers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.backgroundWrapper}>
      <VStack gap={16}>
        {data?.cheers.map(cheer => (
          <Link href={`/stores/${cheer.storeId}`} key={cheer.cheerId}>
            <CheerCardItem key={cheer.cheerId} cheer={cheer} />
          </Link>
        ))}
      </VStack>
    </div>
  );
};

const EmptyState = () => {
  return (
    <VStack gap={12} align='center' className={styles.emptyWrapper}>
      <InfoIcon width={44} height={44} className={styles.infoIcon} />
      <Text typo='body1Md' color='#767676'>
        검색하신 응원을 찾을 수 없습니다. <br /> 다시 한 번 검색해 주세요.
      </Text>
    </VStack>
  );
};

type CheerCardItemProps = {
  cheer: CheerResponse;
};

const CheerCardItem = ({ cheer }: CheerCardItemProps) => {
  const { isExpanded, showMoreButton, textRef, toggleExpanded } =
    useExpandableText(cheer.cheerDescription);

  return (
    <VStack className={styles.wrapper} gap={12}>
      <Text typo='title3Sb'>{cheer.storeName}</Text>
      <HStack gap={6}>
        <Text typo='caption1Rg' color='text.alternative'>
          {cheer.storeDistrict} {cheer.storeNeighborhood}
        </Text>

        <Separator />

        <Text typo='caption1Rg' color='text.alternative'>
          {cheer.storeCategory}
        </Text>

        <Separator />

        <HStack>
          <Text typo='caption1Sb' color='text.alternative'>
            {cheer.memberNickname}
          </Text>
          <Text typo='caption1Rg' color='text.alternative'>
            님이 남긴 응원
          </Text>
        </HStack>
      </HStack>

      <div>
        <motion.div
          ref={textRef}
          className={clsx(
            styles.descriptionText,
            isExpanded && styles.descriptionTextExpanded
          )}
          onClick={toggleExpanded}
          animate={{
            height: showMoreButton && !isExpanded ? "6.2rem" : "auto",
          }}
          transition={CHEER_CARD_CONSTANTS.ANIMATION}
        >
          <Text typo='body2Rg'>{cheer.cheerDescription}</Text>
        </motion.div>
        {showMoreButton && (
          <TextButton
            variant='primary'
            size='small'
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              toggleExpanded();
            }}
            className={styles.moreButton}
          >
            {isExpanded ? "접기" : "더보기"}
          </TextButton>
        )}
      </div>

      <CheerCardImages images={cheer.images} storeName={cheer.storeName} />

      <CheerCardTags tags={cheer.tags} />
    </VStack>
  );
};

const Separator = () => (
  <Text typo='caption1Rg' color='neutral.95'>
    |
  </Text>
);

type CheerCardImagesProps = {
  images: Array<{ url: string; imageKey?: string }>;
  storeName: string;
};

const CheerCardImages = ({ images, storeName }: CheerCardImagesProps) => {
  const slickRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings: Settings = {
    ...SLIDER_SETTINGS,
    afterChange: (next: number) => {
      setCurrentIndex(next);
    },
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={styles.imageWrapper}>
      {images.length > 1 ? (
        <div>
          <Slider
            ref={slickRef}
            {...settings}
            className={styles.sliderContainer}
          >
            {images.map((image, idx) => (
              <div key={image.imageKey ?? idx} className={styles.sliderSlide}>
                <Image
                  src={image.url}
                  alt={`${storeName}-${idx + 1}`}
                  fill
                  objectFit='cover'
                />
              </div>
            ))}
          </Slider>
          <div className={styles.imageIndicator}>
            <HStack className={styles.imageIndicatorBackground}>
              <Text typo='label2Sb' color='text.white'>
                {currentIndex + 1} / {images.length}
              </Text>
            </HStack>
          </div>
        </div>
      ) : (
        <Image
          src={images[0]?.url ?? ""}
          alt={storeName}
          fill
          objectFit='cover'
        />
      )}
    </div>
  );
};

type CheerCardTagsProps = {
  tags?: string[];
};

const CheerCardTags = ({ tags }: CheerCardTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <HStack gap={8}>
      {tags.slice(0, 2).map(tagName => {
        const tagInfo = ALL_TAGS.find(tag => tag.name === tagName);
        if (!tagInfo) return null;

        return (
          <Tag key={tagName} size='small' variant='assistive'>
            <Image
              src={tagInfo.iconUrl}
              alt={tagInfo.label}
              width={14}
              height={14}
            />
            {tagInfo.label}
          </Tag>
        );
      })}
      {tags.length > 2 && (
        <Tag size='small' variant='assistive'>
          +{tags.length - 2}
        </Tag>
      )}
    </HStack>
  );
};
