// External libraries
import type React from "react";
import { cn } from "@/lib/utils";

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
      className={cn(
        styles.section, // Base class contains default styling
        variant && styles[variant], // Only apply variant if provided
        className,
      )}
    >
      <div className={styles.content}>{children}</div>
    </section>
  );
}
