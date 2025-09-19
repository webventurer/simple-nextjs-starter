# Simple Next.js Starter

A **clean, minimal** Next.js starter template with modern tooling and semantic component architecture. Built for developers who want a solid foundation without framework lock-in.

## 🎯 **Core Technologies**

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://typescriptlang.org)** - Full type safety and developer experience
- **[SCSS](https://sass-lang.com)** - Enhanced CSS with variables, nesting, and functions
- **[CSS Modules](https://github.com/css-modules/css-modules)** - Component-scoped styling
- **[MDX](https://mdxjs.com)** - Markdown with React components
- **[Turbopack](https://turbo.build/pack)** - Fast development builds (10x faster than Webpack)
- **[Biome](https://biomejs.dev)** - Lightning-fast linting and formatting

## ✨ What You Get

### 📝 **Content-Ready**

- **GitHub Flavored Markdown** - Tables, task lists, strikethrough, autolinks
- **React Components in MDX** - Mix interactive components with content
- **Flexible Content Structure** - Add `.mdx` files anywhere in your app

### 🎨 **Modern Styling**

- **Pure SCSS + CSS Modules** - No utility classes, semantic component styling
- **CSS Custom Properties** - Clean theming system with dark mode support
- **Responsive Design** - Mobile-first approach with clean breakpoints
- **Font Optimization** - Automatic font loading with `next/font`

### ⚡ **Developer Experience**

- **Pre-commit Hooks** - Automatic TypeScript checking before commits
- **Hot Module Replacement** - Instant updates during development
- **Import Aliases** - Clean imports with `@/` prefix

## 🚀 Quick Start

```bash
# Clone or use this template
git clone <repository-url>
cd simple-nextjs-starter

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

**You'll see**: A clean welcome page with SCSS Modules styling - ready for your content and components!

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles & CSS custom properties
│   ├── layout.tsx         # Root layout with font optimization
│   ├── page.tsx           # Home page (uses CSS Modules)
│   └── page.module.scss   # Component styles with SCSS features
├── lib/
│   └── utils.ts           # Utility functions (class merging, etc.)
└── styles/
    ├── layout.css         # Global reset & layout utilities
    └── typography.css     # Base typography system
```

## 🛠 Available Scripts

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Production build
pnpm start            # Start production server

# Code Quality
pnpm lint             # Check code with Biome
pnpm format           # Format code with Biome
pnpm type:check       # TypeScript validation

# Git Hooks
pre-commit install    # Set up pre-commit hooks
pre-commit run --all-files  # Run hooks manually
```

## 📝 Adding Content

### Create an MDX Page

```bash
# Create a new MDX page
mkdir src/app/blog
touch src/app/blog/page.mdx
```

````mdx
# My Blog Post

This is **GitHub Flavored Markdown** with semantic React components!

## Task Progress

- [x] Set up Next.js with MDX
- [x] Configure SCSS and CSS Modules
- [ ] Write amazing content
- [ ] Deploy to production

## Interactive Elements

<Button variant="primary">Get Started</Button>
<Alert type="info">This is semantic, just like HTML elements!</Alert>

## Code Example

Here's how to use our components:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Clean, semantic components make content readable.</p>
  </CardContent>
</Card>
```
````

The beauty is in the **semantic simplicity** - components work like enhanced HTML elements.

````

### Component with SCSS Modules
```scss
// Component.module.scss
.container {
  padding: 1rem;
  background: var(--color-background);

  &.variant {
    border: 1px solid var(--color-primary);
  }

  .title {
    font-size: 1.5rem;
    color: var(--color-foreground);
  }
}
````

```tsx
// Component.tsx
import styles from "./Component.module.scss";
import { cn } from "@/lib/utils";

export function Component({ variant = false }) {
  return (
    <div className={cn(styles.container, variant && styles.variant)}>
      <h2 className={styles.title}>Hello World</h2>
    </div>
  );
}
```

### Semantic Component Library

Create reusable components that work like enhanced HTML:

```tsx
// src/components/Button.tsx
import styles from "./Button.module.scss";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
}
```

```tsx
// src/components/Alert.tsx
import styles from "./Alert.module.scss";

interface AlertProps {
  type?: "info" | "warning" | "error";
  children: React.ReactNode;
}

export function Alert({ type = "info", children }: AlertProps) {
  return (
    <div className={styles[type]} role="alert">
      {children}
    </div>
  );
}
```

Then use them in MDX like semantic HTML:

```mdx
<Button variant="primary">Clean & Simple</Button>
<Alert type="info">Just like HTML elements!</Alert>
```

## 🎨 Styling Philosophy

This starter embraces **semantic, component-based design** - just like semantic HTML, but enhanced:

### **Clean Component Architecture**

- **Semantic Components** - `<Button>`, `<Alert>`, `<Card>` work like HTML elements
- **No Inline Logic** - Components are defined separately, used cleanly in content
- **CSS Modules** - Component-scoped styles with SCSS features
- **CSS Custom Properties** - Consistent theming and design tokens
- **No Framework Lock-in** - Pure CSS and semantic React you own and control

### **MDX Content Philosophy**

```mdx
<!-- Clean, readable, semantic -->

<Alert type="info">Important information for users</Alert>

<Button variant="primary">Get Started</Button>

<!-- NOT this: -->
<!-- export function Button() { ... } -->
<!-- <button onClick={handleClick}>Complex inline logic</button> -->
```

**Think enhanced HTML** - components should feel as natural as `<p>`, `<h1>`, `<img>` tags.

## 🏗️ Design Principles

### **Separation of Concerns**

- **Components are defined once, used everywhere semantically**
- Content files (`.mdx`) focus purely on content and structure
- Component logic lives in dedicated component files
- Styling is scoped to components via CSS Modules

### **Semantic Component Design**

- Components work like **enhanced HTML elements**
- Clean, declarative API: `<Button variant="primary">` not `<div className="btn-primary">`
- Self-documenting through TypeScript interfaces
- Composable and predictable behavior

### **Maintainable Architecture**

```
✅ GOOD: Separation of concerns
├── src/components/Button.tsx     # Component definition & logic
├── src/components/Button.module.scss  # Component-specific styles
└── src/app/blog/page.mdx         # Clean content usage: <Button>

❌ AVOID: Mixed concerns
└── src/app/blog/page.mdx         # export function Button() { ... }
                                  # <Button onClick={complexLogic}>
```

This approach ensures:

- **Reusability** - Define once, use anywhere
- **Maintainability** - Change component logic in one place
- **Readability** - Content files stay focused on content
- **Type Safety** - Full TypeScript support across the boundary

## 🔧 Configuration

### TypeScript

- Strict mode enabled
- Path aliases configured (`@/` for `src/`)
- MDX type definitions included

### Biome (Linting & Formatting)

- Replaces ESLint + Prettier for better performance
- Configured for Next.js and React best practices
- Automatic import organization

### MDX Support

- GitHub Flavored Markdown enabled
- Custom components supported
- Optimized for static generation

## 🚀 Perfect For

- **Content-Rich Sites** - Blogs, documentation, marketing pages
- **Component Libraries** - Build reusable components with clean styles
- **Rapid Prototyping** - Start fast without configuration overhead
- **Teams** - Consistent tooling and clear patterns

## 📚 Learn More

- **[Next.js Documentation](https://nextjs.org/docs)** - Framework features and API
- **[MDX Documentation](https://mdxjs.com/)** - Markdown + React components
- **[SCSS Guide](https://sass-lang.com/guide)** - Enhanced CSS features
- **[CSS Modules](https://github.com/css-modules/css-modules)** - Component-scoped styling

## 🚀 Deploy

Deploy easily on [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/simple-nextjs-starter)

Or any static hosting provider:

```bash
pnpm build      # Creates ./out directory
# Upload ./out to your hosting provider
```

---

**Ready to build something amazing!** 🎉
