"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { memberQueryOptions } from "@/app/member/_api";
import LogoWordmarkIcon from "@/assets/logo-wordmark.svg";
import MarketIcon from "@/assets/market.svg";
import PersonIcon from "@/assets/person.svg";
import { Button } from "@/components/ui/Button";
import { GNB } from "@/components/ui/GNB";

export const Header = () => {
  const { data: member } = useQuery(memberQueryOptions);

  return (
    <GNB
      leftAddon={<LogoWordmarkIcon width={46} height={24} />}
      align='left'
      rightAddon={
        member?.id ? (
          <>
            {/* TODO: 가게 리스틑 페이지로 이동 */}
            <Link href='/'>
              <MarketIcon width={24} height={24} />
            </Link>
            <Link href='/member/profile'>
              <PersonIcon width={24} height={24} />
            </Link>
          </>
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
