"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar } from "@/app/member/_components/Avatar";
import CancelIcon from "@/assets/cancel.svg";
import LocationIcon from "@/assets/location.svg";
import MarketFillIcon from "@/assets/market-fill.svg";
import { GNB } from "@/components/ui/GNB";
import { Text } from "@/components/ui/Text";

import { storyDetailQueryOptions } from "../../_api";
import * as styles from "./StoryDetailContent.css";

type StoryDetailContentProps = {
  storyId: string;
};

const KAKAO_PLACE_URL = "https://place.map.kakao.com";

export const StoryDetailContent = ({ storyId }: StoryDetailContentProps) => {
  const router = useRouter();

  const { data: story } = useSuspenseQuery(storyDetailQueryOptions(storyId));

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleCancelClick = () => {
    router.push("/");
  };

  const handleToggle = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
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

      <div className={styles.imageCard}>
        <Image
          src={story.imageUrl}
          alt={`${story.storeName} 스토리`}
          fill
          className={styles.image}
          priority
        />
        <div className={styles.imageContent}>
          <div className={styles.userWrapper}>
            <Avatar memberId={story.memberId} />
            <Text typo='body1Sb' color='common.100'>
              {story.memberNickname}
            </Text>
          </div>

          {story?.description && (
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
              {/* TODO: 가게가 등록되어 있을 경우, 가게 상세페이지로 이동 */}
              <Text typo='label1Sb' color='common.100'>
                {story.storeName}
              </Text>
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
          {isDescriptionExpanded && (
            <motion.div
              className={styles.descriptionOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
