import { Suspense } from "react";

import { VStack } from "@/components/ui/Stack";

import { Banner } from "./_components/Banner";
import { MenuList } from "./_components/MenuList";
import { Profile } from "./_components/Profile";
import { ProfileSkeleton } from "./_components/Profile/ProfileSkeleton";

export default function ProfilePage() {
  return (
    <VStack>
      <Suspense fallback={<ProfileSkeleton />}>
        <Profile />
      </Suspense>
      <Banner />
      <MenuList />
    </VStack>
  );
}
