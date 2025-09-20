import React from "react";
import clsx from "clsx";
import { parseMarkdownContent } from "@/lib/mdx-parser";
import styles from "./feature-card.module.scss";

export interface FeatureCardProps {
  children: React.ReactNode;
  variant?: "default" | "compact" | "highlighted";
  className?: string;
}

export function FeatureCard({
  children,
  variant, // No default value - base styles are in .featureCard
  className,
}: FeatureCardProps) {
  // Parse markdown content
  const parsed = parseMarkdownContent(children);
  const titleWithIcon = parsed.title || "";
  const description = parsed.description || "";

  // Extract icon and title from the title string (format: "🎯 Semantic HTML")
  const iconMatch = titleWithIcon.match(/^(\S+)\s+(.+)$/);
  const icon = iconMatch ? iconMatch[1] : "📄";
  const title = iconMatch ? iconMatch[2] : titleWithIcon;

  return (
    <div
      className={clsx(
        styles.featureCard, // Base class contains default styling
        variant && styles[variant], // Only apply variant if provided
        className
      )}
    >
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}