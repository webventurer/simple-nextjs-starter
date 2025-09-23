# Button syntax transformation case study: from working solution through exploration back to validation

> **AI Assistant Note**: This case study documents a complete software development cycle that demonstrates how extensive exploration can validate existing solutions while building deeper understanding. Use this as an example of productive development investigation even when returning to the original approach.

This case study chronicles the complete journey of implementing a button syntax transformation system for MDX files in Next.js - from initial working solution through extensive experimentation and back to a refined final approach.

## 🚨 Quick reference

**Key insight**: Sometimes extensive exploration validates that your original solution was correct while building deeper understanding of the problem space.

**Original challenge**: Transform clean `[[button text|props]](url)` syntax in MDX files to React Button components without corrupting source files.

**Final solution**: AST-based remark plugin using `unist-util-visit` to create proper `mdxJsxTextElement` nodes during MDX compilation.

**Technical stack**: Next.js 15, Turbopack, MDX compilation pipeline, remark plugins, unist-util-visit

## Initial working solution

### The starting point

The project began with a functional button syntax transformation system already in place from commit `8550ad9`. The original implementation used an AST-based remark plugin that:

- Parsed `[[text|props]](url)` syntax from MDX files
- Transformed link nodes into Button component JSX during compilation
- Preserved clean source files while generating proper React components

```javascript
// Original tools/remark-button-plugin.mjs (simplified)
export default function remarkButtonPlugin() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      const match = node.url.match(/^\[\[(.*?)\]\]$/);
      if (match) {
        // Transform to mdxJsxTextElement
        const replacement = createButtonJSX(node.children, match[1]);
        parent.children[index] = replacement;
      }
    });
  };
}
```

### Why it worked

The original solution succeeded because it:
1. **Operated at AST level**: Avoided string manipulation that gets re-parsed
2. **Used proper MDX nodes**: Created `mdxJsxTextElement` nodes recognized by MDX compiler
3. **Preserved source integrity**: Never modified original `.mdx` files
4. **Integrated cleanly**: Worked within Next.js/Turbopack compilation pipeline

## The exploration phase

### Motivation for investigation

Despite having a working solution, several factors motivated deeper exploration:

1. **Understanding depth**: Need to fully comprehend the transformation pipeline
2. **Alternative approaches**: Investigate if simpler methods existed
3. **Build system integration**: Ensure compatibility with Next.js 15 and Turbopack
4. **Robustness validation**: Test the solution under different scenarios

### Attempted approaches

The exploration phase involved testing multiple alternative implementations:

#### 1. String replacement approach

**Method**: Direct string replacement in MDX content before compilation.

```javascript
// Failed approach - string replacement
function transformContent(content) {
  return content.replace(/\[\[(.*?)\|(.*?)\]\]\((.*?)\)/g, (match, text, props, url) => {
    return `<Button ${props} href="${url}">${text}</Button>`;
  });
}
```

**Why it failed**:
- **Parser re-interpretation**: MDX parser sees `<Button>` as raw HTML and escapes it
- **Security model**: Markdown parsers escape HTML by design (XSS prevention)
- **Timing problem**: String replacement happens before parsing, gets overwritten
- **HTML vs JSX mismatch**: Even if preserved, `class` ≠ `className`, `onclick` ≠ `onClick`
- **Component registration**: Raw HTML doesn't automatically become React components

#### 2. Webpack loader investigation

**Method**: Custom webpack loader to transform files before MDX processing.

**Discovery**: Next.js 15 uses Turbopack by default, not webpack. Webpack-specific solutions incompatible.

#### 3. File modification approach

**Method**: Modify source `.mdx` files to contain actual `<Button>` JSX.

**Critical problem discovered**: This corrupts the clean syntax that was the entire point of the feature.

```markdown
<!-- Before (clean) -->
[[Get Started|variant=outlined,size=large]](/signup)

<!-- After (corrupted) -->
<Button variant="outlined" size="large" href="/signup">Get Started</Button>
```

#### 4. Inline plugin definitions

**Method**: Define remark plugin directly in `next.config.ts` instead of separate file.

**Issues**:
- Configuration becomes cluttered
- Plugin logic mixed with build configuration
- Harder to test and maintain

#### 5. Runtime transformation

**Method**: Transform syntax at component render time using React hooks.

**Problems**:
- Performance impact from runtime parsing
- Complexity of maintaining transformation state
- Hydration mismatch potential

#### 6. MDX-specific plugins

**Method**: Explore MDX compilation hooks beyond remark plugins.

```javascript
// Investigation: Are there MDX-specific plugin APIs?
export default function mdxButtonPlugin() {
  return function transformer(tree, file) {
    // Does MDX provide different context than remark?
  };
}
```

**Discovery**: No separate MDX plugin system exists. `createMDX` only accepts `remarkPlugins` and `rehypePlugins`. "MDX plugins" are marketing terminology for remark plugins running in MDX context.

