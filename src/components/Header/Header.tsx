import type React from "react";
import type { ReactElement } from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  logo: string;
  title: string;
  children: ReactElement<typeof Nav>;
}

export function Header({ logo, title, children }: HeaderProps) {
  if (children.type !== Nav) {
    throw new Error("<Header> only accepts a single <Nav> as child");
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.logoText}>{logo}</span>
          </div>
          <h1 className={styles.logoText}>{title}</h1>
        </div>
        {children}
      </div>
    </header>
  );
}

export function Nav({ children }: { children: React.ReactNode }) {
  return <nav className={styles.nav}>{children}</nav>;
}
