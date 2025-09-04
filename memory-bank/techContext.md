# Tech Context: Recruitica Salary Calculator

## Technology Stack

### Core Framework
- **Next.js 15**: React framework with App Router
- **React 19**: UI library with Server Components
- **TypeScript 5.9**: Type-safe JavaScript
- **Tailwind CSS 3.4**: Utility-first CSS framework

### Development Tools
- **pnpm**: Package manager (recommended)
- **ESLint**: Code linting with Next.js config
- **PostCSS**: CSS processing with Tailwind
- **TypeScript Compiler**: Type checking and compilation

### UI Components
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Styling and responsive design

## Development Setup

### Prerequisites
- Node.js 18.0.0 or higher
- pnpm (recommended) or npm/yarn
- Modern browser with ES2020+ support

### Installation
```bash
# Clone repository
git clone <repository-url>
cd recruitment-salary-calculator

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Configuration
- **No environment variables required**
- **No external API dependencies**
- **No database configuration needed**

## Build Configuration

### Next.js Configuration
- **App Router**: Modern routing system
- **TypeScript**: Strict type checking enabled
- **Tailwind CSS**: JIT compiler for optimal performance
- **ESLint**: Next.js recommended configuration

### TypeScript Configuration
- **Strict mode**: All strict checks enabled
- **Target**: ES2020 for modern browser support
- **Module resolution**: Node.js style
- **Path mapping**: Absolute imports with `@/` prefix

### Tailwind Configuration
- **JIT mode**: Just-in-time compilation
- **Content paths**: `app/**/*.{js,ts,jsx,tsx,mdx}`
- **Plugins**: Default Tailwind plugins
- **Theme**: Custom color palette and spacing

## Performance Considerations

### Bundle Optimization
- **Code splitting**: Automatic with Next.js
- **Tree shaking**: Dead code elimination
- **Minification**: Production builds optimized
- **Compression**: Gzip/Brotli compression

### Runtime Performance
- **Server Components**: Reduced client bundle size
- **Memoization**: Prevent unnecessary re-renders
- **Lazy loading**: Dynamic imports for large components
- **Image optimization**: Next.js Image component

### Core Web Vitals
- **LCP**: Optimized with server-side rendering
- **FID**: Minimal JavaScript execution
- **CLS**: Stable layout with proper sizing
- **TTFB**: Fast server response times

## Browser Support

### Modern Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Mobile Browsers
- **iOS Safari**: 14+
- **Chrome Mobile**: 90+
- **Samsung Internet**: 14+

### Features Used
- **ES2020**: Modern JavaScript features
- **CSS Grid**: Layout system
- **CSS Custom Properties**: CSS variables
- **Intersection Observer**: Performance optimizations

## Development Workflow

### Code Quality
- **TypeScript**: Compile-time type checking
- **ESLint**: Code style and best practices
- **Prettier**: Code formatting (if configured)
- **Git hooks**: Pre-commit validation (if configured)

### Testing Strategy
- **Type checking**: TypeScript compiler
- **Linting**: ESLint validation
- **Manual testing**: Browser testing
- **Performance**: Core Web Vitals monitoring

### Deployment
- **Static export**: Next.js static generation
- **CDN**: Global content delivery
- **Caching**: Browser and CDN caching
- **Monitoring**: Performance and error tracking

## Dependencies

### Production Dependencies
- **next**: 15.x - React framework
- **react**: 19.x - UI library
- **react-dom**: 19.x - DOM rendering
- **typescript**: 5.x - Type system
- **tailwindcss**: 3.x - CSS framework

### Development Dependencies
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions
- **eslint**: Code linting
- **eslint-config-next**: Next.js ESLint config
- **postcss**: CSS processing
- **autoprefixer**: CSS vendor prefixes

## Security Considerations

### Client-Side Security
- **No sensitive data**: All calculations client-side
- **Input validation**: Prevent malicious inputs
- **XSS prevention**: React's built-in protections
- **CSRF protection**: Not applicable (no server state)

### Data Privacy
- **No data collection**: No user information stored
- **No tracking**: No analytics or monitoring
- **No cookies**: No persistent storage
- **GDPR compliant**: No personal data processing

## Maintenance

### Updates
- **Dependencies**: Regular security updates
- **Framework**: Next.js and React updates
- **TypeScript**: Language updates
- **Tailwind**: CSS framework updates

### Monitoring
- **Performance**: Core Web Vitals tracking
- **Errors**: Client-side error reporting
- **Usage**: Analytics (if implemented)
- **Security**: Vulnerability scanning
