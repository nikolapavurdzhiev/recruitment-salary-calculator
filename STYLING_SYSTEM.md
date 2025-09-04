# Next.js 15 Styling System

A comprehensive, modern styling system built for Next.js 15 with App Router, featuring a beautiful pink-purple color palette, smooth animations, and full accessibility support.

## 🎨 Features

- **Modern Color Palette**: Pink and purple theme with light/dark mode support
- **Typography System**: Inter for body text, Poppins for headings
- **Smooth Animations**: Fade, slide, float, and staggered animations
- **Accessibility First**: Respects motion preferences and high contrast mode
- **Component Library**: Pre-built styles for buttons, cards, inputs, and more
- **TypeScript Support**: Fully typed utilities and components
- **Performance Optimized**: Server-side rendering compatible

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install next-themes tailwindcss-animate
```

### 2. Setup Theme Provider

Add the theme provider to your root layout:

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/theme-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 3. Use the Styling System

```tsx
import { componentStyles, cn } from '@/lib/component-styles'
import { animations } from '@/lib/animations'

export function MyComponent() {
  return (
    <div className={componentStyles.layout.container}>
      <h1 className={cn(componentStyles.typography.h1, componentStyles.typography.gradient)}>
        Beautiful Heading
      </h1>
      <button className={componentStyles.button.primary}>
        Click Me
      </button>
    </div>
  )
}
```

## 🎨 Color Palette

### Light Mode
- **Primary**: `#DE8DB4` (HSL: 336 69% 70%)
- **Accent**: `#E54588` (HSL: 336 75% 58%)
- **Background**: White
- **Foreground**: Dark Charcoal (HSL: 336 6% 15%)
- **Secondary**: Light Pink-Gray (HSL: 336 20% 96%)
- **Muted**: Lighter Pink-Gray (HSL: 336 10% 94%)
- **Border**: HSL: 336 10% 90%

### Dark Mode
- **Background**: Near Black (HSL: 336 6% 10%)
- **Foreground**: Off-White (HSL: 0 0% 98%)
- **Secondary**: Dark Charcoal (HSL: 336 6% 15%)
- **Muted**: HSL: 336 6% 15%
- **Border**: HSL: 336 6% 20%

## 📝 Typography

### Font Families
- **Body Text**: Inter (400, 500)
- **Headings**: Poppins (600, 700)

### Typography Classes
```tsx
// Headings
<h1 className={componentStyles.typography.h1}>Heading 1</h1>
<h2 className={componentStyles.typography.h2}>Heading 2</h2>
<h3 className={componentStyles.typography.h3}>Heading 3</h3>
<h4 className={componentStyles.typography.h4}>Heading 4</h4>

// Body Text
<p className={componentStyles.typography.bodyLarge}>Large body text</p>
<p className={componentStyles.typography.bodyRegular}>Regular body text</p>
<p className={componentStyles.typography.bodySmall}>Small text</p>

// Special Effects
<span className={componentStyles.typography.gradient}>Gradient text</span>
```

## 🎭 Animations

### Available Animations
- `fade-in-up`: Fade in from below
- `fade-in-down`: Fade in from above
- `slide-in-right`: Slide in from right
- `float`: Gentle floating motion
- `gradient-shift`: Animated gradient background
- `gentle-bounce`: Subtle bouncing effect

### Usage
```tsx
import { animations } from '@/lib/animations'

// Single animation
<div className={animations.fadeInUp}>Content</div>

// Staggered animations
<div className={animations.stagger.container}>
  <div className={animations.stagger.item1}>Item 1</div>
  <div className={animations.stagger.item2}>Item 2</div>
  <div className={animations.stagger.item3}>Item 3</div>
</div>
```

## 🧩 Components

### Buttons
```tsx
<button className={componentStyles.button.primary}>Primary</button>
<button className={componentStyles.button.secondary}>Secondary</button>
<button className={componentStyles.button.ghost}>Ghost</button>
```

### Cards
```tsx
<div className={componentStyles.card.elevated}>Elevated Card</div>
<div className={componentStyles.card.interactive}>Interactive Card</div>
```

### Inputs
```tsx
<input className={componentStyles.input.field} placeholder="Enter text" />
```

### Layout
```tsx
<div className={componentStyles.layout.container}>Container</div>
<div className={componentStyles.layout.grid2}>2 Column Grid</div>
<div className={componentStyles.layout.grid3}>3 Column Grid</div>
<div className={componentStyles.layout.grid4}>4 Column Grid</div>
```

## 🎯 Utilities

### Class Name Utility
```tsx
import { cn } from '@/lib/component-styles'

// Combine classes
<div className={cn('base-class', 'conditional-class', isActive && 'active-class')}>
  Content
</div>
```

### Responsive Classes
```tsx
import { responsive } from '@/lib/component-styles'

<div className={responsive({
  base: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
})}>
  Responsive text
</div>
```

### Animation Classes
```tsx
import { createAnimationClasses } from '@/lib/component-styles'

<div className={createAnimationClasses('fade-in-up', { stagger: 1 })}>
  Animated content
</div>
```

## ♿ Accessibility

### Motion Preferences
The system automatically respects user motion preferences:
- `prefers-reduced-motion: reduce` disables animations
- `prefers-contrast: high` adds high contrast borders

### Focus States
All interactive elements have proper focus indicators:
```tsx
<button className={cn(componentStyles.button.primary, componentStyles.focus.ring)}>
  Accessible Button
</button>
```

### High Contrast Support
```tsx
<div className={componentStyles.accessibility.highContrast}>
  High contrast content
</div>
```

## 🚀 Performance

### Server-Side Rendering
- All styles are SSR compatible
- No hydration mismatches
- Optimized for Next.js 15 App Router

### Bundle Size
- Minimal CSS footprint
- Tree-shakeable utilities
- Optimized font loading

## 📱 Responsive Design

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
All components are designed mobile-first with progressive enhancement.

## 🎨 Customization

### Adding New Colors
Update the CSS variables in `app/globals.css`:

```css
:root {
  --custom-color: 200 50% 60%;
}
```

### Adding New Animations
Add keyframes to `tailwind.config.ts`:

```typescript
keyframes: {
  'custom-animation': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' }
  }
}
```

### Adding New Components
Create new component styles in `lib/component-styles.ts`:

```typescript
export const componentStyles = {
  // ... existing styles
  customComponent: {
    base: 'base-classes',
    variant: 'variant-classes'
  }
}
```

## 📚 Examples

See `components/examples/styling-showcase.tsx` for a comprehensive example of all available styles and animations.

## 🔧 Troubleshooting

### Common Issues

1. **Fonts not loading**: Ensure Google Fonts are imported in `app/globals.css`
2. **Animations not working**: Check that `tailwindcss-animate` is installed
3. **Dark mode not working**: Verify `next-themes` is properly configured
4. **TypeScript errors**: Ensure all imports are correct and types are available

### Debug Mode
Add `debug: true` to your Tailwind config to see which classes are being applied:

```typescript
// tailwind.config.ts
module.exports = {
  // ... other config
  debug: true
}
```

## 📄 License

This styling system is part of your Next.js project and follows the same license terms.

---

Built with ❤️ for modern web development
