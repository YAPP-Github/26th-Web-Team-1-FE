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
    <main className={styles.wrapper}>
      <Header />
      <div className={styles.content}>{children}</div>
      <BottomNavigation />
    </main>
  );
}
