import clsx from "clsx";
import type React from "react";
import styles from "./SimpleHeader.module.scss";

export interface SimpleHeaderProps {
  children: React.ReactNode;
  variant?: "compact" | "transparent";
  className?: string;
}

export function SimpleHeader({
  children,
  variant,
  className,
}: SimpleHeaderProps) {
  return (
    <header
      className={clsx(styles.header, variant && styles[variant], className)}
    >
      <div className={styles.headerContent}>
        <div className={styles.headerInner}>{children}</div>
      </div>
    </header>
  );
}
