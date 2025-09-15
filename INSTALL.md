# Installation guide: Landing page starter

A comprehensive guide to setting up this Next.js landing page starter from scratch with MDX, shadcn/ui, and modern tooling.

## Quick setup

If you want to clone this repository directly:

```bash
git clone https://github.com/webventurer/landing-starter-nextjs.git
cd landing-starter-nextjs
pnpm install
pnpm dev
```

## Create from scratch

Follow these steps to recreate this setup from scratch and understand how it all works.

### 1. Create Next.js project

```bash
npx create-next-app@latest my-landing --typescript --biome --tailwind --app --src-dir --import-alias "@/*" --use-pnpm --turbopack
```

**Breaking down the command:**

- `npx` → Runs a package without installing it globally
- `create-next-app@latest` → Downloads the most recent version of the Next.js project generator
- `my-landing` → The name of the new folder it will create (your project directory)

**Flags explained:**

- `--typescript` → Sets up TypeScript out of the box (instead of plain JavaScript)
- `--biome` → Linting, formatting, bundling tool that replaces ESLint + Prettier (like ruff)
- `--tailwind` → Installs Tailwind CSS for styling
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

- ✅ **Standard Next.js features** (App Router, CSS Modules, next/image)
- ✅ **Modern tooling** (TypeScript, Tailwind, MDX)
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

For this landing page starter with standard Next.js features (MDX, Tailwind, TypeScript), Turbopack provides significantly faster development without any downsides.

### Why Tailwind CSS?

This starter includes the `--tailwind` flag to set up Tailwind CSS, a utility-first CSS framework that's become the modern standard for rapid UI development.

**🎨 What is Tailwind CSS?**

- **Utility-first framework** - Build designs using pre-built utility classes
- **Highly customizable** - Configure colors, spacing, typography through a config file
- **Component-friendly** - Works perfectly with React components
- **Design system ready** - Consistent spacing, colors, and typography out of the box

**⚡ Key benefits:**

- **Rapid development** - No need to write custom CSS for common patterns
- **Consistent design** - Built-in design system prevents inconsistent spacing/colors
- **Smaller bundle size** - Only includes classes you actually use (via purging)
- **Responsive by default** - Built-in responsive design utilities (`sm:`, `md:`, `lg:`)
- **Dark mode support** - Easy dark mode implementation with `dark:` prefix

**🔧 How it works:**
Instead of writing custom CSS:

```css
.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
}
```

You use utility classes:

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium">
  Click me
</button>
```

**🎯 Perfect for landing pages:**

- **Rapid prototyping** - Quickly try different layouts and styles
- **Consistent spacing** - Built-in spacing scale (`p-4`, `m-8`, `gap-6`)
- **Responsive design** - Mobile-first responsive utilities
- **Component libraries** - Works seamlessly with shadcn/ui and other component systems

**🔄 Complementary approach:**
This starter combines Tailwind with other approaches:

- **Tailwind utilities** - For rapid styling and prototyping
- **SCSS modules** - For complex component-specific styles
- **CSS custom properties** - For theme variables and design tokens
- **shadcn/ui components** - For pre-built, customizable components

**📋 Common utility patterns:**

```jsx
// Layout
<div className="max-w-4xl mx-auto px-4">

// Flexbox
<div className="flex items-center justify-between gap-4">

// Grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Responsive text
<h1 className="text-2xl md:text-4xl font-bold">

