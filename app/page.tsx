/**
 * Landing page with wedding details and link to RSVP
 */

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-wedding-maroon-dark mb-4">
            We&apos;re Getting Married!
          </h1>
          <div className="w-24 h-1 bg-wedding-maroon mx-auto my-6"></div>
          <p className="text-lg text-wedding-maroon-dark mb-8">
            Join us on our special day
          </p>

          <div className="space-y-6 mb-10 text-left">
            <div>
              <h2 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                Date & Time
              </h2>
              <p className="text-wedding-maroon">
                Saturday, May 2, 2025 at 3:00 PM
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                Location
              </h2>
              <p className="text-wedding-maroon">
                INC Locale of Pasay
                <br />
                Admiral Hotel Manila - MGallery
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                Details
              </h2>
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
    </div>
  )
}

