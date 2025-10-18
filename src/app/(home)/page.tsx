"use client";

import { RegisterFloatingButton } from "@/features/cheer";
import { Bleed } from "@/shared/components/ui/Bleed";
import { Spacer } from "@/shared/components/ui/Spacer";
import { VStack } from "@/shared/components/ui/Stack";
import { colors } from "@/shared/styles";

import { RecentCheers, RegisterPopup, StoreList, Story } from "./_components";
import { ServiceIntroBottomSheet } from "./_components/ServiceIntroBottomSheet";

export default function HomePage() {
  return (
    <>
      <Bleed inlineEnd={20}>
        <Spacer size={12} />
        <Story />
      </Bleed>
      <Spacer size={32} />
      <VStack gap={32}>
        <RecentCheers />

        <Bleed inline={20}>
          <Spacer
            size={12}
            style={{ backgroundColor: colors.coolNeutral[98] }}
          />
        </Bleed>

        <StoreList />
      </VStack>
      <RegisterFloatingButton />
      <ServiceIntroBottomSheet />
      <RegisterPopup />
    </>
  );
}
