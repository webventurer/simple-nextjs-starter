Note: A copy of this stack guide is also in `code-fu`. Update here and copy across to `code-fu` to keep up to date.

# Next.js stack guide

> **AI Assistant Note**: When Next.js development, React components, SCSS styling, or CSS Modules are discussed, always reference this stack guide first and acknowledge consulting it before providing guidance on the Next.js technology stack.

## Technology Stack Overview

### Core Stack
- **Next.js 15.5.3** - App Router, routing patterns, and framework foundation
- **React 19.1.0** - Component architecture with modern React features
- **TypeScript 5.x** - Type safety, interfaces, and compile-time error checking
- **CSS Modules** - Scoped styling with automatic class name hashing
- **SCSS (Sass)** - Enhanced CSS with variables, nesting, and mixins

### Content & Markdown
- **MDX Integration** - React components in Markdown content
- **@mdx-js/react & @mdx-js/loader** - MDX processing and component integration
- **remark-gfm** - GitHub Flavored Markdown support

### Development Tools
- **Biome 2.2.0** - Fast linting and formatting (`biome check`, `biome format --write`)
- **Turbopack** - Next.js build optimization (`next dev --turbopack`, `next build --turbopack`)
- **TypeScript Compiler** - Type checking (`tsc --noEmit`)
- **Pre-commit hooks** - Automated type checking before commits

### Utilities & Libraries
- **clsx** - Dynamic CSS class name construction
- **Lucide React** - Icon library for React components

### Package Management
- **pnpm** - Fast, efficient package management with workspace support

---

### Lucide React - Icon Library 🎨

**Lucide React** is a modern **icon library** specifically designed for React applications, providing beautiful, customizable SVG icons.

#### What it is:
- **Modern icon library** - A collection of 1000+ beautiful, customizable SVG icons
- **React-optimized** - Specifically designed for React/Next.js applications  
- **Tree-shakeable** - Import only the icons you use (reduces bundle size)
- **TypeScript support** - Fully typed for TypeScript projects
- **Highly customizable** - Size, color, stroke width, and styling control

#### Key Features:
- **1000+ icons** - Comprehensive collection covering most use cases
- **Consistent design** - All icons follow the same design system
- **Lightweight** - Optimized SVG icons with minimal bundle impact
- **Accessibility** - Built-in accessibility features
- **No dependencies** - Pure React implementation

#### Usage Example:
```tsx
import { Home, User, Search, Menu, ChevronRight } from "lucide-react";

function Navigation() {
  return (
    <nav>
      <Home size={24} />
      <User size={20} color="blue" />
      <Search strokeWidth={1.5} />
      <Menu className="menu-icon" />
      <ChevronRight size={16} />
    </nav>
  );
}
```

#### Why it's popular:
- **Better than Font Icons** - SVGs are more performant and accessible
- **Tree-shaking** - Only includes icons you actually use
- **Consistent styling** - All icons work together visually
- **Easy customization** - Props for size, color, stroke, etc.
- **Framework agnostic** - Available for React, Vue, Angular, vanilla JS

#### Status in this project:
Currently **installed but not used** in the `simple-nextjs-starter` codebase. Available for future icon needs.

#### Common alternatives:
- **Heroicons** - Similar icon library from Tailwind team
- **React Icons** - Collection of popular icon libraries
- **Feather Icons** - Minimalist icon set (Lucide is actually a fork of Feather)

---

This comprehensive guide covers development standards and best practices for the complete Next.js technology stack, including React components, SCSS styling, CSS Modules, and frontend architecture patterns.


## Core principles

> _"Create beautiful, maintainable Next.js applications where content writers think in pure markdown and developers think in encapsulated components—each varying independently without interference."_

