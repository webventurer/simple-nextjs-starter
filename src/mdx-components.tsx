import type { MDXComponents } from "mdx/types";

import { FeatureCard } from "@/components/blocks/feature-card";
import { FeaturesGrid } from "@/components/blocks/features-grid";
import { Section } from "@/components/blocks/section";
import { SimpleHeader } from "@/components/blocks/simple-header";

const components: MDXComponents = {
  Section,
  FeaturesGrid,
  FeatureCard,
  SimpleHeader,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
