"use client";

import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { cheeredMemberQueryOptions } from "@/app/(store)/_api/shop";
import LocationIcon from "@/assets/location.svg";
import MarketIcon from "@/assets/market-fill.svg";
import { Avatar } from "@/features/member";
import { storyMemberQueryOptions } from "@/features/story";
import { Bleed } from "@/shared/components/ui/Bleed";
import { Button } from "@/shared/components/ui/Button";
import { Spacer } from "@/shared/components/ui/Spacer";
import { HStack, VStack } from "@/shared/components/ui/Stack";
import { Tabs } from "@/shared/components/ui/Tabs";
import { Text } from "@/shared/components/ui/Text";

import * as styles from "./TabList.css";

export const TabList = () => {
  return (
    <Tabs.Root defaultValue='cheer' triggerLayout='equal'>
      <Bleed inline={20}>
        <Tabs.List>
          <Tabs.Trigger value='cheer'>응원 가게</Tabs.Trigger>
          <Tabs.Trigger value='story'>스토리</Tabs.Trigger>
        </Tabs.List>
      </Bleed>

      <Tabs.Content value='cheer' className={styles.cheerTabContent}>
        <Spacer size={20} />
        <Suspense>
          <CheerTab />
        </Suspense>
      </Tabs.Content>

      <Tabs.Content value='story'>
        <Suspense>
          <Bleed inline={20}>
            <Spacer size={1} />
            <StoryTab />
          </Bleed>
        </Suspense>
      </Tabs.Content>
    </Tabs.Root>
  );
};

const CheerTab = () => {
  const { data } = useSuspenseQuery(cheeredMemberQueryOptions());
  const stores = data.stores ?? [];

  if (stores.length === 0) {
    return (
      <EmptyTabList
        title={
          "아직 응원한 가게 없어요.\n소중한 가게에 응원의 한마디를 남겨주세요."
        }
        actionHref='/stores/register'
        actionText='응원하러 가기'
      />
    );
  }

  return stores.map((store, index) => (
    // TODO: /cheer 내가 응원하는 가게 카드와 동일 -> 공통 컴포넌트로 분리하기
    <Link href={`/stores/${store.id}`} key={store.id}>
      <VStack
        gap={12}
        className={styles.WRAPPER_COLORS[index % styles.WRAPPER_COLORS.length]}
      >
        <VStack gap={4}>
          <Text typo='title2Bd'>{store.name}</Text>
          <HStack align='center' gap={2}>
            <LocationIcon
              width={14}
              height={14}
              className={styles.locationIcon}
            />
            <Text typo='caption1Md' color='text.alternative'>
              {store.district} {store.neighborhood}
            </Text>
          </HStack>
        </VStack>

        <HStack
          justify='between'
          align='center'
          className={styles.cheerPeopleCountWrapper}
        >
          <Text typo='label2Md' color='text.normal'>
            내 가게를 응원하는 사람이{" "}
            <Text as='span' typo='label2Md' color='text.primary'>
              {store.cheerCount}명
            </Text>{" "}
            있어요!
          </Text>

          <HStack>
            <Avatar memberId={1} className={styles.avatarOverlap} />
            <Avatar memberId={2} className={styles.avatarOverlap} />
            <Avatar memberId={3} className={styles.avatarOverlap} />
          </HStack>
        </HStack>
      </VStack>
    </Link>
  ));
};

const StoryTab = () => {
  const { data } = useSuspenseQuery(storyMemberQueryOptions({ size: 50 }));
  const stories = data.stories ?? [];

  if (stories.length === 0) {
    return (
      <EmptyTabList
        title={
          "아직 등록한 스토리가 없어요.\n소중한 가게에 스토리를 남겨주세요."
        }
        actionHref='/'
        actionText='스토리 등록하러 가기'
      />
    );
  }

  return (
    <div className={styles.storyGrid}>
      {stories.map(story => (
        <Link href={`/story/${story.id}`} key={story.id}>
          <div className={styles.storyCard}>
            <Image
              src={story.images[0]?.url ?? ""}
              alt={story.storeName}
              className={styles.storyImage}
              fill
            />

            <div className={styles.overlay} />

            <div className={styles.storeNameWrapper}>
              <MarketIcon
                width={16}
                height={16}
                className={styles.marketIcon}
              />
              <Text typo='caption1Sb' color='text.white'>
                {story.storeName}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

type EmptyStateProps = {
  title?: string;
  actionHref?: string;
  actionText?: string;
};

const EmptyTabList = ({ title, actionHref, actionText }: EmptyStateProps) => (
  <VStack
    justify='center'
    align='center'
    gap={16}
    className={styles.emptyWrapper}
  >
    <Text typo='body1Md' color='text.alternative' className={styles.preLine}>
      {title}
    </Text>
    {actionHref && actionText && (
      <Link href={actionHref}>
        <Button size='medium'>{actionText}</Button>
      </Link>
    )}
  </VStack>
);