> **Core philosophy**: Build a clean, understandable visual language using React components + SCSS + CSS Modules within Next.js applications that reduces long-term maintenance costs. Each component is a self-contained unit that encapsulates its styling, state, and behavior—keeping internal implementation details private while exposing only a clean, simple interface to the outside world. This separation ensures that content files remain clean, readable markdown that both humans and AI can easily parse and understand, with styling complexity hidden within the components themselves.

### 1. Clean & readable code

- **Principle**: Code should be self-documenting and easily understood by future developers
- **Implementation**: Use semantic naming, clear component structure, and consistent formatting
- **Benefit**: Reduces cognitive load and debugging time

### 2. Separation of concerns

- **Principle**: Each piece of code should have one reason to change
- **Implementation**: Keep content, styling, and behavior in separate, well-defined layers
- **Anti-pattern**: Avoid mixing design logic with content (like Tailwind CSS in JSX)

### 3. Namespaces & encapsulation

- **Principle**: Each component should have its own isolated styling namespace
- **Implementation**: Use CSS Modules for automatic scoping
- **Quote**: _"Namespaces are one honking great idea -- let's do more of those!"_ — Tim Peters, The Zen of Python

### 4. CSS inheritance over abstraction

- **Principle**: Leverage CSS's natural cascade and inheritance instead of SCSS abstractions
- **Implementation**: Use base classes with modifiers rather than mixins or placeholders
- **Benefit**: Smaller bundle sizes, better maintainability, and natural CSS behavior

### 5. Maintainability

- **Principle**: Code should be easy to modify, extend, and debug
- **Implementation**: Use CSS inheritance patterns, contextual styling, and modular architecture
- **Goal**: Make future developer's life easier (especially if future developer is YOU!)

---

## Next.js technology stack

### Required Technologies

#### 1. React Components (TypeScript)

```tsx
// Example: Modern component with contextual styling
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  variant?: 'featured' | 'compact';
}

const FeatureCard = ({ title, description, icon, variant }: FeatureCardProps) => {
  return (
    <div className={clsx(
      styles.card,           // Base class contains default styles
      styles[variant]        // Only apply variant if provided
    )}>
      <div className={styles.iconWrapper}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
```

**Requirements**:

- Use TypeScript for type safety
- Prefer `ComponentProps<'element'>` over `any` types
- Create reusable, composable components
- Follow single responsibility principle

#### 2. CSS Modules + SCSS (.module.scss)

```scss
// Variables for consistency
$color-primary: #3498db;
$color-secondary: #2c3e50;
$spacing-md: 1rem;
$border-radius: 8px;
$font-family-primary: "Poppins", sans-serif;

// Base class with modifier patterns (preferred over mixins)
.card {
  background: white;
  border-radius: $border-radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: $spacing-md;

  // Hover states
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }

  // Modifiers for variants
  &.featured {
    border: 2px solid $color-primary;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.15);
  }

  &.compact {
    padding: $spacing-md * 0.5;
  }

  // Contextual styling for nested elements
  .iconWrapper {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-md * 0.5;
  }

  h3 {
    color: $color-primary;
    margin-bottom: $spacing-md * 0.5;
  }

  p {
    color: $color-secondary;
    line-height: 1.6;
  }
}
```

**Requirements**:

- Use `.module.scss` extension for CSS Modules + SCSS
- Define variables at the top of each stylesheet
- Use base classes with modifier patterns instead of mixins for shared styles
- Apply camelCase naming for CSS classes to match TypeScript property access
- Use nesting with `&` for pseudo-selectors, modifiers, and child elements
- Import as: `import styles from './Component.module.scss'`
- Use `clsx` for dynamic class name construction

#### 3. Content Integration

**For content-heavy pages**, use one of these approaches:

**Option A: MDX Integration** (React/JSX components in Markdown)
```tsx
import { MDXProvider } from "@mdx-js/react";
import MDXContent from "./content.mdx";

// Use contextual styling - no tag-mirroring class names needed
const components = {
  FeatureCard,
  CTA,
};

export default function Page() {
  return (
    <MDXProvider components={components}>
      <div className={styles.content}>
        <MDXContent />
      </div>
    </MDXProvider>
  );
}
```

