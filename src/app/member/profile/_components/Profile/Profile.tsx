"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { memberQueryOptions } from "@/app/member/_api";
import { Text } from "@/components/ui/Text";

import { ProfileLayout } from "./ProfileLayout";

export const Profile = () => {
  const { data: member } = useSuspenseQuery(memberQueryOptions);

  return (
    <ProfileLayout>
      <Text typo='title2Sb' color='neutral.10'>
        {member.nickname}
      </Text>
      <Text typo='caption1Md' color='neutral.50'>
        {member.email}
      </Text>
    </ProfileLayout>
  );
};
