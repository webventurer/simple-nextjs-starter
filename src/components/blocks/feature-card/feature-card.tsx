"use client";

import clsx from "clsx";
import type React from "react";
import styles from "./feature-card.module.scss";

export type FeatureCardVariantType = "compact" | "highlighted";

interface FeatureCardProps {
  children: React.ReactNode;
  variant?: FeatureCardVariantType;
}

export function FeatureCard({ children, variant }: FeatureCardProps) {
  const classes = clsx(styles.featureCard, variant && styles[variant]);

  return <article className={classes}>{children}</article>;
}
