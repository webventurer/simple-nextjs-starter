"use client";

import { MDXProvider } from "@mdx-js/react";
import MDXContent from "./content.mdx";
import contentStyles from "./page.module.scss";

// Custom components for MDX
const components = {
  // Only custom behavior components go here
  // HTML elements use global + contextual styling
};

export default function MDXDemo() {
  return (
    <div className="page-layout">
      <main className={contentStyles.content}>
        <MDXProvider components={components}>
          <MDXContent />
        </MDXProvider>
      </main>
    </div>
  );
}
