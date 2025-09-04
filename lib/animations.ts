/**
 * Animation utilities for consistent motion across the application
 */

export const animations = {
  // Fade animations
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  slideInRight: 'animate-slide-in-right',
  
  // Continuous animations
  float: 'animate-float',
  gradientShift: 'animate-gradient-shift',
  gentleBounce: 'animate-gentle-bounce',
  
  // Staggered animations
  stagger: {
    container: 'stagger-container',
    item1: 'stagger-1',
    item2: 'stagger-2',
    item3: 'stagger-3',
    item4: 'stagger-4',
    item5: 'stagger-5',
    item6: 'stagger-6',
    item7: 'stagger-7',
    item8: 'stagger-8',
  },
  
  // Motion preferences
  motionSafe: 'motion-safe',
  motionReduce: 'motion-reduce',
} as const

/**
 * Get staggered animation class for a specific index
 */
export function getStaggerClass(index: number): string {
  const staggerClasses = [
    animations.stagger.item1,
    animations.stagger.item2,
    animations.stagger.item3,
    animations.stagger.item4,
    animations.stagger.item5,
    animations.stagger.item6,
    animations.stagger.item7,
    animations.stagger.item8,
  ]
  
  return staggerClasses[Math.min(index, staggerClasses.length - 1)]
}

/**
 * Create a staggered animation container with items
 */
export function createStaggeredContainer(items: React.ReactNode[]): React.ReactNode {
  return (
    <div className={animations.stagger.container}>
      {items.map((item, index) => (
        <div key={index} className={getStaggerClass(index)}>
          {item}
        </div>
      ))}
    </div>
  )
}
