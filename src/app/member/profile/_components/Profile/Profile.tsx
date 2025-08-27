"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { cheeredMemberQueryOptions } from "@/app/(store)/_api/shop";
import { memberQueryOptions } from "@/app/member/_api";
import { AlertModal } from "@/components/ui/AlertModal";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

import * as styles from "./Profile.css";
import { ProfileLayout } from "./ProfileLayout";

export const Profile = () => {
  const { data: member } = useSuspenseQuery(memberQueryOptions);
  const { data } = useSuspenseQuery(cheeredMemberQueryOptions());
  const stores = data.stores ?? [];

  return (
    <VStack gap={20}>
      <ProfileLayout>
        <Text typo='title2Sb' color='neutral.10'>
          {member.nickname}
        </Text>
        <Text typo='caption1Md' color='neutral.50'>
          {member.email}
        </Text>
      </ProfileLayout>

      {stores.length >= 3 ? (
        <AlertModal.Root>
          <AlertModal.Trigger asChild>
            {/* TODO: Outline 버튼으로 변경 */}
            <button className={styles.myCheerRegisterButton}>
              내 응원 등록
            </button>
          </AlertModal.Trigger>
          <AlertModal.Content>
            <AlertModal.Header>
              <Image
                src='/images/polygon.png'
                alt='세 가게 모두 등록 완료!'
                width={60}
                height={60}
              />
              <Spacer size={20} />
              <AlertModal.Title>세 가게 모두 등록 완료!</AlertModal.Title>
              <AlertModal.Description>
                <Text typo='body2Rg' color='text.alternative'>
                  응원하는 가게는 <br /> 최대 3곳까지만 등록할 수 있어요.
                </Text>
              </AlertModal.Description>
            </AlertModal.Header>
            <AlertModal.Footer>
              <AlertModal.Action asChild>
                <Button
                  variant='primary'
                  size='large'
                  fullWidth
                  style={{ borderRadius: "0 0 1.2rem 1.2rem" }}
                >
                  확인
                </Button>
              </AlertModal.Action>
            </AlertModal.Footer>
          </AlertModal.Content>
        </AlertModal.Root>
      ) : (
        <Link href='/stores/register'>
          {/* TODO: Outline 버튼으로 변경 */}
          <button className={styles.myCheerRegisterButton}>내 응원 등록</button>
        </Link>
      )}
    </VStack>
  );
};
