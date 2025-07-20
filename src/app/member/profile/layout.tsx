"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

import ChevronLeftIcon from "@/assets/chevron-left.svg";
import { GNB } from "@/components/ui/GNB";

import * as styles from "./layout.css";

type MemberProfileLayoutProps = {
  children: ReactNode;
};

export default function MemberProfileLayout({
  children,
}: MemberProfileLayoutProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <GNB
        align='center'
        title='마이페이지'
        leftAddon={
          <button
            type='button'
            onClick={handleClick}
            aria-label='홈으로 이동하기'
            className={styles.button}
          >
            <ChevronLeftIcon
              width={24}
              height={24}
              onClick={handleClick}
              className={styles.icon}
            />
          </button>
        }
      />
      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
}
