"use client";

import Image from "next/image";
import Link from "next/link";

import ChevronRightIcon from "@/assets/chevron-right.svg";
import { Bleed } from "@/components/ui/Bleed";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import * as styles from "./Banner.css";

export const Banner = () => {
  return (
    <Bleed inline={20} className={styles.wrapper}>
      <HStack align='center' gap={8}>
        <Image
          src='/images/store.png'
          alt='가게 이미지'
          width={55}
          height={55}
        />
        <VStack gap={4} justify='center'>
          <Text typo='body1Sb' color='neutral.10'>
            당신의 소중한 가게를 소개해주세요
          </Text>
          {/* TODO: [가게 등록하기] url로 변경 */}
          <Link href='/' className={styles.linkWrapper}>
            <Text typo='label2Sb' color='neutral.10'>
              가게 등록하기
            </Text>
            <ChevronRightIcon width={16} height={16} className={styles.icon} />
          </Link>
        </VStack>
      </HStack>
    </Bleed>
  );
};
