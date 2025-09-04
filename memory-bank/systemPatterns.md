# System Patterns: Recruitment Salary Calculator

## Architecture Overview
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with Server Components
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS utility-first approach
- **Components**: shadcn/ui component library

## Key Technical Decisions

### 1. Next.js App Router
- **Rationale**: Modern routing, server components, better performance
- **Implementation**: Single page application with client-side routing
- **Benefits**: Faster builds, better SEO, improved developer experience

### 2. Server Components
- **Rationale**: Reduce client bundle size, improve performance
- **Implementation**: Static content rendered on server
- **Benefits**: Faster initial load, better Core Web Vitals

### 3. TypeScript
- **Rationale**: Type safety, better developer experience, fewer runtime errors
- **Implementation**: Strict configuration with comprehensive type definitions
- **Benefits**: Catch errors at compile time, better IDE support

### 4. Tailwind CSS
- **Rationale**: Utility-first approach, consistent design, fast development
- **Implementation**: JIT compiler for optimal performance
- **Benefits**: Smaller CSS bundles, consistent styling, responsive design

## Component Architecture

### 1. Calculator Component
- **Location**: `billings-calculator.tsx` (root level)
- **Purpose**: Main salary calculation interface
- **Pattern**: Client component with state management
- **Dependencies**: UI components, calculation logic
- **Integration**: Directly imported into root page (`app/page.tsx`)

### 2. UI Components
- **Location**: `components/ui/`
- **Purpose**: Reusable UI elements
- **Pattern**: shadcn/ui components with Tailwind styling
- **Dependencies**: Radix UI primitives

### 3. Calculation Logic
- **Location**: Embedded in calculator component
- **Purpose**: Salary calculation algorithm
- **Pattern**: Pure functions with TypeScript types
- **Dependencies**: Salary data, user inputs

## Data Flow

### 1. User Input
- Form fields → State management → Validation
- Real-time updates → Immediate feedback
- Error handling → User guidance

### 2. Calculation Process
- Input validation → Data transformation → Algorithm execution
- Result formatting → Display preparation
- Error handling → Fallback values

### 3. Output Display
- Formatted results → UI rendering
- Responsive layout → Mobile optimization
- Accessibility → Screen reader support

## Design Patterns

### 1. Component Composition
- **Pattern**: Compose complex UI from simple components
- **Example**: Calculator = Form + Display + Controls
- **Benefits**: Reusability, maintainability, testability

### 2. State Management
- **Pattern**: React hooks for local state
- **Example**: `useState` for form inputs, `useMemo` for calculations
- **Benefits**: Simple, predictable, performant

### 3. Type Safety
- **Pattern**: Comprehensive TypeScript types
- **Example**: Interface definitions for all data structures
- **Benefits**: Compile-time error checking, better IDE support

## Performance Patterns

### 1. Code Splitting
- **Pattern**: Dynamic imports for large components
- **Implementation**: Next.js automatic code splitting
- **Benefits**: Smaller initial bundle, faster loading

### 2. Memoization
- **Pattern**: `useMemo` and `useCallback` for expensive operations
- **Implementation**: Cache calculation results and event handlers
- **Benefits**: Prevent unnecessary re-renders, improve performance

### 3. Responsive Design
- **Pattern**: Mobile-first approach with Tailwind breakpoints
- **Implementation**: Utility classes for different screen sizes
- **Benefits**: Consistent experience across devices

## Error Handling

### 1. Input Validation
- **Pattern**: Client-side validation with user feedback
- **Implementation**: Form validation with error messages
- **Benefits**: Better user experience, data integrity

### 2. Graceful Degradation
- **Pattern**: Fallback values for missing data
- **Implementation**: Default values and error boundaries
- **Benefits**: Robust application, better user experience

### 3. Type Safety
- **Pattern**: TypeScript for compile-time error checking
- **Implementation**: Strict type definitions and interfaces
- **Benefits**: Fewer runtime errors, better code quality

## URL Structure and Routing

### 1. Root URL Access
- **Pattern**: Direct access at domain root for better UX
- **Implementation**: Calculator component at `app/page.tsx`
- **Benefits**: Clean URLs, professional appearance, easier sharing

### 2. Static Generation
- **Pattern**: Pre-rendered content for optimal performance
- **Implementation**: Next.js static generation
- **Benefits**: Fast loading, better SEO, reduced server load

## Asset Management

### 1. Favicon System
- **Pattern**: Consistent branding across all browsers
- **Implementation**: Multiple favicon formats (SVG, ICO) with proper HTML references
- **Benefits**: Professional appearance, brand consistency

### 2. Static Assets
- **Pattern**: Optimized asset delivery
- **Implementation**: Public directory with proper file organization
- **Benefits**: Fast loading, proper caching

## Build and Development

### 1. Development Server
- **Pattern**: Stable development environment
- **Implementation**: Proper cache management and dependency handling
- **Benefits**: Reliable development experience, faster iteration

### 2. Production Build
- **Pattern**: Optimized production bundle
- **Implementation**: Next.js build optimization with webpack
- **Benefits**: Fast loading, small bundle size, production-ready code

## Maintenance Patterns

### 1. Documentation
- **Pattern**: Comprehensive project documentation
- **Implementation**: README, memory bank, inline comments
- **Benefits**: Easy onboarding, knowledge preservation

### 2. Code Organization
- **Pattern**: Clean, maintainable code structure
- **Implementation**: Logical file organization, consistent naming
- **Benefits**: Easy maintenance, team collaboration

### 3. Error Monitoring
- **Pattern**: Proactive issue detection and resolution
- **Implementation**: Build validation, type checking, linting
- **Benefits**: Stable application, better user experience