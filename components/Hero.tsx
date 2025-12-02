/**
 * Full-width hero header for the landing page.
 * Uses a full-screen background image with an elegant overlay and animated text.
 */

import Image from 'next/image'
import { Great_Vibes } from 'next/font/google'

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
})

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero.PNG"
        alt="Jann Daniel and Faith"
        fill
        priority
        className="object-cover"
      />

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


