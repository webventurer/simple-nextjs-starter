import type { MDXComponents } from "mdx/types";

import { Button } from "@/components/Button/Button";
import { FeatureCard } from "@/components/FeatureCard";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Header, Nav } from "@/components/Header";
import { Section } from "@/components/Section";

const components: MDXComponents = {
  Button,
  Section,
  FeaturesGrid,
  FeatureCard,
  Header,
  Nav,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
