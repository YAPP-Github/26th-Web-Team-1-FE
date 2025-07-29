"use client";

import Link from "next/link";

import LogoWordmarkIcon from "@/assets/logo-wordmark.svg";
import { Button } from "@/components/ui/Button";
import { GNB } from "@/components/ui/GNB";

import * as styles from "./layout.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GNB
        leftAddon={<LogoWordmarkIcon width={46} height={24} />}
        align='left'
        rightAddon={
          <Link href='/login'>
            <Button variant='primary' size='small' style={{ width: "6.3rem" }}>
              로그인
            </Button>
          </Link>
        }
      />
      <main className={styles.mainContainer}>{children}</main>
    </>
  );
}
