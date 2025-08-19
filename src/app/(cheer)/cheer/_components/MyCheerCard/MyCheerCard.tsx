"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ReactNode, useRef, useState } from "react";
import Slider, { type Settings } from "react-slick";

import { cheeredMemberQueryOptions } from "@/app/(home)/_api/shop";
import { type CheeredStore } from "@/app/(store)/_api/shop";
import { Avatar } from "@/app/member/_components/Avatar";
import LocationIcon from "@/assets/location.svg";
import MarketIcon from "@/assets/market-fill.svg";
import { Button } from "@/components/ui/Button";
import { Indicator } from "@/components/ui/Indicator";
import { Spacer } from "@/components/ui/Spacer";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import { SLIDER_SETTINGS } from "../../constants";
import * as styles from "./MyCheerCard.css";

export const MyCheerCard = () => {
  const router = useRouter();
  const { data } = useQuery(cheeredMemberQueryOptions());

  const slickRef = useRef<Slider>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const stores = data?.stores ?? [];

  const settings: Settings = {
    ...SLIDER_SETTINGS,
    beforeChange: () => setIsDragging(true),
    afterChange: (next: number) => {
      setCurrentIndex(next);
      setIsDragging(false);
    },
  };

  const handleClickDot = (index: number) => {
    setCurrentIndex(index);
    slickRef.current?.slickGoTo(index);
  };

  const handleStoreClick = (storeId: number) => {
    if (isDragging) return;
    router.push(`/stores/${storeId}`);
  };

  return stores.length > 0 ? (
    <MyCheerCardLayout
      right={
        <Indicator
          totalCount={stores.length}
          currentIndex={currentIndex}
          onClickDot={index => handleClickDot(index)}
        />
      }
    >
      <Slider ref={slickRef} {...settings}>
        {stores.map(store => (
          <StoreCard
            key={store.id}
            store={store}
            onStoreClick={() => handleStoreClick(store.id)}
          />
        ))}
      </Slider>
    </MyCheerCardLayout>
  ) : (
    <EmptyCard />
  );
};

type MyCheerCardLayoutProps = {
  right?: ReactNode;
  children: ReactNode;
};

const MyCheerCardLayout = ({ right, children }: MyCheerCardLayoutProps) => {
  return (
    <VStack className={styles.wrapper}>
      <HStack justify='between' align='center'>
        <Text typo='caption1Sb'>내가 응원하는 가게</Text>
        {right}
      </HStack>

      <Spacer size={8} />

      {children}
    </VStack>
  );
};

type StoreCardProps = {
  store: CheeredStore;
  onStoreClick: () => void;
};

const StoreCard = ({ store, onStoreClick }: StoreCardProps) => {
  return (
    <div onClick={onStoreClick}>
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

      <Spacer size={16} />

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
    </div>
  );
};

const EmptyCard = () => {
  return (
    <MyCheerCardLayout>
      <VStack gap={4}>
        <Text typo='title2Bd'>아직 응원하는 가게가 없어요!</Text>
        <Text typo='caption1Md' color='text.alternative'>
          내가 자주 가는 곳을 응원하세요
        </Text>
      </VStack>

      <Spacer size={16} />

      <Button className={styles.button} size='medium'>
        <MarketIcon width={18} height={18} />
        <Link href='/stores/register'>
          <Text typo='body2Sb' color='text.white'>
            가게 응원하기
          </Text>
        </Link>
      </Button>
    </MyCheerCardLayout>
  );
};
