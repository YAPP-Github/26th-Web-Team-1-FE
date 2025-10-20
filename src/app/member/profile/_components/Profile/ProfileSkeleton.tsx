import { Skeleton } from "@/shared/components/ui/Skeleton";
import { radius } from "@/shared/styles";

import { ProfileLayout } from "./ProfileLayout";

export const ProfileSkeleton = () => {
  return (
    <ProfileLayout>
      <Skeleton width={80} height={20} radius={radius[40]} />
      <Skeleton width={160} height={20} radius={radius[40]} />
    </ProfileLayout>
  );
};