**Option B: Standard Markdown** (with external component rendering)
```tsx
import { marked } from 'marked';
import fs from 'fs';

export default function Page() {
  const markdownContent = fs.readFileSync('content.md', 'utf-8');
  const htmlContent = marked(markdownContent);

  return (
    <div className={styles.content}>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <FeatureCard title="Example" description="Rendered separately" />
    </div>
  );
}
```

**Requirements**:

- Maintain separation between content and presentation
- Allow structured content authoring
- Enable component reusability across content
- Use contextual styling for markdown elements within containers

**Example contextual styling for markdown content:**

```scss
// page.module.scss - Contextual styling instead of tag-mirroring classes
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  // Style elements based on context, not explicit class names
  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    color: var(--secondary-color);
    margin: 2rem 0 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  // Custom components maintain their own styling
  // No need for explicit className assignments
}
```

---

## File Structure Requirements

```
src/
├── app/
│   └── [page]/
│       ├── page.tsx           # Main page component
│       ├── page.module.scss   # Page-specific SCSS with CSS Modules
│       └── content.md         # Content in Markdown format
└── components/
    ├── ComponentName/
    │   ├── index.tsx          # Component logic
    │   └── ComponentName.module.scss  # Component styles
    └── shared/
        └── variables.scss     # Global SCSS variables
```

---

## Implementation Guidelines

### CSS Modules + SCSS Setup

1. **File Naming**: Use `.module.scss` extension
2. **Import Pattern**: `import styles from './Component.module.scss'`
3. **Class Usage**: `<div className={styles.className}>`
4. **Scoping**: Automatic class name hashing prevents conflicts

### SCSS Features to Use

#### Variables

```scss
// Design tokens
$color-primary: #3498db;
$color-secondary: #2c3e50;
$spacing-md: 1rem;
$border-radius: 8px;
$font-family-primary: "Poppins", sans-serif;
```

#### Base Classes with Modifiers (Preferred Pattern)

```scss
// Modern approach: base class contains default styles
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  font-family: $font-family-primary;
  background: #f3f4f6;
  border: 1px solid #d1d5db;

  // Modifiers for variants (avoid .button-default)
  &.primary {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
  }

  &.secondary {
    background: transparent;
    color: #374151;
  }

  &.small {
    padding: 0.25rem 0.75rem;
    font-size: 0.875rem;
  }
}
```

#### Limited Mixin Usage

```scss
// Only use mixins for complex, parameterized patterns
@mixin truncate-text($lines: 1) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@mixin responsive-text {
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
}

// Usage in components
.title {
  @include truncate-text(2);
  @include responsive-text;
}
```

#### Nesting

```scss
.navigation {
  background: white;

  .nav-list {
    display: flex;
    list-style: none;

    .nav-item {
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        color: $color-primary;
      }
    }
  }
}
```

### Component Architecture

#### Reusable Components

- Create small, focused components
- Use TypeScript interfaces for props
- Include default props when appropriate
- Make components composable

#### Page Components

- Use Markdown for content (with MDX when React components needed)
- Import reusable components
- Handle layout and data fetching
- Keep business logic separate from presentation

---

## Quality Checklist

### Code Quality

- [ ] TypeScript types are properly defined
- [ ] No `any` types (use `ComponentProps<'element'>` instead)
- [ ] Components have single responsibility
- [ ] SCSS variables are used consistently
- [ ] Base classes contain default styles (no explicit "default" variants)
- [ ] `clsx` is used for dynamic class name construction

### Styling Quality

