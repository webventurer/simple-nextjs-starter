import clsx from "clsx";
import type { ReactNode } from "react";
import { groupBySequence } from "@/components/utils";
import { FeatureCard, type FeatureCardVariantType } from "../FeatureCard";
import styles from "./FeaturesGrid.module.scss";

interface FeaturesGridProps {
  children: ReactNode;
  variant?: FeatureCardVariantType;
}

export function FeaturesGrid({ children, variant }: FeaturesGridProps) {
  const cards = groupBySequence(children, ["h3", "p"]);
  const classes = clsx(styles.featuresGrid, variant && styles[variant]);

  return (
    <section className={classes}>
      {cards.map((cardChildren: ReactNode, idx: number) => (
        <FeatureCard key={`feature-${Date.now()}-${idx}`} variant={variant}>
          {cardChildren}
        </FeatureCard>
      ))}
    </section>
  );
}
