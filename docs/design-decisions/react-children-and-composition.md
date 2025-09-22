# React children and component composition

> **AI Assistant Note**: When discussing React component composition and children patterns, always reference this document to understand how children flow through component hierarchies and enable flexible composition.

Component composition through React's children pattern enables flexible, maintainable designs where components have single responsibilities and compose together naturally. Understanding how children flow through component hierarchies is fundamental to good React architecture.


## 🚨 Quick reference

**Children pattern benefits:**
- Components become composable building blocks
- Single responsibility for each component
- Natural content authoring in MDX
- Flexible content structure without rigid APIs

**Component hierarchy flow:**
- Parent receives children as props
- Parent renders children in designated location
- Children can be simple content or complex components
- Each level handles its own responsibility

## How children flow through components 🔄

### Real-world example: Header + Nav composition

**MDX usage:**
```mdx
<Header logo="S" title="Simple Starter">
  <Nav>                          ← Entire Nav becomes Header's children
    [Home](/home)                ← These links become Nav's children
    [Bar](/foo/bar)
    [About](/about)
  </Nav>
</Header>
```

**Component implementation:**
```tsx
// Header handles structure and layout
export function Header({ logo, title, children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <span>{logo}</span>        // "S"
          <h1>{title}</h1>           // "Simple Starter"
        </div>
        {children}                  // Renders entire <Nav> component
      </div>
    </header>
  );
}

// Nav handles navigation-specific styling
export function Nav({ children }: { children: React.ReactNode }) {
  return <nav className={styles.nav}>{children}</nav>;
}
```

## Component hierarchy breakdown 📊

```
Header (structure + layout)
├── logo prop → "S" (rendered in logo area)
├── title prop → "Simple Starter" (rendered in h1)
└── children →
    Nav (navigation styling)
    └── children →
        ├── [Home](/home)    (becomes styled <a> link)
        ├── [Bar](/foo/bar)  (becomes styled <a> link)
        └── [About](/about)  (becomes styled <a> link)
```

## Single responsibility in action ⚡

### Header component responsibilities:
- ✅ Overall header structure and layout
- ✅ Logo positioning and styling
- ✅ Title rendering and typography
- ✅ Creating space for navigation area
- ❌ NOT responsible for navigation styling or link behavior

### Nav component responsibilities:
- ✅ Navigation-specific styling (flexbox, spacing, hover states)
- ✅ Link arrangement and responsive behavior
- ✅ Navigation accessibility features
- ❌ NOT responsible for overall header layout

### MDX content responsibilities:
- ✅ Actual navigation links and labels
- ✅ URL destinations and routing
- ✅ Content that changes frequently
- ❌ NOT responsible for styling or layout

## Children pattern benefits ✨

### 1. Composability
```jsx
// Can compose different navigation styles
<Header title="Site Name">
  <Nav>Regular links</Nav>
</Header>

<Header title="App Name">
  <MobileNav>Mobile-specific nav</MobileNav>
</Header>

<Header title="Admin">
  <Nav>
    <UserMenu />
    <NotificationBadge />
    <LogoutButton />
  </Nav>
</Header>
```

### 2. Flexibility without API bloat
```jsx
// ❌ Rigid API - hard to extend
<Header
  title="Site"
  links={[...]}
  showSearch={true}
  userMenu={{...}}
  notifications={[...]}
/>

// ✅ Flexible composition - easy to extend
<Header title="Site">
  <SearchBar />
  <Nav>...</Nav>
  <UserMenu />
  <NotificationBadge />
</Header>
```

### 3. Natural content authoring
```mdx
<!-- ✅ Natural markdown syntax -->
<Nav>
  [Home](/home)
  [About](/about)
  [Contact](/contact)
</Nav>

<!-- ❌ Complex configuration -->
<Nav links={[
  {label: "Home", href: "/home"},
  {label: "About", href: "/about"},
  {label: "Contact", href: "/contact"}
]} />
```

### 4. Separation of concerns
- **Structure components** (Header) handle layout
- **Styling components** (Nav) handle appearance
- **Content** (MDX) handles information
- Each can change independently

