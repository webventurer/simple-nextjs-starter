'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './FeaturesGrid.module.scss';
import FeatureCard from '@/components/FeatureCard/FeatureCard';
import { groupBySequence } from '@/components/utils';

interface FeaturesGridProps {
  children: ReactNode;
  flavour?: 'compact' | 'highlighted';
}

export default function FeaturesGrid({ children, flavour }: FeaturesGridProps) {
  const classes = clsx(
    styles.featuresGrid,
    flavour && styles[flavour] // Only apply if flavour exists
  );
  const cards = groupBySequence(children, ['h3', 'p']);

  return (
    <section className={classes}>
      {cards.map((cardChildren, i) => (
        <FeatureCard key={i} flavour={flavour}>
          {cardChildren}
        </FeatureCard>
      ))}
    </section>
  )
}
