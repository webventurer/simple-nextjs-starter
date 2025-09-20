# React Best Practices

This document outlines the React best practices used in this project. Following these conventions ensures consistency, maintainability, and alignment with React community standards.

## Component Naming Conventions

### PascalCase for Components
✅ **Use PascalCase for all React component names**

```tsx
// ✅ Good
export function SimpleHeader() { ... }
export function FeatureCard() { ... }
export function FeaturesGrid() { ... }

// ❌ Avoid
export function simpleHeader() { ... }
export function feature_card() { ... }
export function features-grid() { ... }
```

### Directory Structure
✅ **Use PascalCase for component directories**

```
src/components/
├── Section/
│   ├── Section.tsx
│   ├── Section.module.scss
│   └── index.ts
├── SimpleHeader/
│   ├── SimpleHeader.tsx
│   ├── SimpleHeader.module.scss
│   └── index.ts
└── FeatureCard/
    ├── FeatureCard.tsx
    ├── FeatureCard.module.scss
    └── index.ts
```

### File Naming
✅ **Match component file names to component names**

```tsx
// File: SimpleHeader/SimpleHeader.tsx
export function SimpleHeader() { ... }

// File: FeatureCard/FeatureCard.tsx
export function FeatureCard() { ... }
```

### CSS Module Naming
✅ **Use PascalCase for CSS Module files**

```scss
// File: SimpleHeader/SimpleHeader.module.scss
.header {
  // styles here
}

// File: FeatureCard/FeatureCard.module.scss
.featureCard {
  // styles here
}
```

## Component Architecture

### Index Files for Clean Imports
✅ **Create index.ts files for cleaner imports**

```tsx
// components/SimpleHeader/index.ts
export type { SimpleHeaderProps } from "./SimpleHeader";
export { SimpleHeader } from "./SimpleHeader";

// Usage in other files
import { SimpleHeader } from "@/components/SimpleHeader";
```

### Props Interface Naming
✅ **Name props interfaces with `Props` suffix**

```tsx
export interface SimpleHeaderProps {
  title?: string;
  logoText?: string;
  variant?: "compact" | "transparent";
}

export function SimpleHeader(props: SimpleHeaderProps) {
  // component logic
}
```

### Type-Only Imports
✅ **Use type-only imports when appropriate**

```tsx
import type React from "react";
import type { ReactNode } from "react";
import type { SimpleHeaderProps } from "./SimpleHeader";
```

## Component Patterns

### Children as ReactNode
✅ **Use React.ReactNode for children props**

`React.ReactNode` is the most flexible type for children in React components. It accepts any renderable content that React can display:

```tsx
// What React.ReactNode includes:
type ReactNode = 
  | ReactElement          // JSX elements: <div>Hello</div>
  | string                // Plain text: "Hello world"
  | number                // Numbers: 42
  | ReactFragment         // Fragments: <></>
  | ReactPortal           // Portals
  | boolean               // true/false (renders nothing)
  | null                  // null (renders nothing)
  | undefined             // undefined (renders nothing)
  | ReactNode[]           // Arrays of any of the above
```

**Why ReactNode is better than alternatives:**

```tsx
// ✅ Best - accepts anything React can render
interface ComponentProps {
  children: React.ReactNode;
}

// ❌ Too restrictive - only accepts JSX elements
interface BadProps {
  children: React.ReactElement;
}

// ❌ Too restrictive - only accepts strings
interface BadProps {
  children: string;
}
```

**Real-world usage:**

```tsx
interface ComponentProps {
  children: React.ReactNode;
}

// Instead of complex parsing, let MDX-JS handle children naturally
export function Section({ children }: ComponentProps) {
  return <section>{children}</section>;
}

// This component now accepts all of these:
<Section>Plain text</Section>
<Section><strong>JSX elements</strong></Section>
<Section>{42}</Section>
<Section>
  <p>Multiple</p>
  <p>Elements</p>
</Section>
<Section>
  Mixed content with <em>emphasis</em> and plain text
</Section>
```

