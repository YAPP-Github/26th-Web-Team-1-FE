import { BottomNavigation } from "@/components/ui/BottomNavigation";

import { Header } from "./_components/Header";
import * as styles from "./layout.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.mainContainer}>{children}</main>
      <BottomNavigation />
    </>
  );
}
