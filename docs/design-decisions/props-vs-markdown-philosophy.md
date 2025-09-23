# Props vs markdown: API design philosophy

> **AI Assistant Note**: When discussing component API design choices between props and markdown content, always reference this document to understand the philosophy behind simple, powerful component APIs.

**By using props for simple data and markdown for natural authoring = simple, powerful components and everything becomes simple!**

**The key distinction:**
- **Props (simple data)** = Predictable values the component needs (`logo="S"`, `title="Site Name"`)
- **Markdown (natural authoring)** = Flexible content creation with variability (`[Home](/home)`, **bold text**, multiple items)

This philosophy guides how we design component APIs that are both powerful for developers and natural for content creators.

## 🚨 Quick reference

### When to use props ✅
- **Simple/primitive data** (strings, numbers, booleans)
- **Essential configuration** the component needs to function
- **Type-safe, explicit APIs** with predictable structure
- **Data that doesn't need markup** or formatting

### When to use markdown/children ✅
- **Content that needs markup** or rich formatting
- **Compositional, flexible content** that varies in structure
- **JSX-like natural nesting** patterns
- **Multiple items** with variable quantity or types

## When to use props ✅

### 1. Data is simple/primitive
```jsx
<Header title="Simple Starter" />        // ✅ String - always needed, simple
<Counter count={5} />                    // ✅ Number
<Modal isVisible={true} />               // ✅ Boolean
```

### 2. Data is essential and predictable
```jsx
<Button text="Click me" variant="primary" />  // ✅ Always need text and style
<Image src="/photo.jpg" alt="Description" />  // ✅ Required attributes
```

**Avoid over-structured configuration:**
```jsx
// ❌ Too config-heavy - this should probably be children
<Header nav={[
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" }
]} />

// ✅ Better - simple props + flexible children
<Header logo="S" title="Simple Starter">
  <Nav>
    [Home](/home)
    [About](/about)
  </Nav>
</Header>
```

### 3. You want explicit, typed API
- TypeScript can validate the prop
- IDE autocomplete works perfectly
- Clear contract of what the component expects
- Easy to document and understand

### 4. Data doesn't need markup/styling
- Plain text titles
- Simple labels
- Configuration values
- Primitive data types

## When to use children ✅

### 1. Content needs markup
```jsx
<Section>
  ## Welcome
  This is *formatted* content with **styling**

  - List items
  - With complex structure
</Section>
```

### 2. Content is compositional
```jsx
<Header>
  <Logo />
  <Navigation />
  <UserMenu />
  <SearchBar />
</Header>
```

### 3. Content varies significantly
- Sometimes simple text, sometimes complex components
- Unknown structure at component design time
- Flexible, reusable component patterns

### 4. You want JSX-like natural nesting
```jsx
<Card>
  <CardHeader>
    ### Card Title
    <Badge>New</Badge>
  </CardHeader>
  <CardBody>
    Complex content here...
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## The decision framework 🎯

### Ask these questions:

1. **Is the data simple?** → Props
2. **Does it need markup?** → Children
3. **Is it configuration?** → Props
4. **Is it compositional?** → Children
5. **Do I want type safety?** → Props
6. **Do I want flexibility?** → Children

### The pattern
```jsx
<Component
  simpleData="prop"           // Simple, typed data
  structuredData={object}     // Configuration
>
  <ComplexMarkupContent />    // Rich, flexible content
</Component>
```

## Real-world example: Header component

### Our Header decision breakdown

**Title as prop makes sense because:**
- ✅ It's always simple text (`string`)
- ✅ It's configuration data for the site
- ✅ It doesn't need markup or styling
- ✅ It's predictable and can be typed
- ✅ Clear, explicit API

**Navigation as children makes sense because:**
- ✅ It contains markup (links, lists, formatting)
- ✅ It's compositional (multiple nav items with different structures)
- ✅ It benefits from MDX's natural link syntax
- ✅ It might vary significantly between pages

### Implementation
```jsx
// ✅ Perfect balance
<Header logo="S" title="Simple Starter">
  <Nav>
    [Home](/home)
    [About](/about)
    [Contact](/contact)
  </Nav>
</Header>
```

### Alternative we rejected
```jsx
// ❌ Over-engineered - parsing children for simple title
<Header logo="S">
  Simple Starter               {/* Complex parsing needed */}
  <Nav>
    [Home](/home)
    [About](/about)
  </Nav>
</Header>
```

## Common anti-patterns ❌

### 1. Props for markup-heavy content
```jsx
// ❌ Bad: Complex HTML as prop
<Card content="### Title\n\nComplex *formatted* content" />

// ✅ Good: Use children
<Card>
  ### Title
  Complex *formatted* content
</Card>
```

### 2. Children for simple configuration
```jsx
// ❌ Bad: Simple data as children requiring parsing
<Modal>
  true                        {/* Requires parsing */}
  Modal content
</Modal>

// ✅ Good: Simple data as props
<Modal isOpen={true}>
  Modal content
</Modal>
```

### 3. Mixed concerns without clear separation
```jsx
// ❌ Bad: Unclear what's config vs content
<Header>
  Simple Starter              {/* Is this title or content? */}
  primary                     {/* Is this theme or content? */}
  <Nav>...</Nav>             {/* This is clearly navigation */}
</Header>

// ✅ Good: Clear separation
<Header title="Simple Starter" theme="primary">
  <Nav>...</Nav>
</Header>
```

### 4. Complex objects as props
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

### 5. Markdown for simple values
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

### 6. Props for natural content
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

## The API design philosophy 🎯
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
<Header logo="S" title="My Site">
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

### 5. Favor explicitness over cleverness
- Clear props are better than complex children parsing
- Type safety trumps flexibility when you don't need it
- Predictable APIs are easier to maintain

### 6. Use the "surprise test"
- Would a new developer be surprised by the API?
- Is it clear what goes where?
- Can they figure it out from the JSX alone?

### 7. Consider the use case frequency
- **Common, simple cases** → Props (optimize for ease)
- **Rare, complex cases** → Children/Markdown (optimize for flexibility)

## Evolution strategy 📈

### Start simple, add flexibility when needed
```jsx
// Phase 1: Simple props (80% of use cases)
<Button text="Click me" />

// Phase 2: Add children for complex cases (remaining 20%)
<Button>
  <Icon /> Click me
</Button>

// Phase 3: Support both patterns
<Button text="Click me" />              // Simple case
<Button><Icon /> Click me</Button>      // Complex case
```

## Rule of thumb 📏

> **Simple, typed data** → Props

> **Complex, markup-heavy content** → Markdown/Children

When in doubt, ask: "Would I be surprised if this were a prop instead of children, or vice versa?"

The best APIs feel natural and predictable to developers who haven't read the documentation.

## The bigger picture 🎨

This philosophy creates systems where:
- **Developers** can build robust, type-safe components
- **Content creators** can author naturally and creatively
- **Components** handle complexity without exposing it
- **Systems** scale from simple to sophisticated use cases

The result? **Simple, powerful components that feel natural to use.**

---

*Great APIs feel invisible - they get out of the way and let humans create.*
