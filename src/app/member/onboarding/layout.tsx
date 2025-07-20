"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

import ChevronLeftIcon from "@/assets/chevron-left.svg";
import { GNB } from "@/components/ui/GNB";

import * as styles from "./layout.css";

type OnboardingLayoutProps = {
  children: ReactNode;
};

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <div className={styles.wrapper}>
      <GNB
        leftAddon={
          <button
            type='button'
            onClick={handleClick}
            aria-label='뒤로가기'
            className={styles.button}
          >
            <ChevronLeftIcon width={20} height={20} />
          </button>
        }
      />
      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
}
