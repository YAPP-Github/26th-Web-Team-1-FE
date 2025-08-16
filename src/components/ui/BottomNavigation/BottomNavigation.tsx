"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HStack, VStack } from "../Stack";
import { Text } from "../Text";
import { BOTTOM_NAVIGATION_ITEMS } from "./BottomNavigation.constants";
import * as styles from "./BottomNavigation.css";

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <HStack
      as='nav'
      align='center'
      justify='between'
      className={styles.wrapper}
    >
      {BOTTOM_NAVIGATION_ITEMS.map(item => {
        const Icon = item.icon;
        const active = pathname === item.path;
        return (
          <Link href={item.path} key={item.id}>
            <VStack align='center' gap={2}>
              <Icon
                width={24}
                height={24}
                className={styles.icon({ active })}
              />
              <Text
                typo='caption2Md'
                color={active ? "icon.black" : "icon.gray"}
              >
                {item.label}
              </Text>
            </VStack>
          </Link>
        );
      })}
    </HStack>
  );
};
