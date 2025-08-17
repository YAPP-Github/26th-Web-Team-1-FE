"use client";

import { useRouter } from "next/navigation";

import ChevronLeftIcon from "@/assets/chevron-left.svg";
import { GNB } from "@/components/ui/GNB";

import * as styles from "./Header.css";

export const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
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
  );
};
