import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  logo: string;
  children: React.ReactNode;
}

export function Header({ logo, children }: HeaderProps) {
  const [titleElement, navElement] = React.Children.toArray(children);

  const title = React.isValidElement(titleElement)
    ? String(
        (titleElement.props as { children?: React.ReactNode })?.children || "",
      )
    : String(titleElement);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className={styles.logoText}>{logo}</span>
            </div>
            <h1 className={styles.logoText}>{title}</h1>
          </div>
          {navElement}
        </div>
      </div>
    </header>
  );
}

export function Nav({ children }: { children: React.ReactNode }) {
  return <nav className={styles.nav}>{children}</nav>;
}
