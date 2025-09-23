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
- **Next.js Fonts** - Optimized font loading with `next/font` (Inter, Nunito, Lato)

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

### Next.js Fonts - Typography Optimization 📝

**Next.js Fonts** (`next/font`) is Vercel's built-in font optimization system that automatically optimizes web fonts for better performance and user experience.

#### What it is:
- **Built-in optimization** - Automatic font loading, preloading, and layout shift prevention
- **Google Fonts integration** - Direct access to Google Fonts library with zero runtime JavaScript
- **Local font support** - Self-hosted fonts with automatic optimization
- **CSS Variables** - Type-safe font variables for consistent typography
- **Performance optimized** - Zero layout shift and faster loading

#### Key Features:
- **Zero layout shift** - Fonts are preloaded to prevent content jumping
- **Privacy-friendly** - Google Fonts served from same origin (no external requests)
- **Automatic optimization** - Font files are optimized and subset automatically
- **CSS custom properties** - Clean integration with CSS variables
- **TypeScript support** - Full type safety for font configurations

#### Current Implementation:
```tsx
// src/app/layout.tsx
import { Inter as FontSans, Lato, Nunito } from "next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <html className={cn(fontSans.variable, nunito.variable, lato.variable)}>
      <body>
        {children}
      </body>
    </html>
  );
}
```

#### Usage in CSS:
```scss
// Use the CSS variables in your styles
.heading {
  font-family: var(--font-sans); // Inter
}

.body-text {
  font-family: var(--font-nunito); // Nunito
}

.accent-text {
  font-family: var(--font-lato); // Lato
}
```

#### Benefits over traditional font loading:
- **No flash of invisible text (FOIT)** - Fonts load smoothly
- **No flash of unstyled text (FOUT)** - Consistent rendering
- **Better Core Web Vitals** - Improved Cumulative Layout Shift scores
- **Reduced requests** - Fonts served from same domain
- **Automatic subsetting** - Only characters you need are loaded

#### Font Options Available:
- **Google Fonts** - Entire Google Fonts library (`next/font/google`)
- **Local Fonts** - Self-hosted fonts (`next/font/local`)
- **Variable fonts** - Support for variable font formats
- **Font Display** - Control font-display CSS property
- **Preload** - Automatic font preloading for critical fonts

#### Alternative approaches:
- **Traditional `@font-face`** - Manual font loading (not recommended)
- **Google Fonts CDN** - External requests with layout shift issues
- **Font loading libraries** - Third-party solutions (unnecessary with Next.js)

---

### Alternative Styling Solutions (Optional) ⚡

While this project uses **CSS Modules + SCSS** for styling, developers may consider these popular alternatives for different project requirements.

#### Tailwind CSS
**Tailwind CSS** is a utility-first CSS framework that provides low-level utility classes for rapid UI development.

**What it is:**
- **Utility-first** - Compose designs using utility classes directly in HTML/JSX
- **Highly customizable** - Extensive configuration and theme customization
- **Built-in design system** - Consistent spacing, colors, and typography scales
- **Responsive design** - Mobile-first responsive utilities
- **Component-friendly** - Works well with React component libraries

**Example usage:**
```jsx
<div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Card Title</h2>
  <p className="text-gray-600 leading-relaxed">Card content with utility classes</p>
</div>
```

**Pros:**
- **Rapid prototyping** - Very fast for building UIs
- **Consistent design** - Built-in design system prevents inconsistencies
- **Small bundle size** - Purges unused styles in production
- **Great developer experience** - Excellent autocomplete and tooling

**Cons (why we chose CSS Modules instead):**
- **Violates separation of concerns** - Mixes design with content/markup
- **Verbose markup** - Long className strings can become unwieldy
- **Learning curve** - Requires memorizing utility class names
- **Harder to maintain** - Design changes require touching markup

#### shadcn/ui
**shadcn/ui** is a collection of copy-and-paste React components built with Radix UI primitives and styled with Tailwind CSS.

**What it is:**
- **Component collection** - Pre-built, accessible React components
- **Copy-and-paste approach** - Components are copied into your project, not installed as dependencies
- **Radix UI primitives** - Built on top of accessible, unstyled component primitives
- **Tailwind styling** - Styled with Tailwind CSS utility classes
- **Customizable** - Full control since components live in your codebase

**Example usage:**
```jsx
// After copying Button component from shadcn/ui
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">
  Click me
</Button>
```

**Pros:**
- **High-quality components** - Well-designed, accessible components
- **No vendor lock-in** - Components live in your codebase
- **Radix UI foundation** - Excellent accessibility and behavior
- **Customizable** - Easy to modify since you own the code

**Cons (why we chose CSS Modules instead):**
- **Requires Tailwind** - Tied to Tailwind CSS ecosystem
- **Component bloat** - Large component files in your codebase
- **Design system dependency** - Less control over design tokens
- **Opinionated styling** - Harder to implement custom design systems

#### When to consider alternatives:
- **Rapid prototyping** - Tailwind excels for quick mockups and MVPs
- **Design system adoption** - If your team already uses Tailwind design tokens
- **Component library need** - shadcn/ui provides high-quality accessible components
- **Small projects** - Utility-first approach can be faster for simple UIs

