"use client";

import { type ReactNode } from "react";

import Bapurit from "@/assets/logo/symbol.svg";
import { HStack, VStack } from "@/shared/components/ui/Stack";

import * as styles from "./Profile.css";

export type ProfileLayoutProps = {
  children: ReactNode;
};

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <HStack gap={16} className={styles.wrapper}>
      <div className={styles.imageBackground}>
        <Bapurit width={61} height={61} />
      </div>
      <VStack justify='center' gap={8}>
        {children}
      </VStack>
    </HStack>
  );
};
