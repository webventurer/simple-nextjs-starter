# Installation guide: Simple Next.js starter

A comprehensive guide to setting up this clean Next.js starter from scratch with MDX, SCSS modules, and modern tooling.

## Goals of this starter

This starter template follows a **minimal foundation** philosophy, prioritizing building blocks over specific implementations. Rather than providing opinionated, business-specific components like CTA sections or Hero banners that vary dramatically between projects, we focus on foundational components like Card, Section, and CardsGrid that can be composed into anything you need.

The philosophy stems from recognizing that CTA components are inherently business-specific and vary per use case, while Hero sections are design-specific and change dramatically between projects. Instead of making assumptions about your goals, we provide the infrastructure and patterns you need to build quickly and consistently.

**What you get** is a reusable foundation with components that work across different project types. You'll find consistent patterns for styling, imports, and structure, along with a modern development experience powered by fast tooling that requires minimal configuration. The extensible architecture makes it easy to build upon without fighting the starter's opinions.

**This approach is perfect for** landing pages, marketing sites, and documentation sites where you need custom design and messaging. It's ideal for developers who want control over their component library and teams building multiple sites with consistent tooling but different designs.

The result is a starter that stays truly reusable while providing all the infrastructure you need to build quickly and consistently, without the bloat of components you'll likely replace anyway.

## Quick setup

If you want to clone this repository directly:

```bash
git clone https://github.com/webventurer/simple-nextjs-starter.git
cd simple-nextjs-starter
pnpm install
pnpm dev
```

## Create from scratch

Follow these steps to recreate this setup from scratch and understand how it all works.

### 1. Create Next.js project

```bash
npx create-next-app@latest my-landing \
  --typescript \
  --biome \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm \
  --turbopack
```

**Breaking down the command:**

- `npx` → Runs a package without installing it globally
- `create-next-app@latest` → Downloads the most recent version of the Next.js project generator
- `my-landing` → The name of the new folder it will create (your project directory)

**Flags explained:**

- `--typescript` → Sets up TypeScript out of the box (instead of plain JavaScript)
- `--biome` → Linting, formatting, bundling tool that replaces ESLint + Prettier
- `--app` → Uses the App Router (new file-based routing in `app/` instead of `pages/`)
- `--src-dir` → Puts all code under a `/src` folder for cleaner repo structure
- `--import-alias "@/*"` → Sets up import aliases for cleaner imports
- `--use-pnpm` → Uses pnpm package manager over npm or yarn
- `--turbopack` → Enables Turbopack by default for faster development

**Import alias benefits:**

Instead of messy relative paths:

```typescript
import Button from "../../../components/Button";
```

You can write clean absolute imports:

```typescript
import Button from "@/components/Button";
```

### Install Biome globally (Required)

For optimal VS Code integration and consistent formatting across projects, install Biome globally:

```bash
brew install biome
```

This ensures VS Code can find the Biome executable and provides consistent formatting behavior across all your TypeScript/JavaScript projects.

### Why Biome over ESLint?

This starter uses Biome instead of the traditional ESLint + Prettier combination for several advantages:

**🚀 Performance advantage (Rust vs Node.js):**

- Biome is ~10-25x faster than ESLint + Prettier
- Written in Rust (compiled) vs ESLint/Prettier (interpreted JavaScript)
- Better parallelization and memory efficiency

**🎯 Simplicity:**

- **Zero configuration** - works out of the box with sensible defaults
- **All-in-one tool** - replaces multiple tools (ESLint, Prettier, import sorting)
- **Single command** - `biome check` handles linting and formatting

**⚡ The Rust advantage:**
Similar to how Ruff replaced Black+Flake8+isort in Python, Biome is replacing ESLint+Prettier in JavaScript/TypeScript:

| Traditional            | Modern (Rust-based)    |
| ---------------------- | ---------------------- |
| ESLint + Prettier      | Biome                  |
| Black + Flake8 + isort | Ruff                   |
| Multiple configs       | Single config          |
| Slower (interpreted)   | Much faster (compiled) |

**📋 Available scripts:**

```bash
pnpm lint          # Check formatting and linting (no fixes)
pnpm format        # Fix formatting only (quotes, spacing, etc.)
pnpm lint --write  # Fix both formatting and linting issues
```

**🔄 Complementary with TypeScript:**

- `pnpm type:check` (TypeScript) → Validates types and interfaces
- `pnpm lint` (Biome) → Validates code style and quality
- Both are needed: TypeScript catches logical errors, Biome catches style issues

Choose Biome if you want faster tooling and minimal configuration. Choose ESLint if you need specific plugins or have existing ESLint workflows.

### Why Turbopack?

This starter uses the `--turbopack` flag to enable Next.js's new Rust-based bundler instead of the traditional Webpack.

**🚀 What is Turbopack?**

- Next.js's next-generation bundler built by Vercel
- Written in Rust for maximum performance
- Designed as the eventual successor to Webpack
- Currently in beta but stable for most use cases

