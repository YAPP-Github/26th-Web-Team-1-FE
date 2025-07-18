"use client";

import { useQuery } from "@tanstack/react-query";

import { memberQueryOptions } from "@/app/member/_api";
import Bapurit from "@/assets/logo/front-bapurit.svg";
import { HStack, VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import * as styles from "./Profile.css";

export const Profile = () => {
  const { data: member, isLoading } = useQuery(memberQueryOptions);

  // TODO: 로딩 스피너 or 스켈레톤 정해지면 수정
  if (isLoading) {
    return (
      <HStack gap={16} className={styles.wrapper}>
        <div className={styles.imageBackground}>
          <Bapurit width={61} height={61} />
        </div>
        <VStack justify='center' gap={4}>
          <Text typo='title2Sb' color='neutral.10'>
            불러오는 중...
          </Text>
        </VStack>
      </HStack>
    );
  }

  return (
    <HStack gap={16} className={styles.wrapper}>
      <div className={styles.imageBackground}>
        <Bapurit width={61} height={61} />
      </div>
      <VStack justify='center' gap={4}>
        <Text typo='title2Sb' color='neutral.10'>
          {member?.nickname}
        </Text>
        <Text typo='caption1Md' color='neutral.50'>
          {member?.email}
        </Text>
      </VStack>
    </HStack>
  );
};