- [ ] CSS Modules provide namespace isolation
- [ ] camelCase naming used for CSS classes to match TypeScript access
- [ ] SCSS nesting is used appropriately (max 3 levels deep)
- [ ] Base class + modifier patterns used instead of mixin bloat
- [ ] Contextual styling used instead of tag-mirroring class names
- [ ] Variables are defined for colors, spacing, and fonts
- [ ] Responsive design is implemented with mixins (limited usage)
- [ ] Hover states and animations are smooth

### Architecture Quality

- [ ] Content is separated from presentation (Markdown files)
- [ ] Components are reusable and composable
- [ ] File structure follows conventions
- [ ] Dependencies are properly managed
- [ ] Build process works without errors

### Maintainability Quality

- [ ] Code is self-documenting
- [ ] Consistent naming conventions
- [ ] Clear separation of concerns
- [ ] Easy to add new components
- [ ] Simple to modify existing styles

---

## Anti-Patterns to Avoid

### ❌ CSS class names that mirror HTML tags

```tsx
// DON'T: Create class names identical to tag names
<h1 className={pageStyles.h1}>Title</h1>
<h2 className={pageStyles.h2}>Subtitle</h2>
<p className={pageStyles.paragraph}>Content</p>

// DO: Use contextual styling with CSS cascade
<div className={pageStyles.content}>
  <h1>Title</h1>
  <h2>Subtitle</h2>
  <p>Content paragraph</p>
</div>
```

### ❌ SCSS Mixin Bloat

```scss
// DON'T: Mixins create CSS duplication
@mixin card-base {
  padding: 1rem;
  background: white;
  border-radius: 8px;
}

.card { @include card-base; }
.card-featured { @include card-base; border: 2px solid blue; }
.card-compact { @include card-base; padding: 0.5rem; }

// DO: Use base class with modifiers
.card {
  padding: 1rem;
  background: white;
  border-radius: 8px;

  &.featured { border: 2px solid blue; }
  &.compact { padding: 0.5rem; }
}
```

### ❌ Default Variant Classes

```tsx
// DON'T: Create explicit "default" variants
<Button variant="default">Standard</Button>
<div className="card card-default">Content</div>

// DO: Put default styles in base class
<Button>Standard</Button>  {/* Base .button class IS the default */}
<div className="card">Content</div>
```

### ❌ Tailwind CSS in JSX

```jsx
// DON'T: Mixing design with content
<div className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
  This violates separation of concerns
</div>
```

### ❌ Global CSS Pollution

```css
/* DON'T: Global styles that can conflict */
.card {
  /* affects all elements with class="card" */
}
.title {
  /* affects all titles globally */
}
```

### ❌ Inline Styles

```jsx
// DON'T: Inline styles are not maintainable
<div style={{ backgroundColor: "#3498db", padding: "1rem" }}>
  Hard to maintain and reuse
</div>
```

### ❌ Any Types

```tsx
// DON'T: Any types defeat TypeScript's purpose
const Button = (props: any) => {
  /* ... */
};

// DO: Use proper typing
const Button = (props: ComponentProps<"button">) => {
  /* ... */
};
```

---

## Success Metrics

A display implementation is successful when:

1. **Developer Experience**: New developers can understand and modify the code quickly
2. **Maintainability**: Changes are isolated and don't break other parts
3. **Consistency**: Design patterns are reused across components
4. **Performance**: CSS Modules provide optimal bundle sizes
5. **Scalability**: New components and pages follow established patterns
6. **Type Safety**: TypeScript catches errors at compile time

---

## Conclusion

This technology stack (React + TypeScript + CSS Modules + SCSS + Markdown) provides:

- **Clean separation** between content, styling, and behavior
- **Namespace isolation** preventing style conflicts
- **Enhanced CSS** with variables, mixins, and nesting
- **Type safety** catching errors early
- **Maintainable architecture** that scales with the project

> The goal is creating a visual language with its own encapsulation and programming ability, where all display code gets shorter and is cleanly separated from content.

Each React component has its namespace with its own styling. **Namespaces & encapsulation for the win!**
