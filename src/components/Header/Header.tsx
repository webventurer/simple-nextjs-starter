import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  logo: string;
  title: string;
  children: React.ReactNode;
}

export function Header({ logo, title, children }: HeaderProps) {
  const [navElement, actionsElement] = React.Children.toArray(children);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>{logo}</div>
            {title}
          </a>
        </div>
        {navElement}
        {actionsElement}
      </div>
    </header>
  );
}

export function Nav({ children }: { children: React.ReactNode }) {
  return <nav className={styles.nav}>{children}</nav>;
}

export function Actions({ children }: { children: React.ReactNode }) {
  return <div className={styles.actions}>{children}</div>;
}
