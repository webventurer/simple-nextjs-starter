# Transform Markdown to React components

> **AI Assistant Note**: This document explains how to transform Markdown syntax into React components during the build process. This approach enables custom Markdown syntax that gets compiled into interactive components, bridging the gap between simple content authoring and sophisticated user experiences.

Transform custom Markdown syntax into React components automatically using remark plugins and AST manipulation. This approach allows you to write natural Markdown that gets compiled into sophisticated interactive elements without sacrificing the simplicity of Markdown authoring.

## 🚨 Quick reference

**Core concept**: Use `unist-util-visit` to traverse and transform Markdown AST nodes during compilation
**Key dependency**: `unist-util-visit` for AST traversal
**Implementation**: Remark plugins that convert custom syntax → React components
**Result**: Write `[[Button Text|variant=outlined]](https://example.com)` → Get `<Button variant="outlined" href="https://example.com">Button Text</Button>`

## The unified ecosystem: The complete picture

Before diving into implementation details, it's crucial to understand how all the pieces fit together in the unified ecosystem.

### The core relationship

**Critical understanding**: These tools work together as an integrated system - none work in isolation:

```
unified ecosystem
├── remark → Markdown processor (creates AST from text)
├── remark-gfm → GitHub Flavored Markdown plugin (extends remark)
├── unist-util-visit → AST traversal utility (navigates the tree)
├── your custom plugins → Project-specific transformations
└── MDX → Brings React components to Markdown
```

### The dependency chain

**Without remark, unist-util-visit has nothing to work with:**

```
Markdown Text
     ↓
remark parser
     ↓
    AST
     ↓
unist-util-visit
     ↓
Your transformations
```

1. **Markdown text** exists as plain strings
2. **remark** parses text into an Abstract Syntax Tree (AST)
3. **unist-util-visit** traverses and finds specific nodes in that AST
4. **Your plugin logic** transforms those nodes
5. **Final AST** gets converted to React components

### What each piece does

**remark** = The foundation
- Parses Markdown text into structured AST nodes
- Defines node types: `heading`, `link`, `paragraph`, `text`
- Provides the plugin system
- Handles standard CommonMark features

**remark-gfm** = Modern Markdown features
- Extends remark with GitHub features
- Adds tables, task lists, strikethrough
- Creates additional AST node types
- Works alongside custom plugins

**unist-util-visit** = The navigator
- Traverses the AST that remark created
- Filters nodes by type: `visit(tree, 'link', ...)`
- Provides access to node, parent, and index
- Enables surgical modifications

**Your custom plugins** = Project-specific magic
- Transform specific syntax patterns
- Create React component AST nodes
- Handle domain-specific requirements
- Enable content author productivity

### Why this architecture matters

This isn't just technical complexity - it's a powerful design that enables:

**Separation of concerns**: Each tool has a focused responsibility
**Extensibility**: Add plugins without changing core functionality
**Composability**: Combine features from different plugins
**Performance**: Build-time transformations, not runtime processing
**Maintainability**: Clear boundaries between parsing, traversing, and transforming

## Understanding the processing pipeline

### The compilation flow
```
Markdown/MDX Source
         ↓
   Remark Parsing
         ↓
  AST Transformation
         ↓
   React Components
         ↓
    Rendered HTML
```

1. **Source**: Custom Markdown syntax in `.mdx` files
2. **Remark parsing**: Markdown gets parsed into an Abstract Syntax Tree (AST)
3. **AST transformation**: `unist-util-visit` traverses and modifies nodes
4. **Component generation**: Custom syntax becomes JSX elements
5. **Rendering**: React components render in the browser

### What unist-util-visit does

`unist-util-visit` is a utility for traversing and manipulating Abstract Syntax Trees (ASTs) in the unified ecosystem. It provides a clean API for finding and transforming specific node types in parsed content.

**Core functionality**:
- **Traverse nodes**: Walk through every element in a syntax tree
- **Filter by type**: Target specific node types (headings, links, paragraphs, etc.)
- **Transform content**: Modify, replace, or enhance nodes during traversal
- **Maintain structure**: Preserve document structure while making changes

### Practical examples of the dependency

Now that you understand the ecosystem, let's see the dependency in action:

#### This won't work - no AST to visit
```javascript
const markdownText = "# Hello [link](url)";
visit(markdownText, 'link', (node) => {
  // ERROR: markdownText is just a string, not an AST
});
```

#### This works - remark creates the AST first
```javascript
import { remark } from 'remark';
import { visit } from 'unist-util-visit';

const processor = remark();
const ast = processor.parse("# Hello [link](url)");
// Now ast is a tree structure that visit() can traverse
visit(ast, 'link', (node) => {
  // SUCCESS: node is a link AST node with properties and children
});
```