**⚡ Performance benefits:**

- **Up to 10× faster** dev server startup vs Webpack
- **Up to 700× faster** hot module replacement (HMR) updates
- **Incremental compilation** - only recompiles changed code
- **Efficient caching** - granular, persistent caching system

**🎯 When to use Turbopack:**

- ✅ **Standard Next.js features** (App Router, SCSS Modules, next/image)
- ✅ **Modern tooling** (TypeScript, SCSS, MDX)
- ✅ **Fast development feedback** loops
- ✅ **Landing pages and marketing sites**

**⚠️ When to stick with Webpack:**

- ❌ **Custom Webpack loaders/plugins** that don't have Turbopack equivalents
- ❌ **Legacy build configurations** with complex plugin dependencies
- ❌ **Production builds** requiring exact Webpack behavior (though Turbopack support is expanding)

**📋 Command comparison:**

```bash
# With Turbopack (faster)
pnpm dev  # Uses Turbopack by default with --turbopack flag

# With Webpack (traditional)
pnpm dev --webpack  # Force Webpack if needed
```

**🔄 Part of the Rust ecosystem:**
Similar to Biome replacing ESLint+Prettier, Turbopack is part of Vercel's Rust-based toolchain:

- **Turborepo** - Monorepo management
- **Turbopack** - Fast bundling
- **SWC** - Fast TypeScript/JavaScript compilation

For this landing page starter with standard Next.js features (MDX, SCSS, TypeScript), Turbopack provides significantly faster development without any downsides.

### 2. Add SCSS support

```bash
pnpm add sass
```

This enables `.scss` files and SCSS Modules with SCSS preprocessing.

**🎨 What is SCSS?**

SCSS (Sassy CSS) is a CSS preprocessor that extends regular CSS with powerful features:

- **Variables** - Store colors, fonts, and sizes for reuse: `$primary-color: #3b82f6;`
- **Nesting** - Write nested selectors that mirror your HTML structure
- **Mixins** - Reusable chunks of CSS that can accept parameters
- **Functions** - Built-in functions for color manipulation, math operations
- **Imports** - Split your CSS into multiple files and combine them

**🔧 SCSS vs regular CSS:**

```scss
// SCSS - with variables and nesting
$primary-color: #3b82f6;
$border-radius: 0.5rem;

.card {
  background: white;
  border-radius: $border-radius;

  .header {
    color: $primary-color;
    font-weight: 600;

    &:hover {
      color: darken($primary-color, 10%);
    }
  }
}
```

```css
/* Compiled CSS output */
.card {
  background: white;
  border-radius: 0.5rem;
}

.card .header {
  color: #3b82f6;
  font-weight: 600;
}

.card .header:hover {
  color: #2563eb;
}
```

### Why SCSS Modules?

This starter uses SCSS modules for component styling, providing the best of both scoped CSS and powerful preprocessor features.

**🎨 What are SCSS Modules?**

- **Component-scoped CSS** - Styles are automatically scoped to components
- **SCSS preprocessing** - Variables, nesting, mixins, and functions
- **Type safety** - TypeScript integration for CSS class names
- **No naming conflicts** - Classes are automatically namespaced

**⚡ Key benefits:**

- **Maintainable code** - Styles live next to components they style
- **No global conflicts** - Scoped classes prevent CSS collisions
- **Powerful features** - Full SCSS preprocessing capabilities
- **Design system ready** - CSS custom properties for consistent theming
- **Performance** - Only loads styles for components actually used

**🔧 How it works:**
Component structure:

```
src/components/Button/
├── Button.tsx
└── Button.module.scss
```

SCSS Module (`Button.module.scss`):

```scss
$primary-color: #3b82f6;
$border-radius: 0.375rem;

.button {
  background-color: $primary-color;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: $border-radius;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darken($primary-color, 10%);
  }

  &.secondary {
    background-color: transparent;
    color: $primary-color;
    border: 1px solid $primary-color;
  }
}
```

React Component (`Button.tsx`):

```tsx
import styles from "./Button.module.scss";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({ variant = "primary", children }: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        variant === "secondary" && styles.secondary
      )}
    >
      {children}
    </button>
  );
}
```

**🎯 Perfect for landing pages:**

- **Component isolation** - Each component's styles are self-contained
- **Design consistency** - Shared CSS custom properties across components
- **Responsive design** - SCSS mixins for responsive breakpoints
- **Theme system** - CSS custom properties enable light/dark mode

### 3. Add MDX functionality

```bash
pnpm add \
  @next/mdx \
  @mdx-js/loader \
  @mdx-js/react \
  @types/mdx \
  remark-gfm
```

**Package purposes:**

- `@next/mdx` → Next.js MDX integration
- `@mdx-js/loader` → Webpack loader for MDX files
- `@mdx-js/react` → React bindings for MDX
- `@types/mdx` → TypeScript definitions for MDX
- `remark-gfm` → GitHub Flavored Markdown support

