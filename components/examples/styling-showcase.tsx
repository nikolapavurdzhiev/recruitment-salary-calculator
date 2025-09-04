"use client"

import React from 'react'
import { componentStyles, cn } from '@/lib/component-styles'
import { animations, createStaggeredContainer } from '@/lib/animations'

/**
 * Showcase component demonstrating the styling system
 * This component shows all available styles and animations
 */
export function StylingShowcase() {
  const showcaseItems = [
    { title: "Typography", description: "Beautiful text styles" },
    { title: "Cards", description: "Elevated and interactive cards" },
    { title: "Buttons", description: "Primary, secondary, and ghost buttons" },
    { title: "Animations", description: "Smooth and accessible animations" },
    { title: "Colors", description: "Modern pink and purple palette" },
    { title: "Layout", description: "Responsive grid systems" },
  ]

  return (
    <div className={cn(componentStyles.layout.container, componentStyles.spacing.section)}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={cn(componentStyles.typography.h1, componentStyles.typography.gradient)}>
            Styling System Showcase
          </h1>
          <p className={cn(componentStyles.typography.bodyLarge, "mt-6 max-w-3xl mx-auto")}>
            A comprehensive design system built for Next.js 15 with modern aesthetics,
            smooth animations, and full accessibility support.
          </p>
        </div>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className={cn(componentStyles.typography.h2, "mb-8")}>
            Typography
          </h2>
          <div className={cn(componentStyles.layout.grid2, "gap-8")}>
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Headings</h3>
                <div className="space-y-4 mt-4">
                  <h1 className={componentStyles.typography.h1}>Heading 1</h1>
                  <h2 className={componentStyles.typography.h2}>Heading 2</h2>
                  <h3 className={componentStyles.typography.h3}>Heading 3</h3>
                  <h4 className={componentStyles.typography.h4}>Heading 4</h4>
                </div>
              </div>
            </div>
            
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Body Text</h3>
                <div className="space-y-4 mt-4">
                  <p className={componentStyles.typography.bodyLarge}>
                    Large body text for important content
                  </p>
                  <p className={componentStyles.typography.bodyRegular}>
                    Regular body text for general content
                  </p>
                  <p className={componentStyles.typography.bodySmall}>
                    Small text for captions and metadata
                  </p>
                  <p className={componentStyles.typography.gradient}>
                    Gradient text for special emphasis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className={cn(componentStyles.typography.h2, "mb-8")}>
            Buttons
          </h2>
          <div className={cn(componentStyles.layout.grid3, "gap-6")}>
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Primary</h3>
                <div className="space-y-4 mt-4">
                  <button className={componentStyles.button.primary}>
                    Primary Button
                  </button>
                  <button className={cn(componentStyles.button.primary, "w-full")}>
                    Full Width
                  </button>
                </div>
              </div>
            </div>
            
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Secondary</h3>
                <div className="space-y-4 mt-4">
                  <button className={componentStyles.button.secondary}>
                    Secondary Button
                  </button>
                  <button className={cn(componentStyles.button.secondary, "w-full")}>
                    Full Width
                  </button>
                </div>
              </div>
            </div>
            
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Ghost</h3>
                <div className="space-y-4 mt-4">
                  <button className={componentStyles.button.ghost}>
                    Ghost Button
                  </button>
                  <button className={cn(componentStyles.button.ghost, "w-full")}>
                    Full Width
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className={cn(componentStyles.typography.h2, "mb-8")}>
            Cards
          </h2>
          <div className={cn(componentStyles.layout.grid2, "gap-6")}>
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Elevated Card</h3>
                <p className={cn(componentStyles.typography.bodyRegular, "mt-4")}>
                  This is an elevated card with subtle shadow and border.
                  Perfect for content sections and information display.
                </p>
              </div>
            </div>
            
            <div className={componentStyles.card.interactive}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Interactive Card</h3>
                <p className={cn(componentStyles.typography.bodyRegular, "mt-4")}>
                  This card has hover effects and focus states.
                  Try hovering over it or tabbing to it for interaction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Animations Section */}
        <section className="mb-16">
          <h2 className={cn(componentStyles.typography.h2, "mb-8")}>
            Animations
          </h2>
          <div className={cn(componentStyles.layout.grid3, "gap-6")}>
            <div className={cn(componentStyles.card.elevated, animations.fadeInUp)}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Fade In Up</h3>
                <p className={componentStyles.typography.bodyRegular}>
                  This card fades in from below with a smooth animation.
                </p>
              </div>
            </div>
            
            <div className={cn(componentStyles.card.elevated, animations.slideInRight)}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Slide In Right</h3>
                <p className={componentStyles.typography.bodyRegular}>
                  This card slides in from the right side.
                </p>
              </div>
            </div>
            
            <div className={cn(componentStyles.card.elevated, animations.gentleBounce)}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Gentle Bounce</h3>
                <p className={componentStyles.typography.bodyRegular}>
                  This card has a gentle bouncing animation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Staggered Animation Section */}
        <section className="mb-16">
          <h2 className={cn(componentStyles.typography.h2, "mb-8")}>
            Staggered Animations
          </h2>
          <div className={animations.stagger.container}>
            {showcaseItems.map((item, index) => (
              <div key={index} className={cn(componentStyles.card.elevated, "mb-4")}>
                <div className="p-6">
                  <h3 className={componentStyles.typography.h3}>{item.title}</h3>
                  <p className={componentStyles.typography.bodyRegular}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="mb-16">
          <h2 className={cn(componentStyles.typography.h2, "mb-8")}>
            Color Palette
          </h2>
          <div className={cn(componentStyles.layout.grid4, "gap-4")}>
            <div className="text-center">
              <div className="w-full h-24 bg-primary rounded-lg mb-2"></div>
              <p className={componentStyles.typography.bodySmall}>Primary</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-accent rounded-lg mb-2"></div>
              <p className={componentStyles.typography.bodySmall}>Accent</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-secondary rounded-lg mb-2"></div>
              <p className={componentStyles.typography.bodySmall}>Secondary</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-muted rounded-lg mb-2"></div>
              <p className={componentStyles.typography.bodySmall}>Muted</p>
            </div>
          </div>
        </section>

        {/* Accessibility Section */}
        <section className="mb-16">
          <h2 className={cn(componentStyles.typography.h2, "mb-8")}>
            Accessibility Features
          </h2>
          <div className={cn(componentStyles.layout.grid2, "gap-6")}>
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Focus States</h3>
                <p className={cn(componentStyles.typography.bodyRegular, "mt-4 mb-4")}>
                  All interactive elements have proper focus indicators.
                </p>
                <button className={cn(componentStyles.button.primary, componentStyles.focus.ring)}>
                  Focus Me
                </button>
              </div>
            </div>
            
            <div className={componentStyles.card.elevated}>
              <div className="p-6">
                <h3 className={componentStyles.typography.h3}>Motion Preferences</h3>
                <p className={cn(componentStyles.typography.bodyRegular, "mt-4")}>
                  Animations respect user's motion preferences and can be disabled
                  for users who prefer reduced motion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
