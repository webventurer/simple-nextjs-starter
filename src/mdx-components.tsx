import type { MDXComponents } from "mdx/types";

import { Section } from "@/components/blocks/section/section";
import { SimpleHeader } from "@/components/blocks/simple-header/simple-header";

const components: MDXComponents = {
  SimpleHeader,
  Section,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
