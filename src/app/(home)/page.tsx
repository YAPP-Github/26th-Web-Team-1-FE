"use client";

import { Bleed } from "@/components/ui/Bleed";
import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";
import { colors } from "@/styles";

import { RecentCheers, RegisterPopup, StoreList, Story } from "./_components";
import { ServiceIntroBottomSheet } from "./_components/ServiceIntroBottomSheet";
import { RegisterFloatingButton } from "./_shared/RegisterFloatingButton";

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
