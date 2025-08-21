"use client";

import { type ReactNode } from "react";

import { SettingGNB } from "./_components/SettingGNB/SettingGNB";
import * as styles from "./layout.css";

type SettingLayoutProps = {
  children: ReactNode;
};

export default function SettingLayout({ children }: SettingLayoutProps) {
  return (
    <div>
      <SettingGNB />
      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
}
