"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

import { memberQueryOptions } from "@/features/member/api";
import { cheeredMemberQueryOptions } from "@/features/store";
import { AlertModal } from "@/shared/components/ui/AlertModal";
import { Button } from "@/shared/components/ui/Button";
import { VStack } from "@/shared/components/ui/Stack";
import { Text } from "@/shared/components/ui/Text";

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
        <AlertModal
          title='세 가게 모두 등록 완료!'
          content={
            <Text typo='body2Rg' color='text.alternative'>
              응원하는 가게는 <br /> 최대 3곳까지만 등록할 수 있어요.
            </Text>
          }
          trigger={
            <button className={styles.myCheerRegisterButton}>
              내 응원 등록
            </button>
          }
          footer={
            <AlertDialog.Action asChild>
              <Button
                variant='primary'
                size='large'
                fullWidth
                style={{ borderRadius: "0 0 1.2rem 1.2rem" }}
              >
                확인
              </Button>
            </AlertDialog.Action>
          }
        />
      ) : (
        <Link href='/stores/register'>
          {/* TODO: Outline 버튼으로 변경 */}
          <button className={styles.myCheerRegisterButton}>내 응원 등록</button>
        </Link>
      )}
    </VStack>
  );
};
