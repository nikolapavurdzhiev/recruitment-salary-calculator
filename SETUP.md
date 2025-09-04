# 🚀 Local Development Setup Guide

## Prerequisites

- **Node.js** (v18.0.0 or higher)
- **pnpm** (recommended) or npm/yarn

## Quick Start

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

### 2. Start Development Server

```bash
# Using pnpm
pnpm dev

# Or using npm
npm run dev

# Or using yarn
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
recruitment-salary-calculator/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── notion-check/  # Check if user exists
│   │   ├── notion-create/ # Create new user
│   │   └── notion-feedback/ # Submit feedback
│   ├── landing/           # Landing page (removed)
│   ├── registration-form/ # User registration (removed)
│   └── page.tsx          # Main calculator (root page)
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── multi-select.tsx  # Custom multi-select
│   └── navigation.tsx    # Navigation component
├── lib/                  # Utility functions
├── public/               # Static assets
├── billings-calculator.tsx # Main calculator component (root level)
└── styles/              # Global styles
```

## Features

- ✅ **Multi-region Support**: 7 major recruitment markets
- ✅ **8 Role Types**: From Trainee to Director level
- ✅ **Sophisticated Algorithm**: Experience, sector, performance-based
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Modern UI**: shadcn/ui components with Tailwind CSS
- ✅ **Simplified Interface**: Direct access to calculator

## Troubleshooting

### Common Issues:

1. **Build errors**
   - Clear `.next` folder: `Remove-Item -Recurse -Force .next` (PowerShell) or `rm -rf .next` (Bash)
   - Reinstall dependencies: `Remove-Item -Recurse -Force node_modules && pnpm install`

2. **Port already in use**
   - Kill process on port 3000: `npx kill-port 3000`
   - Or use different port: `pnpm dev -- -p 3001`

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Type checking
npx tsc --noEmit
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Database**: Notion (headless CMS)
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure Notion database permissions are properly configured
4. Check that all dependencies are installed correctly
