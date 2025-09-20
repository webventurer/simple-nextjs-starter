import type { MDXComponents } from "mdx/types";

import { FeatureCard } from "@/components/FeatureCard";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Section } from "@/components/Section";
import { SimpleHeader } from "@/components/SimpleHeader";

const components: MDXComponents = {
  Section,
  FeaturesGrid,
  FeatureCard,
  SimpleHeader,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
