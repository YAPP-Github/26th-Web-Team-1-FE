import { useRouter } from "next/navigation";

import ChevronLeftIcon from "@/assets/chevron-left.svg";
import { GNB } from "@/components/ui/GNB";

export const StoreListGNB = () => {
  const router = useRouter();

  return (
    <GNB
      title='가게 모아보기'
      leftAddon={
        <button onClick={() => router.back()} aria-label='뒤로가기'>
          <ChevronLeftIcon width={20} height={20} />
        </button>
      }
      rightAddon={<button>대충 유저 아이콘</button>}
    />
  );
};
