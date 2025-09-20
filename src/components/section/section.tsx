import React from "react";
import clsx from "clsx";
import { parseMarkdownContent } from "@/lib/mdx-parser";
import styles from "./section.module.scss";

export interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "gray" | "centered";
  className?: string;
}

export function Section({
  children,
  variant, // No default value - base styles are in .section
  className,
}: SectionProps) {
  // Parse markdown content
  const parsed = parseMarkdownContent(children);
  const title = parsed.title;
  const subtitle = parsed.description;
  const remainingContent = parsed.remaining;

  return (
    <section
      className={clsx(
        styles.section, // Base class contains default styling
        variant && styles[variant], // Only apply variant if provided
        className
      )}
    >
      <div className={styles.sectionContent}>
        {(title || subtitle) && (
          <div className={styles.sectionHeader}>
            {title && <h2 className={styles.sectionTitle}>{title}</h2>}
            {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
          </div>
        )}
        <div className={styles.sectionBody}>{remainingContent}</div>
      </div>
    </section>
  );
}