**Why it failed**: No architectural difference from remark plugins. Same AST, same transformation pipeline.

### Debugging insights

The exploration phase revealed several crucial technical insights:

#### MDX compilation pipeline order

```
Source .mdx → remark plugins → rehype plugins → React components
```

Any string manipulation after remark processing gets lost because MDX re-parses content.

#### The parser re-interpretation problem

This is the fundamental reason why string replacement approaches fail:

```javascript
// String replacement creates HTML
"[[text|props]](url)" → "<Button props>text</Button>"

// But MDX parser sees this as raw HTML and escapes it
"<Button props>text</Button>" → "&lt;Button props&gt;text&lt;/Button&gt;"

// Result: Escaped HTML in paragraph, not React component
```

**Why this happens:**
1. **Security by design**: Markdown parsers escape raw HTML to prevent XSS attacks
2. **Multi-stage parsing**: Later stages overwrite earlier string transformations
3. **HTML ≠ JSX**: Even if preserved, HTML attributes differ from React props

**The timing problem:**
- ❌ **Before parsing**: String replacement → gets overwritten by parser
- ✅ **After parsing**: AST manipulation → works with parser design
- ❌ **Runtime**: Component interception → works but adds performance cost

#### Could we override the parser?

**Theoretical approaches:**
```javascript
// Hypothetical: Configure parser to allow raw HTML
const withMDX = createMDX({
  options: {
    allowDangerousHtml: true,  // ❌ Doesn't exist in MDX
    preserveCustomSyntax: [...] // ❌ Would break security model
  }
});
```

**Why this wouldn't work:**
- Breaks XSS protection model
- HTML attributes ≠ React props (`class` vs `className`)
- Components still need proper registration and imports
- Defeats purpose of clean syntax

#### AST node types matter

```javascript
// Works - proper MDX JSX node that parser recognizes
{
  type: 'mdxJsxTextElement',  // MDX knows: "This is a React component"
  name: 'Button',
  attributes: [...],
  children: [...]
}

// Fails - gets re-parsed as markdown
'<Button variant="outlined">Text</Button>'  // MDX thinks: "This is raw HTML to escape"
```

#### Build system constraints

- Next.js 15 defaults to Turbopack
- Webpack-specific solutions don't apply
- Must work within established MDX compilation pipeline

#### The unified processing pattern

This pattern applies broadly in compiler/parser systems:
1. **Input validation**: Sanitize untrusted content (markdown parser escaping HTML)
2. **Structured processing**: Work with parsed structures, not raw text (AST manipulation)
3. **Type safety**: Ensure output matches expected format (proper MDX nodes)

## Validation and refinement

### Return to AST approach

After extensive exploration, the investigation validated that the original AST-based approach was fundamentally correct. However, the exploration provided insights for refinement:

#### Enhanced error handling

```javascript
export default function remarkButtonPlugin() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      if (!node.url || !parent) return; // Safety checks
      
      const match = node.url.match(/^\[\[(.*?)\]\]$/);
      if (!match) return;
      
      try {
        const replacement = createButtonJSX(node.children, match[1]);
        parent.children[index] = replacement;
      } catch (error) {
        console.error('Button transformation failed:', error);
        // Keep original node on error
      }
    });
  };
}
```

#### Improved prop parsing

```javascript
function parseProps(propString) {
  const props = {};
  
  // Handle multiple formats: "key=value,key2=value2" or "key=value key2=value2"
  const pairs = propString.split(/[,\s]+/).filter(Boolean);
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value) {
      props[key.trim()] = value.trim();
    }
  });
  
  return props;
}
```

#### Better integration testing

```javascript
// Test different syntax variations
const testCases = [
  '[[Simple button]](url)',
  '[[Button|variant=outlined]](url)',
  '[[Complex|variant=outlined,size=large]](url)',
  '[[With spaces|variant=outlined, size=large]](url)'
];
```

## Final implementation

### The refined solution

The final implementation combined the original AST approach with insights gained from exploration:

```javascript
// tools/remark-button-plugin.mjs
import { visit } from 'unist-util-visit';

export default function remarkButtonPlugin() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      // Safety checks
      if (!node.url || !parent || !Array.isArray(parent.children)) return;
      
      // Check for button syntax: [[...]]
      const match = node.url.match(/^\[\[(.*?)\]\]$/);
      if (!match) return;
      
      try {
        // Extract button text
        const textValue = node.children
          ?.filter(child => child.type === 'text')
          ?.map(child => child.value)
          ?.join('') || '';
        
        // Parse props from captured group
        const propsString = match[1];
        const props = parseProps(propsString);
        
        // Create JSX attributes
        const attributes = Object.entries(props).map(([key, value]) => ({
          type: 'mdxJsxAttribute',
          name: key,
          value: value
        }));
        
        // Create Button JSX element
        const buttonElement = {
          type: 'mdxJsxTextElement',
          name: 'Button',
          attributes,
          children: [{
            type: 'text',
            value: textValue
          }]
        };
        
        // Replace the link node
        parent.children[index] = buttonElement;
        
      } catch (error) {
        console.error('Failed to transform button syntax:', error);
        // Keep original node on transformation failure
      }
    });
  };
}

function parseProps(propsString) {
  const props = {};
  
  if (!propsString?.trim()) return props;
  
  // Split on comma or whitespace, filter empty strings
  const pairs = propsString.split(/[,\s]+/).filter(Boolean);
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=').map(s => s?.trim()).filter(Boolean);
    if (key && value) {
      props[key] = value;
    }
  });
  
  return props;
}
```

