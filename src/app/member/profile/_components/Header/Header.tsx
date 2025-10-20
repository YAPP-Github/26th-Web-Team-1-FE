"use client";

import { useRouter } from "next/navigation";

import SettingIcon from "@/assets/setting.svg";
import { GNB } from "@/shared/components/ui/GNB";

import * as styles from "./Header.css";

export const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/member/setting");
  };

  return (
    <GNB
      align='center'
      title='마이페이지'
      rightAddon={
        <button
          type='button'
          onClick={handleClick}
          aria-label='홈으로 이동하기'
          className={styles.button}
        >
          <SettingIcon
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
