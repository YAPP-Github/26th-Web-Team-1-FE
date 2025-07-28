"use client";

import { Bleed } from "@/components/ui/Bleed";
import { GNB } from "@/components/ui/GNB";
import { VStack } from "@/components/ui/Stack";

import { ProgressBar } from "./_components";

export default function StoreRegisterPage() {
  return (
    <VStack>
      <Bleed inline={20}>
        <GNB title='가게 등록' rightAddon={<button>대충 x 버튼</button>} />
      </Bleed>
      <ProgressBar currentStep={1} totalSteps={3} />
    </VStack>
  );
}