### Configuration integration

```typescript
// next.config.ts
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkButtonPlugin from './tools/remark-button-plugin.mjs';

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkButtonPlugin
    ]
  }
});

export default withMDX(nextConfig);
```

## Lessons learned

### Technical insights

#### 1. AST manipulation is often the right approach

When working with markdown/MDX transformation:
- **String replacement gets overwritten by parsers** - The core issue that breaks most approaches
- **Parser security model** - Markdown parsers escape raw HTML by design to prevent XSS
- **Timing matters** - Work after parsing (AST level), not before (string level)
- **AST-level changes integrate cleanly** - Proper `mdxJsxTextElement` nodes are recognized as components
- **Fight the parser, lose** - Work with the compilation pipeline, not against it

#### 2. Build system constraints matter

- Next.js 15 uses Turbopack by default
- Webpack-specific solutions don't apply
- Must understand the actual build pipeline in use

#### 3. Source preservation is critical

- Never modify source files when the goal is clean syntax
- Build-time transformation preserves developer experience
- Runtime transformation has performance and complexity costs

### Development methodology insights

#### 1. Exploration validates understanding

Even when returning to the original approach, the exploration phase provided:
- Deeper understanding of why the solution works
- Confidence that alternatives were properly evaluated  
- Enhanced error handling and edge case coverage
- Better integration testing

#### 2. Failed experiments have value

Each failed approach contributed understanding:
- String replacement: Taught about MDX re-parsing behavior
- Webpack investigation: Clarified actual build system (Turbopack)
- File modification: Reinforced importance of source preservation
- Runtime transformation: Highlighted performance implications
- MDX plugin investigation: Revealed that "MDX plugins" are just remark plugins with marketing terminology

#### 3. Documentation captures institutional knowledge

This case study preserves:
- Technical decisions and their reasoning
- Failed approaches and why they didn't work
- Implementation details that would be lost
- Context for future developers
- Clarification of misleading marketing terminology (e.g., "MDX plugins")

### Project management insights

#### 1. Investment in understanding pays off

Time spent exploring alternatives:
- Builds confidence in chosen solution
- Uncovers potential issues early
- Creates more robust final implementation
- Provides fallback options if requirements change

#### 2. Systematic cleanup is essential

After exploration:
- Remove experimental files
- Clean up configuration changes
- Document what was learned
- Update implementation based on insights

## Conclusion

After exploring multiple approaches, **AST manipulation is the only one that makes sense** for MDX transformations. Here's why:

### The fundamental problem with string manipulation

I tried string manipulation after remark processing, but it gets lost because MDX re-parses content:

```javascript
// String replacement creates HTML
"[[text|props]](url)" → "<Button props>text</Button>"

// But MDX parser sees this as raw HTML and escapes it
"<Button props>text</Button>" → "&lt;Button props&gt;text&lt;/Button&gt;"

// Result: Escaped HTML in paragraph, not React component
```

**You can't get around this without significant complexity.** The key insight: **parsers are designed to be secure by default, and string manipulation fights this design.**

### The solution: Work within the pipeline

The solution is to work within the compilation pipeline - **work after parsing (AST level), not before (string level)**:

- **AST-level changes integrate cleanly** with the compilation pipeline
- **Proper `mdxJsxTextElement` nodes** are recognized as React components, not escaped HTML
- **Timing matters**: After parsing = success, before parsing = failure

### What this exploration achieved

1. **Validated the original approach** - Confirmed AST-based transformation was the only viable solution
2. **Built deeper understanding** - Revealed the fundamental computer science principle behind why alternatives fail
3. **Enhanced the implementation** - Added better error handling and edge case coverage
4. **Documented institutional knowledge** - Preserved the "why" behind technical decisions

The final button syntax transformation system successfully provides clean `[[text|props]](url)` syntax in MDX files while working with, not against, the parser's security model.

### Key takeaways

- **AST manipulation is the only sensible approach** - String replacement fundamentally can't work with secure parsers
- **Parser security is intentional, not a bug** - Don't fight XSS protection, work within the design
- **Timing is everything** - Work after parsing (AST level), not before (string level)
- **Understand the compilation pipeline** - Multi-stage processing means later stages can overwrite earlier transformations
- **Exploration validates architecture** - Sometimes the best path forward is confirming you were already on the right path

---

_Sometimes the best path forward is validating that you were already on the right path._