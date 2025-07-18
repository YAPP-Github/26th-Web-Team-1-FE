import { VStack } from "@/components/ui/Stack";

import { Banner } from "./_components/Banner";
import { MenuList } from "./_components/MenuList";
import { Profile } from "./_components/Profile";

export default async function ProfilePage() {
  return (
    <VStack>
      <Profile />
      <Banner />
      <MenuList />
    </VStack>
  );
}
