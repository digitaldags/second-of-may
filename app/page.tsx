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
            Join us for our special day
          </p>

          <div className="space-y-6 mb-10 text-left">
            <div>
              <h2 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                Date & Time
              </h2>
              <p className="text-wedding-maroon">
                Saturday, June 15, 2024 at 4:00 PM
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                Location
              </h2>
              <p className="text-wedding-maroon">
                123 Wedding Lane
                <br />
                Beautiful City, ST 12345
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-wedding-maroon-dark mb-2">
                Details
              </h2>
              <p className="text-wedding-maroon">
                We can&apos;t wait to celebrate with you! Please RSVP by May 1st
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

