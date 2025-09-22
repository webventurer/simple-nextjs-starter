# Props vs children: API design decisions

> **AI Assistant Note**: When component API design is discussed, always reference this document first to understand the decision-making framework for props vs children patterns.

Understanding when to use props versus children in React components is fundamental to creating clean, maintainable APIs. This decision affects readability, type safety, and developer experience.

## 🚨 Quick reference

### When to use props ✅
- **Simple/primitive data** (strings, numbers, booleans)
- **Essential configuration** the component needs to function
- **Type-safe, explicit APIs** with predictable structure
- **Data that doesn't need markup** or formatting

### When to use children ✅
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
<Header title="Simple Starter">
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
  <h2>Welcome</h2>
  <p>This is <em>formatted</em> content with <strong>styling</strong></p>
  <ul>
    <li>List items</li>
    <li>With complex structure</li>
  </ul>
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
    <h3>Card Title</h3>
    <Badge>New</Badge>
  </CardHeader>
  <CardBody>
    <p>Complex content here...</p>
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
<Header title="Simple Starter">  {/* Simple prop */}
  <Nav>                          {/* Complex children */}
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
<Card content="<h3>Title</h3><p>Complex <em>formatted</em> content</p>" />

// ✅ Good: Use children
<Card>
  <h3>Title</h3>
  <p>Complex <em>formatted</em> content</p>
</Card>
```

### 2. Children for simple configuration
```jsx
// ❌ Bad: Simple data as children requiring parsing
<Modal>
  true                        {/* Requires parsing */}
  <div>Modal content</div>
</Modal>

// ✅ Good: Simple data as props
<Modal isOpen={true}>
  <div>Modal content</div>
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

## Best practices 💡

### 1. Favor explicitness over cleverness
- Clear props are better than complex children parsing
- Type safety trumps flexibility when you don't need it
- Predictable APIs are easier to maintain

### 2. Use the "surprise test"
- Would a new developer be surprised by the API?
- Is it clear what goes where?
- Can they figure it out from the JSX alone?

### 3. Consider the use case frequency
- **Common, simple cases** → Props (optimize for ease)
- **Rare, complex cases** → Children (optimize for flexibility)

### 4. Think about tooling
- Props get autocomplete and type checking
- Children are more flexible but less discoverable
- Consider developer experience

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

> **Complex, markup-heavy content** → Children

When in doubt, ask: "Would I be surprised if this were a prop instead of children, or vice versa?"

The best APIs feel natural and predictable to developers who haven't read the documentation.

---

*Good API design makes the right thing easy and the wrong thing hard.*
