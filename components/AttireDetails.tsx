/**
 * Attire Details Component
 * Recreates the attire section from the physical wedding invitation
 */

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function AttireDetails() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Color palette from the invitation
  const colorPalette = [
    { name: 'Deep Forest Green', hex: '#2D5016' },
    { name: 'Standard Green', hex: '#5F8A3D' },
    { name: 'Olive Green', hex: '#A4A865' },
    { name: 'Sand Beige', hex: '#D4B896' },
    { name: 'Deep Brown', hex: '#5B3A29' },
  ]

  return (
    <section className="w-full bg-wedding-beige-light py-20 md:py-32 relative overflow-hidden">
      {/* Subtle paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div
        className={`max-w-4xl mx-auto px-4 relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex flex-col items-center">
          {/* Centered Attire Information */}
          <div className="space-y-8 w-full">
            {/* Heading */}
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-serif text-wedding-maroon-dark mb-3 tracking-wide">
                ATTIRE
              </h2>
              <p className="text-2xl md:text-3xl font-serif text-wedding-maroon italic">
                Strictly Formal
              </p>
            </div>

            {/* Dress Code Details */}
            <div className="space-y-3 text-lg md:text-xl text-wedding-maroon-dark text-center">
              <p className="font-medium">
                <span className="font-semibold">Gentlemen</span> 
                <span className="mx-2">|</span> 
                <span className="italic">Barong Tagalog</span>
              </p>
              <p className="font-medium">
                <span className="font-semibold">Ladies</span> 
                <span className="mx-2">|</span> 
                <span className="italic">Long Gown / Dress</span>
              </p>
            </div>

            {/* Illustrations and Color Palette */}
            <div className="flex flex-col items-center gap-6 pt-4">
              {/* Character Illustrations */}
              <div className="flex items-end justify-center gap-4">
                {/* Lady in Green Gown */}
                <div className="relative w-20 h-28 md:w-24 md:h-32">
                  <svg
                    viewBox="0 0 100 140"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Head */}
                    <circle cx="50" cy="20" r="12" fill="#D4B896" />
                    {/* Hair */}
                    <path d="M 38 18 Q 38 8 50 8 Q 62 8 62 18" fill="#3D2817" />
                    {/* Gown */}
                    <path
                      d="M 50 32 L 45 50 L 35 90 L 30 130 Q 30 135 35 135 L 65 135 Q 70 135 70 130 L 65 90 L 55 50 Z"
                      fill="#2D5016"
                      stroke="#1F3810"
                      strokeWidth="1"
                    />
                    {/* Arms */}
                    <ellipse cx="38" cy="45" rx="4" ry="8" fill="#D4B896" />
                    <ellipse cx="62" cy="45" rx="4" ry="8" fill="#D4B896" />
                  </svg>
                </div>

                {/* Color Palette Circles */}
                <div className="flex gap-2 items-center px-4">
                  {colorPalette.map((color, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md border-2 border-white"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>

                {/* Gentleman in Barong */}
                <div className="relative w-20 h-28 md:w-24 md:h-32">
                  <svg
                    viewBox="0 0 100 140"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Head */}
                    <circle cx="50" cy="20" r="12" fill="#D4B896" />
                    {/* Hair */}
                    <path d="M 38 15 Q 38 8 50 8 Q 62 8 62 15" fill="#2D2D2D" />
                    {/* Barong (light cream shirt) */}
                    <rect
                      x="35"
                      y="32"
                      width="30"
                      height="35"
                      fill="#F5F0E8"
                      stroke="#D4C4B0"
                      strokeWidth="1"
                      rx="2"
                    />
                    {/* Barong details (embroidery lines) */}
                    <line x1="42" y1="35" x2="42" y2="65" stroke="#C4B4A0" strokeWidth="0.5" />
                    <line x1="50" y1="35" x2="50" y2="65" stroke="#C4B4A0" strokeWidth="0.5" />
                    <line x1="58" y1="35" x2="58" y2="65" stroke="#C4B4A0" strokeWidth="0.5" />
                    {/* Arms */}
                    <rect x="28" y="38" width="6" height="25" fill="#F5F0E8" stroke="#D4C4B0" strokeWidth="1" />
                    <rect x="66" y="38" width="6" height="25" fill="#F5F0E8" stroke="#D4C4B0" strokeWidth="1" />
                    {/* Pants (dark) */}
                    <path
                      d="M 40 67 L 38 120 L 38 130 Q 38 135 42 135 L 48 135 L 48 67 Z"
                      fill="#2D2D2D"
                    />
                    <path
                      d="M 60 67 L 62 120 L 62 130 Q 62 135 58 135 L 52 135 L 52 67 Z"
                      fill="#2D2D2D"
                    />
                  </svg>
                </div>
              </div>

              {/* Additional Note */}
              <div className="bg-white/60 backdrop-blur-sm border-l-4 border-wedding-maroon p-4 rounded-r-lg shadow-sm max-w-md mx-auto">
                <p className="text-sm text-wedding-maroon-dark leading-relaxed text-center">
                  Please honor the dress code and color palette to ensure a cohesive and 
                  elegant celebration aesthetic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

