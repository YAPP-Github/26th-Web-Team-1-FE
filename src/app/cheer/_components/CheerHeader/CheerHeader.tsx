"use client";

import Link from "next/link";

import SearchIcon from "@/assets/search.svg";
import { GNB } from "@/shared/components/ui/GNB";

export const CheerHeader = () => {
  return (
    <GNB
      title='응원 모아보기'
      rightAddon={
        <Link href='/stores'>
          <SearchIcon width={24} height={24} />
        </Link>
      }
    />
  );
};
