"use client";

import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

import LeftArrowIcon from "@/assets/left-arrow.svg";
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
          <LeftArrowIcon className={styles.icon} onClick={handleClick} />
        }
      />
      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
}
