"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

import CancelIcon from "@/assets/cancel.svg";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Button } from "@/components/ui/Button";
import { Indicator } from "@/components/ui/Indicator";
import { Spacer } from "@/components/ui/Spacer";
import { Text } from "@/components/ui/Text";

import { INTRO_STEP_CONTENTS, type IntroStepContent } from "../../_constants";
import * as styles from "./ServiceIntroBottomSheet.css";

export const ServiceIntroBottomSheet = () => {
  const slickRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasWatchIntro = localStorage.getItem("watchIntro") === "true";
    if (!hasWatchIntro) {
      setIsOpen(true);
      localStorage.setItem("watchIntro", "true");
    }
  }, []);

  const sliderSettings = {
    arrows: false,
    beforeChange: (current: number, next: number) => {
      setCurrentIndex(next);
    },
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    slickRef.current?.slickGoTo(index);
  };

  const handleNext = () => {
    if (currentIndex < INTRO_STEP_CONTENTS.length - 1) {
      slickRef.current?.slickNext();
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
        <BottomSheet.Title className={styles.iconWrapper}>
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
        </BottomSheet.Title>

        <BottomSheet.Body className={styles.body}>
          <div className={styles.sliderContainer}>
            <Slider ref={slickRef} {...sliderSettings}>
              {INTRO_STEP_CONTENTS.map(content => (
                <>
                  <AnimatePresence mode='wait'>
                    <motion.div
                      className={styles.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Text typo='title1Bd' className={styles.mainTitle}>
                        {content.title}
                      </Text>
                      <Text typo='body2Rg' color='neutral.50'>
                        {content.subtitle}
                      </Text>
                    </motion.div>
                  </AnimatePresence>

                  <Spacer size={28} />

                  <AnimatePresence mode='wait'>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={styles.imageWrapper}
                    >
                      <Image
                        width={335}
                        height={252}
                        src={content.imageSrc}
                        alt={content.imageAlt}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </>
              ))}
            </Slider>
          </div>

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
