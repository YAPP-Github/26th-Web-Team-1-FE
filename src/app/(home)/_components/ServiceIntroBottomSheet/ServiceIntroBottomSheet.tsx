"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import CancelIcon from "@/assets/cancel.svg";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { Indicator } from "@/components/ui/Indicator";
import { Text } from "@/components/ui/Text";

import { INTRO_STEP_CONTENTS, type IntroStepContent } from "../../_constants";
import * as styles from "./ServiceIntroBottomSheet.css";

export const ServiceIntroBottomSheet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasWatchIntro = localStorage.getItem("watchIntro") === "true";

    if (!hasWatchIntro) {
      setIsOpen(true);
      localStorage.setItem("watchIntro", "true");
    }
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < INTRO_STEP_CONTENTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const currentContent = INTRO_STEP_CONTENTS[currentIndex] as IntroStepContent;

  return (
    <BottomSheet.Root open={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Content className={styles.content}>
        <BottomSheet.Title className={styles.titleWrapper}>
          <div className={styles.cancelIconWrapper}>
            <button
              type='button'
              onClick={handleClose}
              aria-label='서비스 소개 바텀시트 닫기'
            >
              <CancelIcon
                width={24}
                height={24}
                className={styles.cancelIcon}
              />
            </button>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              className={styles.title}
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Text typo='title1Bd' className={styles.mainTitle}>
                {currentContent.title}
              </Text>
              <Text typo='body2Rg' color='neutral.50'>
                {currentContent.subtitle}
              </Text>
            </motion.div>
          </AnimatePresence>
        </BottomSheet.Title>

        <BottomSheet.Body className={styles.body}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                width={335}
                height={252}
                src={currentContent.imageSrc}
                alt={currentContent.imageAlt}
              />
            </motion.div>
          </AnimatePresence>
          <Indicator
            totalCount={INTRO_STEP_CONTENTS.length}
            currentIndex={currentIndex}
            onClickDot={handleDotClick}
          />
        </BottomSheet.Body>

        <BottomSheet.Footer>
          <Button variant='primary' size='fullWidth' onClick={handleNext}>
            {currentContent.buttonText}
          </Button>
        </BottomSheet.Footer>
      </BottomSheet.Content>
    </BottomSheet.Root>
  );
};
