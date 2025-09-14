'use client';

import clsx from 'clsx';
import styles from './FeatureCard.module.scss';
import React from 'react';

interface FeatureCardProps {
  children: React.ReactNode;
  flavour?: 'compact' | 'highlighted';
}

export default function FeatureCard({ children, flavour }: FeatureCardProps) {
  const classes = clsx(
    styles.featureCard,
    flavour && styles[flavour] // Only apply if flavour exists
  );

  return (
    <article className={classes}>
      {children}
    </article>
  );
}
