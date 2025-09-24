import clsx from "clsx";
import type React from "react";

import styles from "./Section.module.scss";

export interface SectionProps {
  children: React.ReactNode;
  variant?: "strong" | "subtle";
  className?: string;
}

export default function Section({
  children,
  variant,
  className,
}: SectionProps) {
  return (
    <section
      className={clsx(styles.section, variant && styles[variant], className)}
    >
      <div className={styles.content}>{children}</div>
    </section>
  );
}