#### In your remark plugin context
```javascript
export default function remarkButton() {
  return (tree) => {  // ← 'tree' is the AST that remark created
    visit(tree, 'link', (node, index, parent) => {
      // This works because:
      // 1. remark parsed Markdown into this AST
      // 2. remark identified 'link' nodes in the tree
      // 3. unist-util-visit can now find and traverse them
    });
  };
}
```

## Real-world implementation example

Let's examine the button transformation plugin from this project:

### Custom Markdown syntax
```markdown
[[Get Started|variant=outlined,size=large]](https://example.com)
```

### Remark plugin implementation
```javascript
import { visit } from 'unist-util-visit';

export default function remarkButton() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      // Only process links with specific text pattern
      if (!node.children || !node.children[0] || node.children[0].type !== 'text') return;

      const linkText = node.children[0].value;
      const match = linkText.match(/^\[(.+?)(?:\|(.+?))?\]$/);

      if (!match) return;

      // Extract button text and properties
      const buttonText = match[1].trim();
      const propsString = match[2];
      const href = node.url;

      // Parse properties from string
      const props = {};
      if (propsString) {
        propsString.split(',').forEach((pair) => {
          const [key, value] = pair.split('=');
          if (key && value) props[key.trim()] = value.trim();
        });
      }

      // Create JSX element node
      const buttonNode = {
        type: 'mdxJsxTextElement',
        name: 'Button',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'href',
            value: href
          },
          ...Object.entries(props).map(([key, value]) => ({
            type: 'mdxJsxAttribute',
            name: key,
            value: value
          }))
        ],
        children: [{
          type: 'text',
          value: buttonText
        }]
      };

      // Replace link node with button component
      parent.children[index] = buttonNode;
    });
  };
}
```

### Generated output
The above plugin transforms the Markdown into:
```jsx
<Button href="https://example.com" variant="outlined" size="large">
  Get Started
</Button>
```

### Code breakdown step-by-step

Let's examine exactly what each part of the plugin does:

#### Plugin structure
```javascript
export default function remarkButton() {
  return (tree) => {
    // Plugin logic here
  };
}
```
- Creates a remark plugin that processes the Markdown AST (Abstract Syntax Tree)
- Returns a function that receives the parsed document tree

#### AST traversal
```javascript
visit(tree, 'link', (node, index, parent) => {
```
- Uses `unist-util-visit` to find all `link` nodes in the document
- For each link, it gets the node, its position (index), and its parent

