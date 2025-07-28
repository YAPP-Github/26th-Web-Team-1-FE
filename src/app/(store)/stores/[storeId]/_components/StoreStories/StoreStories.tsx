"use client";

import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import * as styles from "./StoreStories.css";

export const StoreStories = ({ storeId }: { storeId: string }) => {
  void storeId;

  const isEmpty = true;

  return (
    <VStack className={styles.storeStoriesContainer}>
      {isEmpty ? <EmptyStoreStories /> : <StoreStoriesContent />}

      <Spacer size={20} />

      <Button variant='assistive' size='large' fullWidth>
        방문 스토리 남기기
      </Button>
    </VStack>
  );
};

const StoreStoriesContent = () => {
  return (
    <VStack>
      <Text as='h3' typo='title2Sb' color='text.normal'>
        가게에 담긴 스토리
      </Text>

      <Spacer size={16} />

      <div>스토리들</div>
    </VStack>
  );
};

const EmptyStoreStories = () => {
  return (
    <VStack gap={8} align='center'>
      <Text as='p' typo='title3Sb' color='#000'>
        이 가게의 첫 방문 기록을 남겨주세요
      </Text>
      <Text
        as='p'
        typo='body2Rg'
        color='#767676'
        style={{ textAlign: "center" }}
      >
        사진과 짧은 이야기로 나의 맛있는 순간을 <br />
        쉽게 공유해보세요
      </Text>
    </VStack>
  );
};