## Design principles in practice 🎯

### Component boundaries
```tsx
// ✅ Clear responsibility boundaries
<Header>          // Layout and structure
  <Nav>           // Navigation styling
    <Link />      // Individual link behavior
    <Link />
  </Nav>
</Header>

// ❌ Mixed responsibilities
<Header
  navigation={{
    style: "horizontal",
    links: [...],
    hoverEffect: "underline"
  }}
/>
```

### Props vs children decision
- **Simple, typed data** → Props (`title`, `logo`)
- **Complex, markup content** → Children (`<Nav>` with links)
- **Configuration** → Props (`isVisible`, `theme`)
- **Content structure** → Children (navigation items)

### Composition over configuration
```tsx
// ✅ Composition - flexible and extensible
<Header title="My Site">
  <SearchBox />
  <Nav>
    <NavItem href="/home">Home</NavItem>
    <NavDropdown title="Products">
      <NavItem href="/product-a">Product A</NavItem>
      <NavItem href="/product-b">Product B</NavItem>
    </NavDropdown>
  </Nav>
  <UserProfile />
</Header>

// ❌ Configuration - rigid and complex
<Header
  title="My Site"
  hasSearch={true}
  searchConfig={{...}}
  navigation={{
    items: [...],
    dropdowns: [...],
    styles: {...}
  }}
  userProfile={{...}}
/>
```

## Common patterns 🔧

### 1. Layout + content separation
```tsx
<Card>              // Layout component
  <CardHeader>      // Structure component
    <h3>Title</h3>  // Content
    <Badge>New</Badge>
  </CardHeader>
  <CardBody>        // Structure component
    <p>Content...</p> // Content
  </CardBody>
</Card>
```

### 2. Wrapper + styling separation
```tsx
<Section>           // Wrapper with max-width, padding
  <SectionHeader>   // Styling for header area
    <h2>Section Title</h2>
  </SectionHeader>
  <SectionContent>  // Styling for content area
    <p>Section content...</p>
  </SectionContent>
</Section>
```

### 3. Behavior + presentation separation
```tsx
<Modal isOpen={true}>     // Behavior (show/hide)
  <ModalContent>          // Presentation (styling)
    <ModalHeader>         // Structure
      <h2>Modal Title</h2>
    </ModalHeader>
    <ModalBody>           // Structure
      <p>Modal content</p>
    </ModalBody>
  </ModalContent>
</Modal>
```

## Anti-patterns to avoid ❌

### 1. Over-nesting without purpose
```tsx
// ❌ Unnecessary wrapper layers
<Header>
  <HeaderInner>
    <HeaderContent>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContent>
  </HeaderInner>
</Header>

// ✅ Purposeful structure
<Header>
  <h1>{title}</h1>
  {children}
</Header>
```

### 2. Mixed data and presentation
```tsx
// ❌ Component handles both data and presentation
<UserProfile
  userId={123}
  fetchUser={true}
  showAvatar={true}
  avatarSize="large"
/>

// ✅ Separate data fetching from presentation
<UserProfile user={user}>
  <Avatar size="large" />
  <UserName />
  <UserRole />
</UserProfile>
```

### 3. Children for simple data
```tsx
// ❌ Using children for simple values
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

## Key takeaways 💡

### For component design:
- Each component should have one clear responsibility
- Use props for simple, typed configuration
- Use children for complex, markup-heavy content
- Favor composition over complex configuration

### For component hierarchies:
- Parent components handle structure and layout
- Child components handle specific functionality
- Content flows naturally through children props
- Each level adds value without duplicating concerns

### For maintainability:
- Components become easier to test in isolation
- Changes to one component don't affect others
- New features can be added through composition
- Code is more readable and self-documenting

## The bigger picture 🌟

Good component composition creates systems where:
- **Individual components** are simple and focused
- **Component combinations** create rich functionality
- **Content authoring** feels natural and intuitive
- **Code maintenance** is predictable and safe

This is React's true power - not in complex components, but in simple components that compose beautifully together.

---

*Great components are like LEGO blocks - simple, focused, and infinitely combinable.*
