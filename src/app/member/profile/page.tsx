import { Suspense } from "react";

import { Spacer } from "@/components/ui/Spacer";
import { VStack } from "@/components/ui/Stack";

import { Profile } from "./_components/Profile";
import { ProfileSkeleton } from "./_components/Profile/ProfileSkeleton";
import { TabList } from "./_components/TabList";

export default function ProfilePage() {
  return (
    <VStack>
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>

      <Spacer size={20} />

      <TabList />
    </VStack>
  );
}
