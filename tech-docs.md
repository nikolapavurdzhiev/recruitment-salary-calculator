# Tech Stack Documentation & Best Practices

## Overview
This document contains research findings and best practices for the current tech stack used in the Recruitica Salary Calculator project.

## Tech Stack Components

### 1. Next.js 15 (App Router)
**Library ID**: `/vercel/next.js`
**Trust Score**: 10/10
**Code Snippets**: 3,529

#### Key Features & Best Practices:
- **App Router**: Modern routing system with layouts, server components, and streaming
- **Server Components**: Render static content at build time, reducing client bundle size
- **Data Fetching**: Use `fetch()` with caching strategies:
  - `cache: 'force-cache'` for static data (like `getStaticProps`)
  - `cache: 'no-store'` for dynamic data (like `getServerSideProps`)
  - `next: { revalidate: 60 }` for ISR (Incremental Static Regeneration)

#### Performance Optimizations:
- **Streaming**: Use `Suspense` boundaries for progressive rendering
- **Font Optimization**: Specify subsets for Google Fonts (`subsets: ['latin']`)
- **Link Prefetching**: Control with `prefetch` prop (auto/true/false)
- **Web Vitals**: Use `useReportWebVitals` for performance monitoring

#### Migration from Pages Router:
- Replace `getStaticProps` → `fetch()` with `cache: 'force-cache'`
- Replace `getServerSideProps` → `fetch()` with `cache: 'no-store'`
- Replace `getStaticPaths` → `generateStaticParams`
- Use `useRouter`, `usePathname`, `useSearchParams` from `next/navigation`

### 2. React 19
**Library ID**: `/reactjs/react.dev`
**Trust Score**: 10/10
**Code Snippets**: 2,127

#### Key Features & Best Practices:
- **Server Components**: Async components with `await` in render functions
- **Hooks Optimization**: Use `useMemo`, `useCallback`, and `memo` for performance
- **Custom Hooks**: Encapsulate logic for reusability
- **Effect Management**: Proper cleanup in `useEffect`

#### Performance Patterns:
```javascript
// Memoization for expensive calculations
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);

// Callback memoization
const handleSubmit = useCallback((orderDetails) => {
  post('/product/' + productId + '/buy', { referrer, orderDetails });
}, [productId, referrer]);

// Component memoization
const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // Component logic
});
```

#### Server Components Benefits:
- Libraries like `marked` and `sanitizeHtml` not included in client bundle
- Data fetching during render phase eliminates client-server waterfalls
- Progressive rendering with `Suspense` boundaries

### 3. TypeScript
**Library ID**: `/microsoft/typescript`
**Trust Score**: 9.9/10
**Code Snippets**: 17,989

#### Key Features & Best Practices:
- **Strict Type Safety**: Enable `strictNullChecks`, `noUncheckedIndexedAccess`
- **Generic Constraints**: Use proper type constraints for better safety
- **Type Guards**: Implement for runtime type checking
- **Utility Types**: Leverage `Partial`, `Required`, `Record`, etc.

#### Advanced Patterns:
```typescript
// Generic type guards
function isBox<T>(x: any): x is Box<T> {
  return x && typeof x === 'object' && 'item' in x;
}

// Template literal types
type FieldPattern = `/${string}`;

// Mapped types with constraints
type NarrowByKeyValue<ObjT, KeyT extends PropertyKey, ValueT> = 
  ObjT extends unknown ? KeyT extends keyof ObjT ? 
    ValueT extends ObjT[KeyT] ? ObjT & Readonly<Record<KeyT, ValueT>> : never
  : never : never;
```

#### Type Safety Best Practices:
- Use non-null assertion (`!`) sparingly and only when certain
- Implement proper error handling with Result types
- Leverage intersection types for complex object structures
- Use conditional types for advanced type manipulation

### 4. Tailwind CSS
**Library ID**: `/tailwindlabs/tailwindcss.com`
**Trust Score**: 10/10
**Code Snippets**: 1,807

#### Key Features & Best Practices:
- **Utility-First**: Compose designs with utility classes
- **JIT Compiler**: Faster builds (800ms for large projects, 3ms incremental)
- **Performance**: Smaller development builds, better browser performance
- **Responsive Design**: Mobile-first approach with breakpoints

#### Performance Optimizations:
```css
/* Hardware acceleration for animations */
.transform-gpu { transform: translateZ(0); }

/* Will-change for upcoming animations */
.will-change-transform { will-change: transform; }
.will-change-scroll { will-change: scroll-position; }

/* Remove will-change after animation */
.will-change-auto { will-change: auto; }
```

#### Best Practices:
- Use CSS variables instead of `@apply` in component styles
- Leverage JIT for all variants without file size concerns
- Apply `will-change` just before changes, remove after
- Use `transform-gpu` for GPU-accelerated animations

## Architecture Recommendations

### 1. Component Structure
- **Server Components**: For static content and data fetching
- **Client Components**: For interactivity and state management
- **Custom Hooks**: For shared logic and state management
- **Memoization**: Strategic use of `memo`, `useMemo`, `useCallback`

### 2. Data Fetching Strategy
- **Static Data**: Use `fetch()` with `cache: 'force-cache'`
- **Dynamic Data**: Use `fetch()` with `cache: 'no-store'`
- **ISR**: Use `next: { revalidate: seconds }` for time-based revalidation
- **Streaming**: Implement `Suspense` boundaries for progressive loading

### 3. Performance Monitoring
- Implement `useReportWebVitals` for Core Web Vitals tracking
- Use Next.js built-in performance optimizations
- Monitor bundle size with webpack-bundle-analyzer
- Leverage React DevTools Profiler for component performance

### 4. Type Safety
- Enable strict TypeScript configuration
- Use proper type guards for runtime safety
- Implement Result types for error handling
- Leverage utility types for complex transformations

## Development Workflow

### 1. Build Process
- Use Next.js App Router for modern development
- Leverage Tailwind JIT for fast CSS compilation
- Implement proper TypeScript configuration
- Use ESLint with Next.js config for code quality

### 2. Testing Strategy
- Unit tests with Jest and React Testing Library
- Type checking with TypeScript compiler
- Performance testing with Web Vitals
- Accessibility testing with automated tools

### 3. Deployment Considerations
- Optimize for Core Web Vitals
- Implement proper caching strategies
- Use CDN for static assets
- Monitor performance in production

## Migration Notes

### From Pages Router to App Router:
1. Move API routes to `app/api/` directory
2. Replace `getStaticProps`/`getServerSideProps` with `fetch()`
3. Update navigation hooks to use `next/navigation`
4. Implement proper error boundaries
5. Use `generateStaticParams` instead of `getStaticPaths`

### Performance Improvements:
1. Implement Server Components where possible
2. Use proper caching strategies for data fetching
3. Optimize images with Next.js Image component
4. Implement code splitting with dynamic imports
5. Use Tailwind JIT for faster builds

## Conclusion

This tech stack provides a modern, performant foundation for building scalable web applications. The combination of Next.js 15 App Router, React 19 Server Components, TypeScript's type safety, and Tailwind CSS's utility-first approach creates a powerful development environment that prioritizes performance, maintainability, and developer experience.

Key focus areas for this project:
- Leverage Server Components for static content
- Implement proper TypeScript patterns for type safety
- Use Tailwind CSS utilities for consistent styling
- Monitor performance with Web Vitals
- Follow Next.js best practices for optimal performance
