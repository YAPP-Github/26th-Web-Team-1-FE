"use client";

import Link from "next/link";

import { VStack } from "@/components/ui/Stack";

import { MENU_LIST } from "../../_constants/menuList.constants";
import * as styles from "./MenuList.css";

export const MenuList = () => {
  return (
    <>
      <VStack as='ul' gap={8} className={styles.wrapper}>
        {MENU_LIST.map(menu => (
          <li key={menu.id} className={styles.list}>
            {menu.isLogout ? (
              <button type='button' className={styles.menuItem}>
                {menu.label}
              </button>
            ) : (
              <Link href={menu.link!} className={styles.menuItem}>
                {menu.label}
              </Link>
            )}
          </li>
        ))}
      </VStack>
      {/* TODO: 로그아웃시 나타날 모달 연결 */}
    </>
  );
};