// Dark mode
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
```

Tailwind provides the foundation for fast, consistent styling while more complex component logic can use SCSS modules when needed.

### 2. Add MDX functionality

```bash
pnpm add @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm
```

**Package purposes:**

- `@next/mdx` → Next.js MDX integration
- `@mdx-js/loader` → Webpack loader for MDX files
- `@mdx-js/react` → React bindings for MDX
- `@types/mdx` → TypeScript definitions for MDX
- `remark-gfm` → GitHub Flavored Markdown support

### 3. Configure MDX

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

### 4. Add SCSS support

```bash
pnpm add sass
```

This enables `.scss` files and CSS Modules with SCSS preprocessing.

### 5. Setup shadcn/ui

Initialize shadcn/ui with MCP server support:

```bash
pnpm dlx shadcn@latest mcp init --client vscode
```

Then initialize the component system:

```bash
npx shadcn@latest init
```

**Why shadcn/ui?**

- Pre-built, customizable components
- Works seamlessly with Tailwind CSS
- Copy-paste components you own and can modify
- Excellent TypeScript support

### 6. Configure VS Code

Create `.vscode/settings.json`:

```json
{
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false,
  "css.customData": [".vscode/css_custom_data.json"],
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

Create `.vscode/css_custom_data.json`:

```json
{
  "version": 1.1,
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the @tailwind directive to insert Tailwind's base, components, utilities and variants styles into your CSS."
    },
    {
      "name": "@apply",
      "description": "Use @apply to inline any existing utility classes into your own custom CSS."
    },
    {
      "name": "@layer",
      "description": "Use the @layer directive to tell Tailwind which layer a set of custom styles belong to."
    },
    {
      "name": "@theme",
      "description": "Use the @theme directive to access your theme configuration values using dot notation."
    },
    {
      "name": "@custom-variant",
      "description": "Define custom variants for Tailwind CSS v4."
    }
  ]
}
```

**These files prevent:**

- CSS validation errors for Tailwind directives
- Unknown CSS property warnings
- Missing intellisense for Tailwind classes

### 7. Add workspace integration (optional)

If you have the code-fu documentation workspace, add it for persistent AI memory and standards:

1. **File** → **Add Folder to Workspace...**
2. Navigate to `code-fu`
3. Click **Add**

This keeps your current workspace and adds the code-fu folder as a second root.

**🧠 Why code-fu matters: Persistent memory for standards**

The code-fu repository implements a "Persistent AI Instructions" system that solves a critical problem: **AI assistants have no memory between conversations**.

**The AI Memory Problem:**

- ❌ AI doesn't remember previous instructions or established patterns
- ❌ Each conversation starts fresh with no institutional knowledge
- ❌ Standards and best practices need to be re-explained every time
- ❌ No consistency across different AI interactions

**The Solution: Living Documentation System**
code-fu creates persistent memory through structured documentation:

```
code-fu/docs/
├── check-me.md                    # Central AI instruction hub
├── guidelines/
│   ├── atomic-git-commits.md      # Git commit standards
│   ├── markdown-standards.md      # Documentation formatting
│   └── bug-fixing-process.md      # Systematic debugging
├── best-practice/
│   └── css/
│       ├── css-naming-conventions.md
│       └── css-file-organization.md
└── cognitive-freedom/
    ├── regression-learning.md     # Knowledge building methodology
    └── my-cognitive-enhancement.md
```

**How It Works:**

1. **Central Index** - `check-me.md` contains all AI instructions and document references
2. **Embedded Instructions** - Documents include specific AI guidance (marked with `[AI INSTRUCTION EMBEDDED]`)
3. **Reference Pattern** - AI assistants check relevant docs before giving advice
4. **Consistent Standards** - Same advice across all conversations and sessions

**Example Benefits in This Project:**

- **Git commits** follow Chris Beams style automatically (from `atomic-git-commits.md`)
- **CSS architecture** follows separation of concerns (from `css-file-organization.md`)
- **Naming conventions** use camelCase for CSS Modules (from `css-naming-conventions.md`)
- **Markdown formatting** uses sentence case headings (from `markdown-standards.md`)

**The Cognitive Enhancement Loop:**

```
Documentation → AI Instructions → Consistent Output → Improved Documentation → Better AI Instructions
```

This creates a system where knowledge compounds over time instead of being lost between conversations.

**Usage Pattern:**
Start any AI conversation with: _"Check my check-me.md file and follow the AI assistant instructions"_

This transforms AI from a stateless tool into a persistent, institutional knowledge system that maintains and applies your standards consistently across all interactions.

### 8. Setup pre-commit hooks

Install pre-commit for code quality checks:

```bash
pip install pre-commit
```

Create `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: local
    hooks:
      - id: typescript-check
        name: TypeScript Type Check
        entry: pnpm run type:check
        language: system
        files: '\.(ts|tsx)$'
        pass_filenames: false
        always_run: true
```

Add the type check script to `package.json`:

```json
{
  "scripts": {
    "type:check": "pnpm exec tsc --noEmit"
  }
}
```

Install and run the pre-commit hooks:

```bash
pre-commit install
pre-commit run --all-files
```

This ensures TypeScript type checking runs automatically before every commit.

### 9. Verify MCP server

Check if the shadcn MCP server is running:

```bash
npx shadcn@latest mcp --help
```

The MCP server allows you to browse, search, and install components from multiple registries.

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

### Component registries

Access to multiple component libraries:

- **shadcn/ui** - Core component library
- **Aceternity UI** - Animated components
- **Origin UI** - Modern UI components
- **Cult UI** - Creative component library
- **Magic UI** - Animated effects and components
- **Tremor** - Data visualization components

### Development experience

- **Turbopack** - Faster development builds
- **TypeScript** - Type safety and better DX
- **Biome** - Fast linting and formatting (replaces ESLint + Prettier)
- **pnpm** - Efficient package management
- **SCSS** - Enhanced CSS with variables and nesting
- **CSS Modules** - Scoped styling
- **Import aliases** - Clean import paths with `@/`

## Next steps

1. **Start development**: `pnpm dev`
2. **Build for production**: `pnpm build`
3. **Add components**: `npx shadcn@latest add button`
4. **Browse registries**: Use the MCP server to explore available components
5. **Create MDX content**: Add `.mdx` files with full GFM support

## Component philosophy

This starter treats components like "painting with code" - having lots of different toolsets you can easily mix into one space. The multiple registries give you a rich palette of pre-built components to choose from.

**Tip:** All `create-next-app` flags are just shortcuts. If you miss them during setup, you can add the equivalent functionality manually later.

## Troubleshooting

**MDX not working with Turbopack?**

- Use string format for plugins: `remarkPlugins: ["remark-gfm"]`
- Not function imports: `remarkPlugins: [remarkGfm]`

**Tailwind not working?**

- Ensure VS Code settings are configured
- Check that `css_custom_data.json` is in place
- Verify Tailwind is in your `package.json`

**SCSS not compiling?**

- Ensure `sass` package is installed
- Check file extensions in `next.config.ts`
- Verify SCSS files use `.module.scss` for CSS Modules

---

**Ready to build amazing landing pages!** 🚀
