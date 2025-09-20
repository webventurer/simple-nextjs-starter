"use client";

import { MDXProvider } from "@mdx-js/react";
import { SimpleHero } from "@/components/simple-hero/simple-hero";
import { SimpleHeader } from "@/components/simple-header/simple-header";
import { Button } from "@/components/ui/button/button";
import { Section } from "@/components/section/section";
import { FeatureCard } from "@/components/feature-card/feature-card";
import { FeaturesGrid } from "@/components/features-grid/features-grid";
import { CTA } from "@/components/cta/cta";

import MDXContent from "./content.mdx";

// Component mapping for MDX
const components = {
  Hero: SimpleHero,
  Header: SimpleHeader,
  Section,
  FeatureCard,
  FeaturesGrid,
  CTA,
  Button,
};

export function MDXWrapper() {
  return (
    <MDXProvider components={components}>
      <MDXContent />
    </MDXProvider>
  );
}
