import type { MDXComponents } from "mdx/types";
import Button from "@/components/Button/Button";
import { FeatureCard } from "@/components/FeatureCard/FeatureCard";
import { FeaturesGrid } from "@/components/FeaturesGrid/FeaturesGrid";
import { Actions, Header, Nav } from "@/components/Header/Header";
import Section from "@/components/Section/Section";

const components: MDXComponents = {
  Button,
  Section,
  FeaturesGrid,
  FeatureCard,
  Header,
  Nav,
  Actions,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
