import * as styles from "./layout.css";

export default function StoreRegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.storeRegisterLayout}>{children}</div>;
}
