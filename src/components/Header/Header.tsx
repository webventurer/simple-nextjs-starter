"use client";

import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  logo: string;
  title: string;
  children: React.ReactNode;
}

export function Header({ logo, title, children }: HeaderProps) {
  const [navElement, actionsElement] = React.Children.toArray(children);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>{logo}</div>
            {title}
          </a>
        </div>

        <div
          className={`${styles.navContainer} ${isMenuOpen ? styles.navContainerOpen : styles.navContainerClosed}`}
        >
          {navElement}
          {actionsElement}
        </div>

        <button
          type="button"
          className={styles.hamburger}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
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
