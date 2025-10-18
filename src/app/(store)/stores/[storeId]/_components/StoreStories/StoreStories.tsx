"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { storeDetailQueryOptions } from "@/app/(store)/_api/shop";
import { storiesByKakaoIdQueryOptions } from "@/app/story/_api";
import CameraIcon from "@/assets/camera.svg";
import { Avatar } from "@/features/member";
import { Button } from "@/shared/components/ui/Button";
import { Skeleton } from "@/shared/components/ui/Skeleton";
import { Spacer } from "@/shared/components/ui/Spacer";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Text } from "@/shared/components/ui/Text";
import { colors, radius } from "@/shared/styles";

import * as styles from "./StoreStories.css";

export const StoreStories = ({ storeId }: { storeId: number }) => {
  const router = useRouter();
  const { data: store, isLoading } = useQuery(
    storeDetailQueryOptions(Number(storeId))
  );

  if (!store || isLoading) {
    return (
      <VStack className={styles.storeStoriesContainer}>
        <Skeleton width={124} height={220} radius={radius[160]} />
      </VStack>
    );
  }

  const handleClick = () => {
    router.push("/");
  };

  return (
    <VStack className={styles.storeStoriesContainer}>
      <StoreStoriesContent kakaoId={store.kakaoId} />

      <Spacer size={20} />

      <Button variant='assistive' size='large' fullWidth>
        <HStack gap={6} align='center' onClick={handleClick}>
          <Text typo='body1Sb'>방문 스토리 남기기</Text>
          <CameraIcon color={colors.neutral[10]} />
        </HStack>
      </Button>
    </VStack>
  );
};

const StoreStoriesContent = ({ kakaoId }: { kakaoId: string }) => {
  const { data: stories } = useQuery(storiesByKakaoIdQueryOptions(kakaoId, 20));

  if (!stories || stories.stories.length === 0) {
    return <EmptyStoreStories />;
  }

  return (
    <VStack>
      <Text as='h3' typo='title2Sb' color='text.normal'>
        가게에 담긴 스토리
      </Text>

      <Spacer size={16} />
      <HStack gap={4}>
        {stories.stories.map(data => (
          <Link href={`/story/${data.storyId}`} key={data.storyId}>
            <div className={styles.storyWrapper}>
              <Image
                src={data.images?.[0]?.url ?? ""}
                alt='스토리 이미지'
                className={styles.image}
                width={124}
                height={220}
              />
              <div className={styles.overlay} />
              <HStack align='center' gap={4} className={styles.memberWrapper}>
                <Avatar memberId={data.memberId} />
                <Text
                  typo='label1Sb'
                  color='text.white'
                  className={styles.nickname}
                >
                  {data.memberNickname}
                </Text>
              </HStack>
            </div>
          </Link>
        ))}
      </HStack>
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
