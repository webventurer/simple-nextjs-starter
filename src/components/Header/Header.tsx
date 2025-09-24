import type React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  logo: string;
  title: string;
  children: React.ReactNode;
}

export function Header({ logo, title, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>{logo}</div>
            {title}
          </a>
        </div>
        {children}
      </div>
    </header>
  );
}

export function Nav({ children }: { children: React.ReactNode }) {
  return <nav className={styles.nav}>{children}</nav>;
}
