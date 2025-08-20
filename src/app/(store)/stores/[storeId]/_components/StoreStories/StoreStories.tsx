"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { storeDetailQueryOptions } from "@/app/(store)/_api/shop";
import { Avatar } from "@/app/member/_components/Avatar";
import { storiesByKakaoIdQueryOptions } from "@/app/story/_api";
import CameraIcon from "@/assets/camera.svg";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { colors } from "@/styles";

import * as styles from "./StoreStories.css";

export const StoreStories = ({ storeId }: { storeId: number }) => {
  const router = useRouter();
  const { data: store } = useQuery(storeDetailQueryOptions(Number(storeId)));

  if (!store) {
    return (
      <VStack className={styles.storeStoriesContainer}>
        <Text>가게 정보를 불러오는 중...</Text>
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
                // TODO: 추후 제거
                unoptimized
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
