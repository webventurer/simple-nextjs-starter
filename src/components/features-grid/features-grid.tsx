import React from "react";
import { parseMarkdownContent } from "@/lib/mdx-parser";
import styles from "./features-grid.module.scss";

export interface FeaturesGridProps {
  flavour?: "default" | "highlighted";
  children: React.ReactNode;
  className?: string;
}

export function FeaturesGrid({
  flavour = "default",
  children,
  className,
}: FeaturesGridProps) {
  // Parse markdown content to extract title/description, keep FeatureCard components
  const parsed = parseMarkdownContent(children);
  const title = parsed.title;
  const description = parsed.description;

  // Filter children to get FeatureCard components
  const featureCards: React.ReactNode[] = [];
  const otherContent: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // Check if it's a FeatureCard component (handles MDX component mapping)
      const childType = child.type;
      const isFeatureCard =
        childType === "FeatureCard" ||
        (typeof childType === "function" && childType.name === "FeatureCard") ||
        (childType &&
          typeof childType === "object" &&
          (childType as any).displayName === "FeatureCard") ||
        (childType &&
          typeof childType === "object" &&
          (childType as any).name === "FeatureCard");

      if (isFeatureCard) {
        featureCards.push(child);
      } else {
        otherContent.push(child);
      }
    } else {
      otherContent.push(child);
    }
  });

  // Use featureCards if we found any, otherwise use all remaining content
  const contentToRender = featureCards.length > 0 ? featureCards : otherContent;

  const gridClass =
    flavour === "highlighted"
      ? `${styles.featuresGrid} ${styles.highlighted}`
      : styles.featuresGrid;

  // If no title/description, render just the grid (for use inside Section components)
  if (!title && !description) {
    return (
      <div className={`${gridClass} ${className || ""}`}>{contentToRender}</div>
    );
  }

  // Full section rendering when title/description provided
  return (
    <section className={`${styles.featuresGridSection} ${className || ""}`}>
      <div className={styles.featuresGridContent}>
        {(title || description) && (
          <div className={styles.featuresGridHeader}>
            {title && <h2 className={styles.featuresGridTitle}>{title}</h2>}
            {description && (
              <p className={styles.featuresGridDescription}>{description}</p>
            )}
          </div>
        )}
        <div className={gridClass}>{contentToRender}</div>
      </div>
    </section>
  );
}