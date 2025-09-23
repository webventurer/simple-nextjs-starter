# Parent context inheritance for button styling

## Problem
Components like buttons need to style themselves differently based on their parent context. For example:
- Buttons in `<Section variant='strong'>` should be red
- Buttons in `<Hero variant='strong'>` should be purple
- Buttons in `<CTA variant='strong'>` should be purple

Traditional approaches would require prop drilling or complex component composition.

## Solution
Use CSS custom properties (variables) to cascade styling context from parent to child components.

## Implementation (as of commit cc55121)
1. **Parent components** set CSS variables on their root element:
   ```scss
   .section {
     &.strong {
       --button-color: red;  // Section sets red
     }
   }
   ```

2. **Button components** would consume these variables (not yet implemented):
   ```scss
   .button {
     background: var(--button-color, #3b82f6); // Would use parent's color
     border: 2px solid var(--button-color, #3b82f6);
   }
   ```

3. **Nested contexts** can override parent variables:
   ```scss
   .hero.strong {
     --button-color: purple;  // Hero overrides Section's red
   }
   ```

## Current status
The commit establishes the CSS variable infrastructure (setting `--button-color` values in parent components) but the Button component that would consume these variables with `var(--button-color)` is not yet implemented.

## Complete solution
To finish the implementation, create a Button component that consumes the variables:

```scss
// src/components/Button/Button.module.scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  // Use the CSS variables set by parent components
  background-color: var(--button-color, #3b82f6);
  border: 2px solid var(--button-color, #3b82f6);
  color: var(--button-text-color, white);

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &.outlined {
    background-color: transparent;
    color: var(--button-color, #3b82f6);

    &:hover {
      background-color: var(--button-color, #3b82f6);
      color: var(--button-text-color, white);
    }
  }
}
```

Then register it in `mdx-components.tsx` so the `[[Button text]]` syntax works in MDX content.

## Benefits
- **No prop drilling**: Styling context flows naturally through CSS cascade
- **Component isolation**: Buttons don't need to know about parent variants
- **Easy nesting**: Deeper components can override parent contexts
- **Performance**: Pure CSS solution with no JavaScript overhead

## Examples
- `Section variant='strong'` → red buttons
- `Hero variant='strong'` (which uses Section) → purple buttons override
- `CTA variant='strong'` → purple buttons

*Implemented in commit cc55121*
