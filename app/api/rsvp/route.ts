/**
 * API route for handling RSVP submissions
 * POST /api/rsvp
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import type { RSVPFormData } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: RSVPFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert RSVP into database
    const { data, error } = await supabase
      .from('rsvps')
      .insert([
        {
          name: body.name.trim(),
          email: body.email.trim().toLowerCase(),
          attending: body.attending ?? false,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save RSVP. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data, message: 'RSVP submitted successfully' }, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

