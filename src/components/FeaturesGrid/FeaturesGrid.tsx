"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import { groupBySequence } from "@/components/utils";
import styles from "./FeaturesGrid.module.scss";

interface FeaturesGridProps {
  children: ReactNode;
  flavour?: "compact" | "highlighted";
}

export default function FeaturesGrid({ children, flavour }: FeaturesGridProps) {
  const classes = clsx(
    styles.featuresGrid,
    flavour && styles[flavour], // Only apply if flavour exists
  );
  const cards = groupBySequence(children, ["h3", "p"]);

  return (
    <section className={classes}>
      {cards.map((cardChildren, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Feature cards have stable content and order
        <FeatureCard key={i} flavour={flavour}>
          {cardChildren}
        </FeatureCard>
      ))}
    </section>
  );
}
