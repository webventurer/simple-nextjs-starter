import React from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button/button";
import { parseMarkdownContent } from "@/lib/mdx-parser";
import styles from "./simple-hero.module.scss";

export interface SimpleHeroProps {
  image?: string;
  children?: React.ReactNode;
  variant?: "default" | "compact" | "centered";
  className?: string;
}

export function SimpleHero({
  image,
  children,
  variant, // No default value - base styles are in .hero
  className,
}: SimpleHeroProps) {
  // Parse markdown content
  const parsed = parseMarkdownContent(children);
  const title = parsed.title || "";
  const description = parsed.description || "";
  const buttons = parsed.links || [];

  // Split title to create highlight effect
  // "MDX Component Test Suite" -> "MDX Component" + "Test Suite" (highlighted)
  const splitTitle = (titleText: string) => {
    if (titleText.includes("Test Suite")) {
      const parts = titleText.split("Test Suite");
      return {
        main: parts[0].trim(),
        highlight: "Test Suite",
      };
    }
    // For other titles, highlight the last word
    const words = titleText.split(" ");
    if (words.length > 1) {
      const lastWord = words.pop();
      return {
        main: words.join(" "),
        highlight: lastWord,
      };
    }
    return { main: titleText, highlight: "" };
  };

  const titleParts = splitTitle(title);

  // Mock status items for demo (could be extracted from remaining content if needed)
  const status = [
    "Hero Component",
    "Section Component",
    "Features Grid",
    "CTA Component",
  ];

  return (
    <section
      className={clsx(
        styles.hero, // Base class contains default styling
        variant && styles[variant], // Only apply variant if provided
        className
      )}
    >
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot}></span>
            Component Test Active
          </div>
          <h1 className={styles.heroTitle}>
            {titleParts.main}
            {titleParts.highlight && (
              <>
                {" "}
                <span className={styles.heroTitleHighlight}>
                  {titleParts.highlight}
                </span>
              </>
            )}
          </h1>
          <p className={styles.heroDescription}>{description}</p>
          {buttons && buttons.length > 0 && (
            <div className={styles.heroButtons}>
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  url={button.href}
                  variant={index > 0 ? "outlined" : undefined}
                  className={styles.heroButton}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          )}
        </div>
        {status && status.length > 0 && (
          <div className={styles.heroImage}>
            <div className={styles.heroImageContainer}>
              <div className={styles.statusList}>
                {status.map((item, index) => (
                  <div key={index} className={styles.statusItem}>
                    <div
                      className={clsx(
                        styles.statusItemDot,
                        styles[`statusItemDot${index + 1}`] // Dynamic property access
                      )}
                    ></div>
                    <span className={styles.statusItemText}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}