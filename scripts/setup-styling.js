#!/usr/bin/env node

/**
 * Setup script for the Next.js 15 styling system
 * Run with: node scripts/setup-styling.js
 */

const fs = require('fs')
const path = require('path')

console.log('🎨 Setting up Next.js 15 Styling System...\n')

// Check if required dependencies are installed
const packageJsonPath = path.join(process.cwd(), 'package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

const requiredDeps = ['next-themes', 'tailwindcss-animate']
const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep] && !packageJson.devDependencies[dep])

if (missingDeps.length > 0) {
  console.log('❌ Missing required dependencies:')
  missingDeps.forEach(dep => console.log(`   - ${dep}`))
  console.log('\n📦 Install them with:')
  console.log(`   npm install ${missingDeps.join(' ')}`)
  console.log('\n')
} else {
  console.log('✅ All required dependencies are installed\n')
}

// Check if files exist
const filesToCheck = [
  'tailwind.config.ts',
  'app/globals.css',
  'components.json',
  'components/theme-provider.tsx',
  'lib/component-styles.ts',
  'lib/animations.ts'
]

console.log('📁 Checking configuration files:')
filesToCheck.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file))
  console.log(`   ${exists ? '✅' : '❌'} ${file}`)
})

console.log('\n🚀 Next steps:')
console.log('1. Add ThemeProvider to your root layout (app/layout.tsx)')
console.log('2. Import and use component styles in your components')
console.log('3. Check out components/examples/styling-showcase.tsx for examples')
console.log('4. Read STYLING_SYSTEM.md for complete documentation')

console.log('\n✨ Styling system setup complete!')