**MDX Integration Benefits:**

When working with MDX, `React.ReactNode` is especially important because MDX content can be:
- Plain markdown text
- JSX components mixed with markdown
- Arrays of mixed content types
- Nested component structures

This is why we moved away from complex parsing (like `parseMarkdownContent`) and embraced the natural `ReactNode` pattern that works seamlessly with MDX-JS.

### Conditional CSS Classes
✅ **Use clsx for conditional class names**

```tsx
import clsx from "clsx";

export function Component({ variant, className }: Props) {
  const classes = clsx(
    styles.component,
    variant && styles[variant],
    className
  );
  
  return <div className={classes}>...</div>;
}
```

### Default Props with Destructuring
✅ **Use default parameters in destructuring**

```tsx
export function SimpleHeader({
  title = "Simple Starter",
  logoText = "S",
  navLinks = [
    { text: "About", href: "/about" },
    { text: "Contact", href: "/contact" },
  ],
}: SimpleHeaderProps) {
  // component logic
}
```

## Import Organization

### Import Ordering
✅ **Follow consistent import order**

```tsx
// 1. External libraries
import clsx from "clsx";
import type { ReactNode } from "react";

// 2. Internal utilities
import { groupBySequence } from "@/components/utils";

// 3. Components
import { FeatureCard } from "../FeatureCard";

// 4. Styles (last)
import styles from "./Component.module.scss";
```

### Path Aliases
✅ **Use @ alias for src directory imports**

```tsx
// ✅ Good
import { SimpleHeader } from "@/components/SimpleHeader";
import { groupBySequence } from "@/components/utils";

// ❌ Avoid relative paths for src imports
import { SimpleHeader } from "../../components/SimpleHeader";
```

## Performance Patterns

### Client Components Only When Needed
✅ **Use "use client" directive sparingly**

```tsx
// Only add when component uses browser APIs
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState();
  // component uses client-side features
}
```

### CSS Modules for Styling
✅ **Prefer CSS Modules with contextual styling**

```tsx
// ✅ Good - Use contextual container classes
// SimpleHeader.module.scss
.header {
  background: white;
  padding: 1rem;
}

.headerContent {
  max-width: 1280px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
}

// SimpleHeader.tsx
import styles from "./SimpleHeader.module.scss";

export function SimpleHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <h1>Site Title</h1>
        </div>
      </div>
    </header>
  );
}
```

❌ **Avoid classes that mirror HTML tag names**

```tsx
// ❌ Bad - Don't do this
// Component.module.scss
.div {
  // Don't mirror tag names
}

.h1 {
  // Don't mirror tag names
}

// Component.tsx
export function Component() {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Title</h1>
    </div>
  );
}
```

✅ **Use contextual styling with nested selectors**

```tsx
// ✅ Better - Use contextual containers
// Article.module.scss
.content {
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 2rem;
    color: var(--primary-color);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
}

// Article.tsx
import styles from "./Article.module.scss";

export function Article({ children }: Props) {
  return (
    <article className={styles.content}>
      {children}
    </article>
  );
}

// Usage with clean HTML
<Article>
  <h1>Article Title</h1>
  <h2>Section Heading</h2>
  <p>Paragraph content with automatic styling.</p>
</Article>
```

## Why These Conventions Matter

- **IDE Support**: PascalCase components work better with autocomplete and IntelliSense
- **React DevTools**: Components appear with proper names in debugging tools
- **Community Standards**: Aligns with React documentation and ecosystem expectations
- **Maintainability**: Consistent naming makes code easier to navigate and understand
- **Refactoring**: Standard patterns make automated refactoring more reliable

## Resources

- [React Documentation](https://react.dev/)
- [Next.js Best Practices](https://nextjs.org/docs/getting-started/react-essentials)
- [TypeScript with React](https://www.typescriptlang.org/docs/handbook/react.html)