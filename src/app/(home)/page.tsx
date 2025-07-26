import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";

import {
  RecentCheers,
  RecentlySupportedStores,
  StoreStory,
} from "./_components";

export default function HomePage() {
  return (
    <>
      <Spacer size={12} />
      <div>대충 스토리</div>
      <Spacer size={32} />
      <VStack gap={40}>
        <RecentCheers />
        <StoreStory />
        <RecentlySupportedStores />
      </VStack>
    </>
  );
}
