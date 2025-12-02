/**
 * Landing page with wedding details and link to RSVP
 */

import Link from 'next/link'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-wedding-beige-light">
      {/* Full-screen hero */}
      <Hero />

      {/* Details + RSVP card */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-wedding-maroon-dark mb-4">
              We&apos;re Getting Married!
            </h2>
            <div className="w-24 h-1 bg-wedding-maroon mx-auto my-6"></div>
            <p className="text-lg text-wedding-maroon-dark mb-8">
              Join us on our special day
            </p>

            <div className="space-y-6 mb-10 text-left">
              <div>
                <h3 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                  Date &amp; Time
                </h3>
                <p className="text-wedding-maroon">
                  Saturday, May 2, 2026 at 3:00 PM
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                  Location
                </h3>
                <p className="text-wedding-maroon">
                  INC Locale of Pasay
                  <br />
                  Admiral Hotel Manila - MGallery
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                  Details
                </h3>
                <p className="text-wedding-maroon">
                  We can&apos;t wait to celebrate with you! Please RSVP by April 2nd
                  to help us plan for the perfect day.
                </p>
              </div>
            </div>

            <Link
              href="/rsvp"
              className="inline-block bg-wedding-maroon text-white px-8 py-3 rounded-lg font-semibold hover:bg-wedding-maroon-dark transition-colors duration-200"
            >
              RSVP Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