#### Pattern matching
```javascript
const linkText = node.children[0].value;
const match = linkText.match(/^\[(.+?)(?:\|(.+?))?\]$/);
```
- Extracts the link text (what's between `[` and `]` in Markdown)
- Uses regex to match the pattern: `[Button Text|prop1=value1,prop2=value2]`
- The regex captures:
  - `(.+?)` = button text (required)
  - `(?:\|(.+?))?` = properties string after `|` (optional)

#### Property parsing
```javascript
const props = {};
if (propsString) {
  propsString.split(',').forEach((pair) => {
    const [key, value] = pair.split('=');
    if (key && value) props[key.trim()] = value.trim();
  });
}
```
- Splits the properties string by commas: `variant=outlined,size=large`
- Splits each pair by `=` to get key-value pairs
- Builds a props object: `{variant: "outlined", size: "large"}`

#### JSX node creation
```javascript
const buttonNode = {
  type: 'mdxJsxTextElement',
  name: 'Button',
  attributes: [
    {
      type: 'mdxJsxAttribute',
      name: 'href',
      value: href
    },
    ...Object.entries(props).map(([key, value]) => ({
      type: 'mdxJsxAttribute',
      name: key,
      value: value
    }))
  ],
  children: [{
    type: 'text',
    value: buttonText
  }]
};
```
- Creates a new AST node representing a React component
- Sets the component name to `Button`
- Adds `href` attribute from the original link URL
- Adds all parsed properties as component attributes
- Sets the button text as the component's children

#### Node replacement
```javascript
parent.children[index] = buttonNode;
```
- Replaces the original link node with the new Button component node
- This happens during the build process, so the final output contains React components instead of links

#### The transformation result
When you write this in your MDX file:
```markdown
Check out our [[documentation|variant=outlined]](/docs) for more info.
```

The plugin automatically converts it to:
```jsx
Check out our <Button href="/docs" variant="outlined">documentation</Button> for more info.
```

This lets content authors use simple, readable Markdown syntax while getting rich interactive components in the final rendered page!

## Key patterns and techniques

### Understanding AST nodes

#### What is an AST?

An **Abstract Syntax Tree** is a data structure that represents the hierarchical structure of source code after it's been parsed. It breaks down the content into a tree of nodes, where each node represents a specific element or construct.

#### Markdown ASTs vs Code ASTs

**Important distinction**: ASTs are used for both code and markup languages, but in this remark plugin case, we're working with **Markdown ASTs**, not code ASTs.

**Code ASTs** (JavaScript, Python, etc.) represent programming language structure:
```javascript
// JavaScript code
function hello(name) {
  return `Hello ${name}`;
}
```
Becomes a code AST with nodes like: `FunctionDeclaration`, `Identifier`, `ReturnStatement`, `TemplateLiteral`

**Markdown ASTs** represent document structure:
```markdown
# Hello
This is a [link](https://example.com)
```
Becomes a Markdown AST with nodes like: `heading`, `paragraph`, `link`, `text`

**Why Markdown gets an AST**: While Markdown looks like "just text," it has meaningful structure - headings create hierarchy, links have URLs, paragraphs group content. The AST captures this structure for programmatic manipulation.

**Your remark plugin uses Markdown ASTs**:
```javascript
visit(tree, 'link', (node, index, parent) => {
  // This 'link' is a Markdown AST node type
  // NOT a JavaScript code AST node
```

**AST vs simple string replacement**:
- **Without AST**: `content.replace(/\[\[(.+?)\]\]/, '<Button>')` - fragile, could break
- **With AST**: `visit(tree, 'link', ...)` - robust, understands document structure

#### AST nodes explained

Each **node** in the tree represents a piece of the parsed content:

**Basic node structure:**
Every AST node typically contains:
- **type**: What kind of element it is (`heading`, `paragraph`, `link`, `text`, etc.)
- **children**: Array of child nodes (if any)
- **properties/attributes**: Node-specific data
- **position**: Location in the original source file

**Example: Markdown to AST**

**Markdown input:**
```markdown
# Hello World

This is a [link](https://example.com) in a paragraph.
```

**Resulting AST structure:**
```javascript
{
  type: 'root',
  children: [
    {
      type: 'heading',
      depth: 1,
      children: [
        {
          type: 'text',
          value: 'Hello World'
        }
      ]
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: 'This is a '
        },
        {
          type: 'link',
          url: 'https://example.com',
          children: [
            {
              type: 'text',
              value: 'link'
            }
          ]
        },
        {
          type: 'text',
          value: ' in a paragraph.'
        }
      ]
    }
  ]
}
```

#### Common node types in Markdown

**Text elements:**
```javascript
{
  type: 'text',
  value: 'Hello world'
}
```

**Headings:**
```javascript
{
  type: 'heading',
  depth: 2,  // Level (h1, h2, h3, etc.)
  children: [/* text nodes */]
}
```

**Links:**
```javascript
{
  type: 'link',
  url: 'https://example.com',
  title: 'Optional title',
  children: [/* text nodes */]
}
```

**Paragraphs:**
```javascript
{
  type: 'paragraph',
  children: [/* text, link, emphasis nodes */]
}
```

**Code blocks:**
```javascript
{
  type: 'code',
  lang: 'javascript',
  value: 'console.log("hello");'
}
```

#### How AST nodes work in the remark plugin

In the button transformation plugin, here's what happens with nodes:

**1. Finding link nodes:**
```javascript
visit(tree, 'link', (node, index, parent) => {
```
This finds nodes with `type: 'link'`

**2. Examining node structure:**
A typical link node looks like:
```javascript
{
  type: 'link',
  url: 'https://example.com',
  children: [
    {
      type: 'text',
      value: '[Get Started|variant=outlined]'  // Your custom syntax
    }
  ]
}
```

**3. Creating new nodes:**
The plugin creates a new JSX node:
```javascript
const buttonNode = {
  type: 'mdxJsxTextElement',    // Special MDX node type
  name: 'Button',               // Component name
  attributes: [                 // Props as attributes
    {
      type: 'mdxJsxAttribute',
      name: 'href',
      value: href
    }
  ],
  children: [                   // Component children
    {
      type: 'text',
      value: buttonText
    }
  ]
};
```

**4. Node replacement:**
```javascript
parent.children[index] = buttonNode;
```
This replaces the original link node with the new Button component node.

#### Why AST nodes matter

**For content processing:**
- **Precise targeting**: You can find and modify specific types of content
- **Structure preservation**: The tree structure maintains document hierarchy
- **Context awareness**: Each node knows its parent and children

**For transformations:**
- **Surgical changes**: Modify only what you need, leave everything else intact
- **Type safety**: Each node type has predictable properties
- **Composition**: Build complex structures from simple node types

#### Visualizing AST nodes

You can visualize AST structures using tools like:
- **AST Explorer** (astexplorer.net) - Interactive AST visualization
- **Console logging**: `console.log(JSON.stringify(node, null, 2))`
- **Unist utilities** - Various helper functions for AST manipulation

### Traversal patterns
```javascript
// Visit all nodes of a specific type
visit(tree, 'heading', (node) => {
  // Transform all headings
});

// Visit nodes with conditions
visit(tree, 'link', (node) => {
  if (node.url.startsWith('http')) {
    // Transform external links only
  }
});

// Access parent and index for replacements
visit(tree, 'link', (node, index, parent) => {
  parent.children[index] = newNode; // Replace node
});
```

### Property parsing patterns
```javascript
// Parse key=value pairs from strings
function parseProps(propsString) {
  const props = {};
  if (propsString) {
    propsString.split(',').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key && value) {
        props[key.trim()] = value.trim();
      }
    });
  }
  return props;
}

// Handle different value types
function parseTypedValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^\d+$/.test(value)) return parseInt(value);
  return value; // String default
}
```

### JSX node creation patterns
```javascript
// Text element with attributes
const jsxNode = {
  type: 'mdxJsxTextElement',
  name: 'ComponentName',
  attributes: [
    {
      type: 'mdxJsxAttribute',
      name: 'prop',
      value: 'value'
    }
  ],
  children: [
    {
      type: 'text',
      value: 'Content'
    }
  ]
};

// Block element (flow element)
const blockJsxNode = {
  type: 'mdxJsxFlowElement',
  name: 'BlockComponent',
  attributes: [], // Attributes array
  children: [] // Children array
};
```

## Common use cases and applications

### Content enhancement
Transform basic Markdown into rich components:
- **Buttons**: `[[Text]](url)` → Interactive button components
- **Cards**: Custom syntax → Feature cards with icons and styling
- **Alerts**: `!!! warning` → Styled alert components
- **Code blocks**: Language-specific enhancements

### Automatic processing
Add functionality without manual component insertion:
- **Link decoration**: External links get target="_blank"
- **Image optimization**: Auto-resize and lazy loading
- **Table enhancement**: Sortable columns, styling
- **Heading anchors**: Auto-generate navigation links

### Content validation and normalization
Ensure content quality during build:
- **Link checking**: Validate URLs during compilation
- **Image verification**: Ensure images exist
- **Content structure**: Enforce document patterns
- **Accessibility**: Add alt text, ARIA labels

## Integration with Next.js and MDX

### Next.js configuration
```javascript
// next.config.ts
import createMDX from '@next/mdx';
import remarkButton from './tools/remark/remark-parse-buttons.mjs';

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkButton, // Your custom plugin
      // Other remark plugins
    ],
  },
});

export default withMDX(nextConfig);
```

### Component registration
```typescript
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import { Button } from '@/components/Button/Button';

const components: MDXComponents = {
  Button, // Make Button available in MDX
  // Other components
};

export function useMDXComponents(): MDXComponents {
  return components;
}
```

### Package dependencies
```json
{
  "dependencies": {
    "@mdx-js/loader": "^3.1.1",
    "@mdx-js/react": "^3.1.1",
    "@next/mdx": "^15.5.3",
    "unist-util-visit": "^5.0.0"
  }
}
```

### GitHub Flavored Markdown with remark-gfm

#### Understanding remark vs remark-gfm

Before diving into remark-gfm specifically, it's important to understand the relationship between **remark** and **remark-gfm** - they work together but serve different purposes.

**What is remark?**

**Remark** is the core Markdown processor in the unified ecosystem. It's the foundation that:

**Core functionality:**
- **Parses Markdown** → Converts Markdown text into an Abstract Syntax Tree (AST)
- **Processes the AST** → Runs plugins that transform the tree
- **Serializes back** → Converts the AST back to Markdown, HTML, or other formats

**Basic Markdown support:**
Remark handles **standard CommonMark** features out of the box:
- Headers (`# ## ###`)
- Paragraphs and line breaks
- Emphasis (`*italic*`, `**bold**`)
- Links (`[text](url)`)
- Images (`![alt](src)`)
- Code blocks and inline code
- Lists (ordered and unordered)
- Blockquotes (`>`)

**What is remark-gfm?**

**remark-gfm** is a **plugin for remark** that extends it with GitHub Flavored Markdown features:

**Extended features:**
- Tables (`| col1 | col2 |`)
- Strikethrough (`~~text~~`)
- Task lists (`- [x] done`)
- Autolinks (bare URLs become clickable)
- Footnotes (`[^1]`)

**The relationship:**

```
remark (core processor)
├── Standard Markdown parsing ✅
├── Plugin system ✅
└── Plugins extend functionality:
    ├── remark-gfm → GitHub features
    ├── remark-math → Math equations
    ├── your custom plugins → Button transformations
    └── many others...
```

**In your project's pipeline:**

**Without any plugins:**
```javascript
// next.config.ts - minimal remark
const withMDX = createMDX({
  options: {
    remarkPlugins: [], // Only standard Markdown works
  },
});
```

**Result**: Only basic Markdown features work
- ✅ Headers, paragraphs, links, emphasis
- ❌ No tables, no task lists, no custom buttons

**With remark-gfm:**
```javascript
// next.config.ts - with GFM support
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm', // Adds GitHub features
    ],
  },
});
```

**Result**: Standard Markdown + GitHub features work
- ✅ Headers, paragraphs, links, emphasis
- ✅ Tables, task lists, strikethrough
- ❌ No custom buttons

**With both remark-gfm and your custom plugin:**
```javascript
// next.config.ts - full setup
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm',    // GitHub features
      remarkButton,    // Your custom button transformation
    ],
  },
});
```

**Result**: Everything works
- ✅ Standard Markdown
- ✅ GitHub Flavored Markdown
- ✅ Your custom button transformations

**The processing order matters:**

```
Markdown Source
     ↓
remark (core parser) → Creates basic AST
     ↓
remark-gfm plugin → Adds table/task/strikethrough nodes
     ↓
remarkButton plugin → Transforms link nodes to button nodes
     ↓
Final AST → Converted to React components
```

**Think of it like layers:**

```
Your Content
├── Markdown syntax → Handled by remark core
├── GitHub syntax → Handled by remark-gfm plugin
├── Button syntax → Handled by your remarkButton plugin
└── Final output → All features work together
```

**Key insight:**
- **remark** = The processor that makes Markdown transformation possible
- **remark-gfm** = A popular plugin that adds modern Markdown features
- **remarkButton** = Your custom plugin that adds project-specific features

All remark plugins (including remark-gfm and your custom ones) use the same `unist-util-visit` pattern to traverse and transform the AST that remark creates. They just target different node types and add different transformations!

#### What is remark-gfm?

`remark-gfm` is a remark plugin that adds **GitHub Flavored Markdown (GFM)** support to your MDX processing pipeline. It extends standard Markdown with features that GitHub popularized and are now widely expected in modern Markdown environments.

#### Standard Markdown vs GitHub Flavored Markdown

**Standard Markdown** only supports basic formatting:
- Headers, paragraphs, emphasis
- Links and images
- Code blocks and inline code
- Lists (ordered/unordered)

**GitHub Flavored Markdown** adds many more features that people expect:

**Tables:**
```markdown
| Feature | Standard MD | GFM |
|---------|-------------|-----|
| Tables  | ❌ No      | ✅ Yes |
| Tasks   | ❌ No      | ✅ Yes |
```

**Strikethrough:**
```markdown
~~This text is crossed out~~
```

**Task Lists (Checkboxes):**
```markdown
- [x] Completed task
- [ ] Incomplete task
- [x] Another done task
```

**Autolinks:**
```markdown
Visit https://example.com (automatically becomes clickable)
Email: user@example.com (also becomes clickable)
```

**Footnotes:**
```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.
```

#### Integration with custom transformations

**Enhanced Next.js configuration:**
```javascript
// next.config.ts
import createMDX from '@next/mdx';
import remarkButton from './tools/remark/remark-parse-buttons.mjs';

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm',    // GitHub Flavored Markdown support
      remarkButton,    // Your custom button transformation
    ],
    rehypePlugins: [],
  },
});
```

**Processing flow with GFM:**
```
Markdown/MDX Source (with GFM syntax)
         ↓
   Remark Parsing (with remark-gfm)
         ↓
  AST Transformation (understands tables, tasks, buttons, etc.)
         ↓
   React Components
         ↓
    Rendered HTML
```

#### Rich content alongside custom transformations

`remark-gfm` enables professional content that works seamlessly with your custom button syntax:

```markdown
# Product Comparison

| Feature | Basic Plan | Pro Plan |
|---------|-----------|----------|
| Users   | 5         | 50       |
| Storage | 1GB       | 100GB    |

## Next Steps

- [x] Email support ✅
- [x] Chat support ✅
- [ ] Phone support (Pro only)

~~Limited time offer~~ **Special pricing available!**

[[Upgrade to Pro|variant=outlined]](/upgrade)
[[Contact Sales|variant=primary]](/contact)

Questions? Email us at support@example.com
```

#### AST nodes GFM adds

`remark-gfm` extends the Markdown AST with additional node types:

```javascript
// Table nodes
{
  type: 'table',
  children: [/* tableRow nodes */]
}

// Task list item nodes
{
  type: 'listItem',
  checked: true, // or false
  children: [/* content */]
}

// Delete (strikethrough) nodes
{
  type: 'delete',
  children: [/* text content */]
}
```

You could even process these with `unist-util-visit`:

```javascript
// Example: Transform all completed tasks
visit(tree, 'listItem', (node) => {
  if (node.checked === true) {
    // Add special styling or behavior to completed tasks
  }
});
```

#### Why GFM is essential

Without `remark-gfm`:
- ❌ Tables don't render (just show as plain text)
- ❌ Task lists don't have checkboxes
- ❌ Strikethrough doesn't work
- ❌ URLs don't auto-link
- ❌ Footnotes don't work

With `remark-gfm`:
- ✅ Full GitHub parity
- ✅ Professional documentation experience
- ✅ Familiar authoring for content creators
- ✅ Rich content that works alongside your custom transformations

`remark-gfm` makes your MDX content feel modern and professional by supporting the Markdown features people expect from GitHub, while your custom remark plugins add project-specific enhancements. Together, they create a powerful content authoring experience that's both familiar and extensible.

## Advanced techniques

### Multi-pass processing
```javascript
export default function complexTransform() {
  return (tree) => {
    // First pass: Collect information
    const collected = [];
    visit(tree, 'element', (node) => {
      collected.push(/* data */);
    });

    // Second pass: Transform based on collected data
    visit(tree, 'element', (node, index, parent) => {
      // Use collected information for transformation
    });
  };
}
```

### Conditional transformations
```javascript
visit(tree, 'link', (node, index, parent) => {
  const url = node.url;

  if (url.startsWith('mailto:')) {
    // Transform email links
  } else if (url.startsWith('tel:')) {
    // Transform phone links
  } else if (url.match(/\.(jpg|png|gif)$/)) {
    // Transform image links to image components
  }
});
```

### Content extraction and analysis
```javascript
function extractHeadings() {
  return (tree) => {
    const headings = [];

    visit(tree, 'heading', (node) => {
      const text = node.children
        .filter(child => child.type === 'text')
        .map(child => child.value)
        .join('');

      headings.push({
        level: node.depth,
        text: text,
        slug: slugify(text)
      });
    });

    // Store headings for table of contents generation
    tree.data = tree.data || {};
    tree.data.headings = headings;
  };
}
```

## Debugging and development

### Node inspection
```javascript
visit(tree, (node) => {
  console.log('Node type:', node.type);
  console.log('Node:', JSON.stringify(node, null, 2));
});
```

### Selective debugging
```javascript
visit(tree, 'link', (node, index, parent) => {
  if (node.children?.[0]?.value?.includes('[')) {
    console.log('Button candidate:', node);
  }
});
```

### AST visualization
Use tools like:
- **AST Explorer**: Visualize Markdown AST online
- **unified-engine**: Command-line processing
- **remark-cli**: Test plugins in isolation

## Best practices

### Plugin design
- **Single responsibility**: Each plugin should do one thing well
- **Non-destructive**: Don't modify unless transformation is needed
- **Performance conscious**: Exit early when possible
- **Error handling**: Gracefully handle malformed input

### Syntax design
- **Intuitive**: Custom syntax should feel natural in Markdown
- **Backwards compatible**: Fallback behavior for unsupported environments
- **Discoverable**: Clear patterns that authors can learn easily
- **Extensible**: Allow for future enhancements

### Testing approach
```javascript
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import remarkButton from './remark-parse-buttons.mjs';

test('transforms button syntax', () => {
  const processor = remark()
    .use(remarkMdx)
    .use(remarkButton);

  const result = processor.processSync('[[Click me]](https://example.com)');
  expect(result.toString()).toContain('<Button href="https://example.com">');
});
```

## Troubleshooting common issues

### Node replacement not working
- Check that you're modifying `parent.children[index]`, not the node directly
- Ensure the new node has the correct AST structure
- Verify the node type matches MDX expectations

### Properties not parsing correctly
- Debug the regex pattern with various inputs
- Handle edge cases (empty values, special characters)
- Validate property names match component props

### Performance issues
- Add early returns to skip irrelevant nodes
- Use specific node type selectors instead of visiting all nodes
- Consider caching expensive operations

## Component complexity and the real benefits

### Does this approach make Button.tsx simpler?

The remark plugin approach doesn't make the `Button.tsx` component itself simpler, but it dramatically simplifies **how content authors use the button** and provides significant architectural benefits.

### Component complexity stays the same

Your `Button.tsx` component has identical complexity regardless of the remark plugin:

```tsx
// Button.tsx - complexity stays the same
export function Button({
  className,
  variant,
  size,
  href,
  children
}: ButtonComponentType) {
  return (
    <Link
      href={href}
      className={cn(
        classes.button,
        variant && variantClass[variant],
        size && sizeClass[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
```

The component logic, styling, props handling - all identical.

### What gets dramatically simpler - content authoring

**Without remark plugin** (manual JSX in MDX):
```mdx
# Welcome to Our Site

We offer great services. You should
<Button href="/signup" variant="outlined" size="large">
  Get Started Today
</Button>
and join thousands of happy customers.

Check out our <Button href="/docs" variant="outlined">documentation</Button> too.
```

**With remark plugin** (clean Markdown):
```mdx
# Welcome to Our Site

We offer great services. You should [[Get Started Today|variant=outlined,size=large]](/signup) and join thousands of happy customers.

Check out our [[documentation|variant=outlined]](/docs) too.
```

### The real benefits

#### 1. Content flow
- **Without plugin**: Breaks Markdown flow with JSX syntax
- **With plugin**: Stays in natural Markdown writing mode

#### 2. Readability in source
- **Without plugin**: JSX tags clutter the content
- **With plugin**: Clean, readable Markdown syntax

#### 3. Content author experience
- **Without plugin**: Authors need to know React/JSX
- **With plugin**: Authors just write enhanced Markdown

#### 4. Consistency enforcement
- **Without plugin**: Authors might use inconsistent JSX patterns
- **With plugin**: Enforced consistent syntax via the parser

#### 5. Version control clarity
- **Without plugin**: Diffs show JSX noise mixed with content
- **With plugin**: Clean content diffs

### Enabling simpler component APIs

The remark approach can actually enable **simpler component APIs**:

**Reduced props complexity for common cases:**
```tsx
// Without plugin - might need complex prop combinations
<Button
  href="/signup"
  variant="outlined"
  size="large"
  className="custom-class"
  onClick={handleClick}
  // ... many possible props
>
  Get Started
</Button>
```

```markdown
// With plugin - streamlined common use cases
[[Get Started|variant=outlined,size=large]](/signup)
```

The plugin handles 80% of common button use cases with simple syntax, while complex cases can still fall back to JSX when needed.

**Smart defaults in the transformation:**
```javascript
// In the remark plugin - apply smart defaults
const buttonNode = {
  type: 'mdxJsxTextElement',
  name: 'Button',
  attributes: [
    {
      type: 'mdxJsxAttribute',
      name: 'href',
      value: href
    },
    // Apply default variant if none specified
    ...(props.variant ? [] : [{
      type: 'mdxJsxAttribute',
      name: 'variant',
      value: 'primary'
    }]),
    ...otherProps
  ]
};
```

### The architecture impact

- **Component complexity**: Same
- **Usage complexity**: Much simpler
- **Maintenance**: Easier (centralized transformation logic)
- **Content scaling**: Much better (authors focus on content, not markup)

Think of it like this:
- **Button.tsx** = The engine (same complexity)
- **Remark plugin** = The automatic transmission (makes it easier to drive)
- **Content authors** = The drivers (much simpler experience)

While `Button.tsx` stays the same complexity, the **overall system** becomes much simpler to use and maintain. The remark plugin creates a layer of abstraction that makes powerful components easy to use in content.

## The power of AST transformation

This approach provides several key advantages:

### For authors
- **Natural syntax**: Write in familiar Markdown
- **Rich output**: Get sophisticated components automatically
- **No context switching**: Stay in content creation flow
- **Version control friendly**: Plain text, clear diffs

### For developers
- **Centralized logic**: Component behavior defined once
- **Build-time processing**: No runtime performance impact
- **Type safety**: Full TypeScript support for components
- **Maintainability**: Clear separation of content and presentation

### For projects
- **Consistency**: All similar elements use the same component
- **Scalability**: Easy to update behavior across all content
- **Flexibility**: Support multiple output formats from same source
- **Performance**: Optimal bundle size and rendering

## Extending the pattern

This technique can be applied to many content transformation needs:

- **Documentation sites**: Auto-generate API references
- **E-commerce**: Product links become rich product cards
- **Education**: Quiz syntax becomes interactive elements
- **Marketing**: Call-to-action syntax becomes conversion-optimized components

The combination of remark, unist-util-visit, and MDX creates a powerful content processing pipeline that bridges the gap between simple authoring and sophisticated user experiences.

## Critical assessment: Is this approach worth the complexity?

After implementing and documenting this solution, it's important to honestly evaluate whether this level of complexity is justified for the problem being solved.

### The complexity cost

This remark + unist-util-visit solution requires:
- **Understanding AST concepts** - Content authors need to learn abstract syntax trees
- **Custom plugin development** - Building and maintaining transformation logic
- **Build-time processing** - Additional compilation steps and potential debugging
- **Ecosystem knowledge** - Deep understanding of unified/remark/unist toolchain
- **Regex patterns** - Complex string parsing for prop extraction
- **Node replacement logic** - AST manipulation that can break if implemented incorrectly

### What we're actually saving

The transformation converts:
```markdown
[[Get Started|variant=outlined,size=large]](/signup)
```

Into what could simply be:
```mdx
<Button href="/signup" variant="outlined" size="large">
  Get Started
</Button>
```

**We're adding significant architectural complexity to save approximately 20 characters per button.**

### Simpler alternatives that accomplish the same goal

#### 1. Direct JSX in MDX (simplest)
```mdx
<!-- Clean, readable, no build-time complexity -->
<Button href="/signup" variant="outlined" size="large">
  Get Started Today
</Button>
```

**Pros:**
- Zero build-time complexity
- Full TypeScript support
- Works out of the box with MDX
- Immediately readable to any React developer

**Cons:**
- Slightly more verbose
- JSX mixed with Markdown content

#### 2. String replacement (middle ground)
```javascript
// Simple build-time transformation - no AST needed
content = content.replace(
  /\[\[(.+?)\|(.+?)\]\]\((.+?)\)/g,
  '<Button $2 href="$3">$1</Button>'
);
```

**Pros:**
- Much simpler to understand and debug
- No AST complexity
- Easy to implement and maintain

**Cons:**
- Fragile with nested content
- No syntax validation
- Limited prop parsing capabilities

#### 3. Enhanced component APIs
```tsx
// Better component design instead of custom syntax
<LinkButton to="/signup" variant="outlined" size="large">
  Get Started Today
</LinkButton>

// Or content-focused API
<Button variant="cta">
  [Get Started Today](/signup)
</Button>
```

### When this complexity IS justified

The remark + unist-util-visit approach makes sense when:

1. **Migrating legacy Markdown** - Converting existing content with custom syntax
2. **Complex transformations** - Multiple syntax patterns requiring sophisticated parsing
3. **Content author restrictions** - Team absolutely cannot learn basic JSX syntax
4. **Large content teams** - Hundreds of content contributors who need simplified syntax
5. **Domain-specific languages** - Building custom content authoring experiences

### For this specific use case: **Complexity not justified**

Looking at this project's context:
- Content authors already use MDX syntax
- They're comfortable with React components like `<Alert>`, `<Card>`
- The project expects JSX knowledge for `.mdx` files
- We have a single transformation pattern (buttons)

**Adding one more component (`<Button>`) to the existing component vocabulary is trivial compared to the AST transformation infrastructure.**

### The readability question

Which is actually more readable?

```mdx
<!-- Immediately clear to React developers -->
<Button href="/signup" variant="outlined" size="large">
  Get Started Today
</Button>

<!-- Requires mental parsing of custom syntax -->
[[Get Started Today|variant=outlined,size=large]](/signup)
```

The JSX syntax is **more explicit, more familiar, and easier to understand** for anyone working with React.

### Recommended approach: Keep it simple

For this use case, the optimal solution is:

1. **Use direct JSX in MDX** - It's clean, readable, and maintainable
2. **Focus on component design** - Make components feel natural and semantic
3. **Optimize content workflow** - Improve authoring experience through better tooling, not syntax tricks
4. **Save complexity budget** - Use engineering time for features that genuinely improve user experience

### Final verdict

**This remark/AST solution is impressive engineering that solves the wrong problem.**

The custom syntax transformation optimizes for character count while introducing significant architectural complexity. The direct JSX approach is actually **more readable, more maintainable, and requires zero custom infrastructure**.

**Sometimes the simple solution is the right solution.**

---

*While AST transformation is a powerful technique for complex content processing needs, it's important to match the solution complexity to the actual problem scope. Not every content transformation challenge requires a custom compiler.*