### 4. Configure MDX

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"], // String format required for Turbopack
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

**Important:** Use string format `"remark-gfm"` not the imported function for Turbopack compatibility.

### 5. Use cn() for conditional styling

This repo uses a custom `cn()` utility (wrapper around clsx) for conditionally joining CSS classes. Perfect for SCSS modules:

```tsx
import { cn } from "@/lib/utils";
import styles from "./Component.module.scss";

const classes = cn(
  styles.base,
  variant && styles[variant],
  isActive && styles.active
);
```

**Why cn() instead of clsx directly?**

- **Consistency** - Single utility across the entire codebase
- **Extensibility** - Can add custom logic (Tailwind merge, debugging, etc.) later
- **Shorter imports** - `cn` vs `clsx` (saves characters)
- **Future-proof** - Easy to enhance without changing component code

Under the hood, `cn()` uses clsx but provides a standardized interface:

```tsx
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

Install clsx dependency:
```bash
pnpm add clsx
```

### 6. Configure VS Code (Optional)

#### Install Biome VS Code Extension

1. Open Extensions in VS Code (`Cmd+Shift+X`)
2. Search for "Biome"
3. Install "Biome" by Biomejs (official extension)

#### Configure VS Code Settings

Create `.vscode/settings.json` or add to your global VS Code settings to ensure Biome works correctly with TypeScript/React and doesn't conflict with other formatters like Ruff (Python):

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.codeActionsOnSave": {
      "quickfix.biome": "explicit",
      "source.organizeImports.biome": "explicit"
    }
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.codeActionsOnSave": {
      "quickfix.biome": "explicit",
      "source.organizeImports.biome": "explicit"
    }
  },
  "[json]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.codeActionsOnSave": {
      "quickfix.biome": "explicit",
      "source.organizeImports.biome": "explicit"
    }
  }
}
```

**Important:** This configuration ensures:
- ✅ Biome handles TypeScript, TypeScript React, and JSON files exclusively
- ✅ No conflicts with other formatters (e.g., Ruff for Python)
- ✅ Automatic import organization and code fixing on save

### 7. Project structure

Your final project structure should look like:

```
my-landing/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles and CSS custom properties
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── Button/
│   │       ├── Button.tsx
│   │       └── Button.module.scss
│   ├── styles/
│   │   ├── themes.css          # CSS custom properties for themes
│   │   ├── typography.css      # Global typography styles
│   │   └── layout.css          # Global layout utilities
│   └── lib/
│       └── utils.ts            # Utility functions
├── next.config.ts
├── package.json
└── biome.json
```

## GitHub Flavored Markdown support

With `remark-gfm`, your MDX files support:

**Tables:**

```markdown
| Feature | Supported |
| ------- | --------- |
| Tables  | ✅ Yes    |
| Lists   | ✅ Yes    |
```

**Strikethrough:**

```markdown
~~This text is crossed out~~
```

**Task lists:**

```markdown
- [x] Completed task
- [ ] Incomplete task
- [x] Another done task
```

**Autolinks:**

```markdown
Visit https://example.com (automatically becomes a link)
```

**Footnotes:**

```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

## Development experience

- **Turbopack** - Faster development builds
- **TypeScript** - Type safety and better DX
- **Biome** - Fast linting and formatting (replaces ESLint + Prettier)
- **pnpm** - Efficient package management
- **SCSS Modules** - Scoped styling with preprocessing
- **CSS Custom Properties** - Design system and theming
- **Import aliases** - Clean import paths with `@/`

## Next steps

1. **Start development**: `pnpm dev`
2. **Build for production**: `pnpm build`
3. **Create components**: Add new components with SCSS modules
4. **Add MDX content**: Create `.mdx` files with full GFM support
5. **Customize themes**: Update CSS custom properties in `styles/themes.css`

## Component philosophy

This starter treats styling as component-scoped with shared design tokens. Each component owns its styles while participating in a consistent design system through CSS custom properties.

**Tip:** All `create-next-app` flags are just shortcuts. If you miss them during setup, you can add the equivalent functionality manually later.

## Styling architecture

- **SCSS Modules** - Component-specific styles with preprocessing power
- **Global styles** - Layout, typography, and reset styles
- **CSS Custom Properties** - Design tokens and theme variables
- **Utility helpers** - Simple layout classes when needed (using `cn()`)

## Troubleshooting

**MDX not working with Turbopack?**

- Use string format for plugins: `remarkPlugins: ["remark-gfm"]`
- Not function imports: `remarkPlugins: [remarkGfm]`

**SCSS not compiling?**

- Ensure `sass` package is installed
- Check file extensions in `next.config.ts`
- Verify SCSS files use `.module.scss` for SCSS Modules

**CSS custom properties not working?**

- Check that variables are defined in `styles/themes.css`
- Ensure they're imported in `globals.css`
- Verify the CSS custom property syntax: `var(--property-name)`

---

**Ready to build amazing landing pages!** 🚀
