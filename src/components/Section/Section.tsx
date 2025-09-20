import clsx from "clsx";
import type React from "react";

import styles from "./Section.module.scss";

export interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "strong" | "subtle";
  className?: string;
}

export function Section({ children, variant, className }: SectionProps) {
  const classes = clsx(styles.section, variant && styles[variant], className);

  return (
    <section className={classes}>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
