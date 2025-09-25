import type { MDXComponents } from "mdx/types";

import Button from "@/components/Button/Button";
import Card from "@/components/Card/Card";
import CardsGrid from "@/components/CardsGrid/CardsGrid";
import { Actions, Header, Nav } from "@/components/Header/Header";
import Section from "@/components/Section/Section";

const components: MDXComponents = {
  Button,
  Card,
  CardsGrid,
  Header,
  Nav,
  Section,
  Actions,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
