"use client";

import Link from "next/link";

import LogoWordmarkIcon from "@/assets/logo-wordmark.svg";
import SearchIcon from "@/assets/search.svg";
import { GNB } from "@/components/ui/GNB";

export const Header = () => {
  return (
    <GNB
      leftAddon={<LogoWordmarkIcon width={46} height={24} />}
      align='left'
      rightAddon={
        <Link href='/stores' aria-label='가게 검색'>
          <SearchIcon width={24} height={24} />
        </Link>
      }
    />
  );
};
