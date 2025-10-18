import { BottomNavigation } from "@/shared/components/ui/BottomNavigation";

import { CheerHeader } from "./_components/CheerHeader";
import * as styles from "./layout.css";

export default function CheerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CheerHeader />
      <main className={styles.mainContainer}>{children}</main>
      <BottomNavigation />
    </>
  );
}
