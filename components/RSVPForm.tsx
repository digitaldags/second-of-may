/**
 * Client component for RSVP form
 * Uses server actions for form submission
 */

'use client'

import { useState, FormEvent } from 'react'
import { submitRSVP } from '@/app/actions/rsvp'
import type { RSVPFormData } from '@/lib/types'

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    attending: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const result = await submitRSVP(formData)

    if (result.success) {
      setMessage({ type: 'success', text: 'Thank you! Your RSVP has been submitted.' })
      setFormData({ name: '', email: '', attending: true })
    } else {
      setMessage({ type: 'error', text: result.error || 'Something went wrong. Please try again.' })
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-wedding-maroon-dark mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-wedding-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-wedding-maroon-dark mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-wedding-beige-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-wedding-maroon focus:border-transparent"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-wedding-maroon-dark mb-3">
          Will you be attending? *
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="attending"
              checked={formData.attending === true}
              onChange={() => setFormData({ ...formData, attending: true })}
              className="mr-2 text-wedding-maroon focus:ring-wedding-maroon"
            />
            <span className="text-wedding-maroon-dark">Yes, I&apos;ll be there!</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="attending"
              checked={formData.attending === false}
              onChange={() => setFormData({ ...formData, attending: false })}
              className="mr-2 text-wedding-maroon focus:ring-wedding-maroon"
            />
            <span className="text-wedding-maroon-dark">Sorry, I can&apos;t make it</span>
          </label>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-wedding-maroon text-white px-6 py-3 rounded-lg font-semibold hover:bg-wedding-maroon-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
      </button>
    </form>
  )
}

