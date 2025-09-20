import React from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button/button";
import { parseMarkdownContent } from "@/lib/mdx-parser";
import styles from "./cta.module.scss";

export interface CTAProps {
  children: React.ReactNode;
  variant?: "default" | "compact" | "dark";
  className?: string;
}

export function CTA({
  children,
  variant, // No default value - base styles are in .ctaSection
  className,
}: CTAProps) {
  // Parse markdown content
  const parsed = parseMarkdownContent(children);
  const title = parsed.title || "";
  const description = parsed.description || "";
  const buttons = parsed.links || [];

  return (
    <section
      className={clsx(
        styles.ctaSection, // Base class contains default styling
        variant && styles[variant], // Only apply variant if provided
        className
      )}
    >
      <div className={styles.ctaContent}>
        <h2 className={styles.ctaTitle}>{title}</h2>
        <p className={styles.ctaDescription}>{description}</p>
        {buttons && buttons.length > 0 && (
          <div className={styles.ctaButtons}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                url={button.href}
                variant={index > 0 ? "outlined" : undefined}
                className={clsx(
                  styles.ctaButton,
                  { [styles.outlined]: index > 0 } // Conditional for boolean states
                )}
              >
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}