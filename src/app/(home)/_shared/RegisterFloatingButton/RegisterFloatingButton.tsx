"use client";

import { useRouter } from "next/navigation";

import PlusIcon from "@/assets/plus.svg";
import { FloatingButton } from "@/components/ui/FloatingButton";
import { HStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { useScrollThreshold } from "@/hooks";

import * as styles from "./RegisterFloatingButton.css";

export const RegisterFloatingButton = () => {
  const router = useRouter();
  const { isScrolled } = useScrollThreshold(200);

  const handleClick = () => {
    router.push("/stores/register");
  };

  return (
    <FloatingButton
      variant={isScrolled ? "scrolled" : "initial"}
      aria-label='응원 등록 페이지로 이동'
      onClick={handleClick}
    >
      {isScrolled ? (
        <PlusIcon width={24} height={24} className={styles.plusIcon} />
      ) : (
        <HStack align='center' gap={4}>
          <PlusIcon width={16} height={16} className={styles.plusIcon} />
          <Text typo='body2Sb' color='text.white'>
            응원 등록
          </Text>
        </HStack>
      )}
    </FloatingButton>
  );
};
