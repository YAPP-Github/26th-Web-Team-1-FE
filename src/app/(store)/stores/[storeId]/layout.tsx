import { Bleed } from "@/shared/components/ui/Bleed";

import { StoreDetailGNB } from "./_components/StoreDetailGNB";
import * as styles from "./layout.css";

export default function StoreDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.storeDetailLayout}>
      <Bleed inline={20}>
        <StoreDetailGNB />
      </Bleed>

      {children}
    </div>
  );
}
