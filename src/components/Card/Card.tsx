// External libraries
import type React from "react";
import { cn } from "@/lib/utils";

// Styles
import styles from "./Card.module.scss";

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Visual variant - base styles are in .card class */
  variant?: "highlighted";
  /** Spacing type */
  spacing?: "compact";
  /** Additional CSS classes */
  className?: string;
}

export default function Card({
  children,
  variant,
  spacing,
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        styles.card, // Base class contains default styling
        spacing && styles[spacing], // Only apply spacing if provided
        variant && styles[variant], // Only apply variant if provided
        className,
      )}
    >
      {children}
    </article>
  );
}
