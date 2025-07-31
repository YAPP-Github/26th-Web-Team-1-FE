import * as styles from "./layout.css";

export default function StoreListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
