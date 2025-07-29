"use client";

import { Bleed } from "@/components/ui/Bleed";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";

import {
  RecentCheers,
  RecentlySupportedStores,
  StoreStory,
  Story,
} from "./_components";

export default function HomePage() {
  return (
    <>
      <Bleed inline={20}>
        <Story />
      </Bleed>
      <Spacer size={12} />
      <Spacer size={32} />
      <VStack gap={40}>
        <RecentCheers />
        <StoreStory />
        <RecentlySupportedStores />
      </VStack>
    </>
  );
}
