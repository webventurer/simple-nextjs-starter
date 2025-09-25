import clsx from "clsx";
import type { ReactNode } from "react";

import Card from "../Card/Card";
import { groupBySequence } from "../utils";
import styles from "./CardsGrid.module.scss";

export interface CardsGridProps {
  /** Grid content - typically h3 and p elements for cards */
  children: ReactNode;
  /** Visual variant */
  variant?: "highlighted";
  /** Spacing type  */
  spacing?: "compact";
  /** Additional CSS classes */
  className?: string;
}

export default function CardsGrid({
  children,
  variant,
  spacing,
  className,
}: CardsGridProps) {
  const cards = groupBySequence(children, ["h3", "p"]);

  return (
    <div
      className={clsx(
        styles.cardsGrid, // Base class contains default styling
        variant && styles[variant], // Only apply variant if provided
        spacing && styles[spacing], // Only apply spacing if provided
        className,
      )}
    >
      {cards.map((cardChildren: ReactNode, idx: number) => {
        return (
          <Card key={idx} variant={variant} spacing={spacing}>
            {cardChildren}
          </Card>
        );
      })}
    </div>
  );
}
