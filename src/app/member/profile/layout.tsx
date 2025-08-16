"use client";

import { type ReactNode } from "react";

import { BottomNavigation } from "@/components/ui/BottomNavigation";

import { Header } from "./_components/Header";
import * as styles from "./layout.css";

type MemberProfileLayoutProps = {
  children: ReactNode;
};

export default function MemberProfileLayout({
  children,
}: MemberProfileLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainWrapper}>{children}</main>
      <BottomNavigation />
    </div>
  );
}
