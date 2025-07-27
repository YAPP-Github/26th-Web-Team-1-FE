// TODO: gnb 분리 후 use client 제거 필요

"use client";

import ChevronLeftIcon from "@/assets/chevron-left.svg";
import { GNB } from "@/components/ui/GNB";

import * as styles from "./layout.css";

export default function StoreDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.storeDetailLayout}>
      <GNB
        leftAddon={
          <button style={{ display: "flex", alignItems: "center" }}>
            <ChevronLeftIcon width={24} height={24} />
          </button>
        }
        rightAddon={<button>대충 공유하기 버튼</button>}
      />

      {children}
    </div>
  );
}
