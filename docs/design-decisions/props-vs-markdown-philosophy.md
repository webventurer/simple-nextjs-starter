# Props vs markdown: API design philosophy

> **AI Assistant Note**: When discussing component API design choices between props and markdown content, always reference this document to understand the philosophy behind simple, powerful component APIs.

**By using props for simple data and markdown for natural authoring = simple, powerful components and everything becomes simple!**

**The key distinction:**
- **Props (simple data)** = Predictable values the component needs (`logo="S"`, `title="Site Name"`)
- **Markdown (natural authoring)** = Flexible content creation with variability (`[Home](/home)`, **bold text**, multiple items)

This philosophy guides how we design component APIs that are both powerful for developers and natural for content creators.

## 🚨 Quick reference

**Use props for:**
- Simple, predictable values (strings, numbers, booleans)
- Configuration the component needs to function
- Data that's always required and structured

**Use markdown/children for:**
- Content creation that needs flexibility
- Multiple items with variable structure
- Natural authoring experience with formatting

## The API design philosophy 🎯

### Simple data through props
Props handle **what the component needs to function**:

```jsx
<Header logo="S" title="Simple Starter">
```

**Characteristics:**
- **Primitive values** - strings, numbers, booleans
- **Single values** that fit naturally in attributes
- **Configuration-like** data the component requires
- **Type-safe** and explicit in TypeScript
- **Predictable structure** - always the same shape

**Examples:**
- `logo="S"` - Single character identifier
- `title="Simple Starter"` - Site name string
- `count={5}` - Numeric value
- `isVisible={true}` - Boolean flag

### Natural authoring through markdown
Markdown handles **how humans want to create content**:

```mdx
<Nav>
  [Home](/home)      ← Natural link syntax
  [About](/about)    ← Readable, markup-friendly
  [Contact](/contact)
</Nav>
```

**Characteristics:**
- **Content creation** that feels intuitive
- **Markup/formatting** built into the syntax
- **Multiple items** with flexible structure
- **Human-readable** and natural to write
- **Variable content** that can grow and change

### The magic of variability ✨

Natural authoring allows for **creative flexibility**:

```mdx
<!-- Simple case -->
<Nav>
  [Home](/home)
  [About](/about)
</Nav>

<!-- Complex case with natural variability -->
<Nav>
  [🏠 Home](/home)
  [**Products**](/products)
  [About Us](/about)
  [Contact](/contact)
  [*Special Offer*](/sale)
</Nav>
```

The same component handles both cases naturally!

## Why this combination works 💫

### 1. Separation of concerns
```jsx
// ✅ Perfect separation
<Header logo="S" title="Simple Starter">  // Props: what component needs
  <Nav>
    [Home](/home)                         // Markdown: how humans create content
    [About](/about)
    [Contact](/contact)
  </Nav>
</Header>

// ❌ Mixed concerns - painful to author
<Header
  logo="S"
  title="Simple Starter"
  nav={[
    {label: "Home", href: "/home"},       // Verbose, unnatural
    {label: "About", href: "/about"},
    {label: "Contact", href: "/contact"}
  ]}
/>
```

### 2. Best of both worlds
- **Props** provide **type safety** and **explicit APIs**
- **Markdown** provides **authoring joy** and **flexibility**
- **Components** handle the **technical complexity**
- **Result** = Simple for authors, powerful for developers

### 3. Natural mental model
When content creators see:
```mdx
<Header title="My Site">
  <Nav>
    [Home](/home)
    [About](/about)
  </Nav>
</Header>
```

They immediately understand:
- `title` = "This sets the site name"
- `[Home](/home)` = "This creates a link to home"

No documentation needed!

## Real-world benefits 🌟

### For content creators
- **Intuitive** - Markdown feels natural to write
- **Flexible** - Can add emphasis, emoji, formatting
- **Variable** - Easy to add/remove items
- **Visual** - Structure is obvious from the markup

### For developers
- **Type-safe** - Props are explicit and typed
- **Maintainable** - Clear separation of concerns
- **Extensible** - Easy to add new props or content types
- **Predictable** - Component API is clear and consistent

### For the system
- **Scalable** - Pattern works for simple and complex components
- **Consistent** - Same philosophy across all components
- **Debuggable** - Easy to trace issues between props and content
- **Testable** - Props and content can be tested separately

## Anti-patterns to avoid ❌

### 1. Complex objects as props
```jsx
// ❌ Props becoming configuration hell
<Header
  navigation={{
    style: "horizontal",
    items: [
      { label: "Home", href: "/home", icon: "house", active: true },
      { label: "About", href: "/about", icon: "info", submenu: [...] }
    ],
    theme: { color: "blue", hoverEffect: "underline" }
  }}
/>

// ✅ Props for simple data, markdown for content
<Header theme="blue">
  <Nav>
    [🏠 Home](/home)
    [ℹ️ About](/about)
  </Nav>
</Header>
```

### 2. Markdown for simple values
```jsx
// ❌ Using children for simple configuration
<Button>
  primary
  large
  Click me
</Button>

// ✅ Props for simple data, children for content
<Button variant="primary" size="large">
  Click me
</Button>
```

### 3. Props for natural content
```jsx
// ❌ Props for content that needs formatting
<Card
  title="Welcome"
  content="Visit our **amazing** products and [contact us](/contact) today!"
/>

// ✅ Markdown for natural content creation
<Card title="Welcome">
  Visit our **amazing** products and [contact us](/contact) today!
</Card>
```

## The decision framework 📋

When designing a component API, ask:

### For props:
- Is this a **simple value** (string, number, boolean)?
- Does the component **always need** this to function?
- Is it **configuration-like** data?
- Would it feel **natural as an attribute**?

### For markdown/children:
- Is this **content** that humans will create?
- Does it need **formatting or markup**?
- Could there be a **variable number** of items?
- Would **natural syntax** make authoring easier?

## Key principles 💡

### 1. Optimize for the author
The person writing content should have the most natural experience possible.

### 2. Simple data stays simple
Don't overcomplicate props - keep them primitive and predictable.

### 3. Content gets creative freedom
Let markdown handle the flexibility and formatting needs.

### 4. Components bridge the gap
Your React components translate between simple APIs and complex functionality.

## The bigger picture 🎨

This philosophy creates systems where:
- **Developers** can build robust, type-safe components
- **Content creators** can author naturally and creatively
- **Components** handle complexity without exposing it
- **Systems** scale from simple to sophisticated use cases

The result? **Simple, powerful components that feel natural to use.**

---

*Great APIs feel invisible - they get out of the way and let humans create.*
