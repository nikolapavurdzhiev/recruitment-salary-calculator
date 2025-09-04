/**
 * Component style utilities and class combinations
 */

export const componentStyles = {
  // Typography
  typography: {
    h1: 'heading-1',
    h2: 'heading-2',
    h3: 'heading-3',
    h4: 'heading-4',
    bodyLarge: 'body-large',
    bodyRegular: 'body-regular',
    bodySmall: 'body-small',
    gradient: 'text-gradient',
  },
  
  // Cards
  card: {
    elevated: 'card-elevated',
    interactive: 'card-interactive',
  },
  
  // Buttons
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
  },
  
  // Inputs
  input: {
    field: 'input-field',
  },
  
  // Layout
  layout: {
    container: 'container mx-auto px-4 md:px-6',
    section: 'py-16 md:py-24',
    grid: 'grid gap-6 md:gap-8',
    grid2: 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8',
    grid3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8',
    grid4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8',
  },
  
  // Spacing
  spacing: {
    section: 'py-16 md:py-24',
    sectionSmall: 'py-8 md:py-12',
    sectionLarge: 'py-20 md:py-32',
    container: 'px-4 md:px-6',
    containerLarge: 'px-6 md:px-8',
  },
  
  // Shadows
  shadow: {
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    strong: 'shadow-strong',
    glow: 'shadow-glow',
    glowAccent: 'shadow-glow-accent',
  },
  
  // Borders
  border: {
    default: 'border border-border',
    accent: 'border border-accent',
    primary: 'border border-primary',
    muted: 'border border-muted',
  },
  
  // Backgrounds
  background: {
    gradient: 'bg-gradient-primary',
    gradientHover: 'bg-gradient-primary-hover',
    card: 'bg-card',
    muted: 'bg-muted',
    accent: 'bg-accent',
  },
  
  // Focus states
  focus: {
    visible: 'focus-visible',
    ring: 'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    ringAccent: 'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
  },
  
  // Transitions
  transition: {
    default: 'transition-all duration-300',
    fast: 'transition-all duration-150',
    slow: 'transition-all duration-500',
    colors: 'transition-colors duration-300',
    transform: 'transition-transform duration-300',
  },
  
  // Hover states
  hover: {
    scale: 'hover:scale-105',
    scaleSmall: 'hover:scale-102',
    shadow: 'hover:shadow-medium',
    glow: 'hover:shadow-glow',
    glowAccent: 'hover:shadow-glow-accent',
  },
  
  // Accessibility
  accessibility: {
    highContrast: 'high-contrast',
    motionReduce: 'motion-reduce',
    focusVisible: 'focus-visible',
  },
} as const

/**
 * Combine multiple style classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Create responsive classes
 */
export function responsive(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
}): string {
  const { base, sm, md, lg, xl } = classes
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`
  )
}

/**
 * Create animation classes with motion preferences
 */
export function createAnimationClasses(
  animation: string,
  options: {
    stagger?: number
    motionSafe?: boolean
    motionReduce?: boolean
  } = {}
): string {
  const { stagger, motionSafe = true, motionReduce = true } = options
  
  return cn(
    motionSafe && 'motion-safe',
    motionReduce && 'motion-reduce',
    animation,
    stagger !== undefined && `stagger-${Math.min(stagger, 8)}`
  )
}
