import * as styles from "./layout.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.mainContainer}>{children}</main>;
}