#### Why this project uses CSS Modules + SCSS:
- **Separation of concerns** - Clean separation between content and styling
- **Maintainable** - Easier to maintain and modify styles over time
- **Namespace isolation** - Automatic scoping prevents style conflicts
- **Flexible** - Not tied to any specific design system or framework
- **Performance** - Optimal CSS bundle sizes with tree-shaking

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

---

## Appendix: Additional Resources 📚

### Component Libraries

**CSS Modules + SCSS Based / Independent Styling (Non-Tailwind)**

These component libraries work with their own styling systems and don't require Tailwind CSS:

**21st.dev**
- **Modern component library** - Contemporary React components with clean design
- **TypeScript-first** - Built with TypeScript for excellent developer experience
- **Customizable** - Flexible theming and styling options
- **Performance-focused** - Optimized for modern React applications
- **Independent styling** - Uses its own styling system, not Tailwind-dependent

**Chakra UI**
- **Simple and modular** - Build accessible React apps with speed
- **Themeable** - Comprehensive theming system with design tokens
- **Accessibility-first** - WAI-ARIA compliant components out of the box
- **Developer experience** - Great documentation and TypeScript support
- **CSS-in-JS styling** - Complete styling system built-in, no Tailwind required

**ReactComponents**
- **Free and open-source** - Curated collection of React components
- **Wide variety** - Buttons, forms, complex layouts, and more
- **Well-documented** - Comprehensive documentation and examples
- **Easy integration** - Designed for quick project integration
- **Flexible styling** - Works with any CSS framework or custom styles

**Park UI**
- **Multi-framework support** - Works with React, Vue, and Solid
- **Multiple styling options** - Supports Tailwind, Panda CSS, or custom styling
- **Versatile integration** - Great for projects spanning multiple frameworks
- **Modern design** - Contemporary UI patterns and components
- **Framework agnostic** - Not tied to any specific CSS framework

Example Chakra UI usage:
```jsx
import { Box, Button, Text } from '@chakra-ui/react'

<Box bg="white" p={6} rounded="lg" shadow="md">
  <Text fontSize="2xl" fontWeight="bold" mb={4}>Card Title</Text>
  <Text color="gray.600">Card content with Chakra UI components</Text>
  <Button colorScheme="blue" mt={4}>Action Button</Button>
</Box>
```

**Tailwind CSS Based Component Libraries**

These component libraries require Tailwind CSS to function properly:

**NextUI**
- **High-performance React UI library** - Built specifically on Tailwind CSS
- **Clean designs** - Modern, consistent component designs
- **Seamless integration** - Works perfectly with Tailwind's utility classes
- **Performance focused** - Optimized for modern React applications

**Preline UI**
- **Largest free Tailwind library** - Over 60 components and 170 sections
- **Dark mode support** - Built-in dark mode compatibility
- **Highly responsive** - Components work across all device sizes
- **Complex layouts** - Supports both simple and advanced UI patterns

**TailGrids**
- **Comprehensive component collection** - 600+ components across 80+ categories
- **Copy-paste integration** - Simple integration with copy-paste workflow
- **React focused** - Specifically designed for React applications
- **Quick workflow** - Streamlines development with ready-to-use components

**HyperUI**
- **Ready-to-use components** - HTML and CSS components for quick integration
- **Versatile applications** - Supports app UI, e-commerce, and marketing sites
- **Quick customization** - Easy to modify and adapt to your needs
- **Tailwind-based** - Built with Tailwind CSS utility classes

**Sailboat UI**
- **Modern Tailwind library** - 150+ open-source components
- **Alpine.js integration** - Interactive elements with Alpine.js
- **Flexible theming** - Comprehensive theming and customization options
- **Component variety** - Buttons, accordions, forms, and complex layouts

**Float UI**
- **Comprehensive library** - Full-featured Tailwind CSS component collection
- **Responsive design** - All components are fully responsive
- **Customizable** - Easy to modify and extend components
- **Streamlined workflow** - Designed to speed up development process

**Tremor**
- **Data visualization focused** - Specialized for dashboards and analytics
- **Chart components** - Area charts, bar charts, line charts, and more
- **Data-heavy applications** - Perfect for business intelligence and reporting
- **Tailwind integration** - Built on Tailwind CSS foundation

**Flowbite React**
- **Open-source library** - 100+ free components across 32+ categories
- **Simple and minimal** - Clean, modern design approach
- **Copy-paste workflow** - Easy integration with simple copy-paste
- **Tailwind-based** - Requires Tailwind CSS for styling

### React Ecosystem Resources

- **[Awesome React](https://github.com/enaqx/awesome-react)** - A comprehensive collection of awesome things regarding the React ecosystem. This curated list includes:
  - React tools and libraries
  - Component libraries and UI frameworks
  - State management solutions
  - Testing utilities
  - Development tools and extensions
  - Learning resources and tutorials

- **[Awesome React Components](https://github.com/brillout/awesome-react-components)** - A curated list of React components and libraries. This extensive collection focuses specifically on:
  - UI components and widgets
  - Form components and validation
  - Data visualization and charts
  - Layout and navigation components
  - Animation and interaction libraries
  - Specialized component categories

*These resources are invaluable for discovering new React libraries, staying updated with ecosystem trends, and finding solutions for specific development needs.*
