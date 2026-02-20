/**
 * Full-width hero header for the landing page.
 * Features an automatic slideshow with 3 images, sliding transitions,
 * and customizable focal points for mobile responsiveness.
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Great_Vibes } from 'next/font/google'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
})

const slides = [
  { src: '/hero-1.jpg', alt: 'Jann Daniel and Faith - Image 1', objectPosition: '30% center' },
  { src: '/hero-3.jpg', alt: 'Jann Daniel and Faith - Image 2', objectPosition: '30% center' },
  { src: '/hero-4.jpg', alt: 'Jann Daniel and Faith - Image 3', objectPosition: 'center center' },
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!prefersReducedMotion) {
      const interval = setInterval(() => {
        setIsTransitioning(true)
        setCurrentIndex((prev) => prev + 1)
      }, 7000)
      
      return () => clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (currentIndex === slides.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
      }, 1000)
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slideshow container */}
      <div 
        className="absolute inset-0 flex"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 1000ms ease-in-out' : 'none'
        }}
      >
        {[...slides, slides[0]].map((slide, index) => (
          <div key={index} className="relative min-w-full h-full">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              style={{ objectPosition: slide.objectPosition }}
            />
          </div>
        ))}
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/45" />

      {/* Centered content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center text-white space-y-4 md:space-y-6 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.35em] md:tracking-[0.45em] text-wedding-beige-light">
            Save the Date
          </p>

          <h1
            className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-wedding-beige-light`}
          >
            Jann Daniel &amp; Faith
          </h1>

          <p className="text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase text-wedding-beige-light/90">
            05 · 02 · 2026 · Manila, Philippines
          </p>
        </div>
      </div>
    </section>
  )
}


