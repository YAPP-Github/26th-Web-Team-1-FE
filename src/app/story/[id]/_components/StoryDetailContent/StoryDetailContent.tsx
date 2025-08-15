"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar } from "@/app/member/_components/Avatar";
import { storiesQueryOptions } from "@/app/story/_api";
import CancelIcon from "@/assets/cancel.svg";
import LocationIcon from "@/assets/location.svg";
import MarketFillIcon from "@/assets/market-fill.svg";
import { GNB } from "@/components/ui/GNB";
import { Text } from "@/components/ui/Text";

import { storyDetailQueryOptions } from "../../_api";
import { KAKAO_PLACE_URL, STORIES_LIMIT } from "../../_constants";
import * as styles from "./StoryDetailContent.css";

type StoryDetailContentProps = {
  storyId: string;
};

export const StoryDetailContent = ({ storyId }: StoryDetailContentProps) => {
  const router = useRouter();

  const { data: story } = useSuspenseQuery(storyDetailQueryOptions(storyId));
  const { data: storiesData } = useSuspenseQuery(
    storiesQueryOptions(STORIES_LIMIT)
  );

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const currentStory = storiesData.stories.findIndex(
    s => s.storyId.toString() === storyId
  );

  const hasPrevious = currentStory > 0;
  const hasNext = currentStory < storiesData.stories.length - 1;

  const handleCancelClick = () => {
    router.push("/");
  };

  const handleToggle = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handlePrevStory = () => {
    if (hasPrevious) {
      const prevStory = storiesData.stories[currentStory - 1];
      router.push(`/story/${prevStory?.storyId}`);
    }
  };

  const handleNextStory = () => {
    if (hasNext) {
      const nextStory = storiesData.stories[currentStory + 1];
      router.push(`/story/${nextStory?.storyId}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gnbOverlay}>
        <GNB
          background='transparent'
          rightAddon={
            <button
              type='button'
              className={styles.cancelIconWrapper}
              onClick={handleCancelClick}
              aria-label='홈화면으로 이동'
            >
              <CancelIcon className={styles.cancelIcon} />
            </button>
          }
        />
      </div>

      <div className={styles.storyImageArea}>
        <button
          className={styles.zone({ side: "left" })}
          onClick={handlePrevStory}
        />
        <button
          className={styles.zone({ side: "right" })}
          onClick={handleNextStory}
        />
        <Image
          src={story.imageUrl}
          alt={`${story.storeName} 스토리`}
          fill
          priority
          objectFit='contain'
          // TODO: 추후 제거
          unoptimized
        />
      </div>

      <div className={styles.informationContent}>
        <div className={styles.userWrapper}>
          <Avatar memberId={story.memberId} />
          <Text typo='body1Sb' color='common.100'>
            {story.memberNickname}
          </Text>
        </div>

        {story.description && (
          <div className={styles.descriptionContainer}>
            <motion.div
              className={`${styles.descriptionText} ${
                isDescriptionExpanded ? styles.expanded : styles.collapsed
              }`}
              onClick={handleToggle}
              animate={{
                height: isDescriptionExpanded ? "auto" : "2.2rem",
              }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              style={{
                overflow: "hidden",
              }}
            >
              <Text typo='body1Sb' color='common.100'>
                {story.description}
              </Text>
            </motion.div>
          </div>
        )}

        <div className={styles.tagContainer}>
          <div className={styles.tag}>
            <MarketFillIcon className={styles.tagIcon} />
            {story.storeId ? (
              <Link href={`/stores/${story.storeId}`}>
                <Text typo='label1Sb' color='common.100'>
                  {story.storeName}
                </Text>
              </Link>
            ) : (
              <Text typo='label1Sb' color='common.100'>
                {story.storeName}
              </Text>
            )}
          </div>
          <a
            href={`${KAKAO_PLACE_URL}/${story.storeKakaoId}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className={styles.tag}>
              <LocationIcon className={styles.tagIcon} />
              <Text typo='label1Sb' color='common.100'>
                {story.storeDistrict} {story.storeNeighborhood}
              </Text>
            </div>
          </a>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          className={styles.descriptionOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
    </div>
  );
};
