import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { memberQueryOptions } from "@/app/member/_api";
import ChevronLeftIcon from "@/assets/chevron-left.svg";
import PersonIcon from "@/assets/person.svg";
import { Button } from "@/components/ui/Button";
import { GNB } from "@/components/ui/GNB";

export const StoreListGNB = () => {
  const { data: member, isLoading } = useQuery({
    ...memberQueryOptions,
    retry: false,
  });

  const isLoggedIn = !isLoading && !!member?.id;

  const router = useRouter();

  return (
    <GNB
      title='가게 모아보기'
      leftAddon={
        <button onClick={() => router.back()} aria-label='뒤로가기'>
          <ChevronLeftIcon width={20} height={20} />
        </button>
      }
      rightAddon={
        isLoggedIn ? (
          <Link href='/member/profile'>
            <PersonIcon width={24} height={24} />
          </Link>
        ) : (
          <Link href='/login'>
            <Button variant='primary' size='small' style={{ width: "6.3rem" }}>
              로그인
            </Button>
          </Link>
        )
      }
    />
  );
};
