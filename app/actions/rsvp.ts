/**
 * Server actions for RSVP form
 * These run on the server and can be called directly from client components
 */

'use server'

import { supabase } from '@/lib/supabase'
import type { Database, RSVPFormData } from '@/lib/types'

export interface ActionResult {
  success: boolean
  error?: string
  data?: unknown
}

/**
 * Submit an RSVP using server action
 * @param formData - RSVP form data
 * @returns ActionResult with success status and optional error message
 */
export async function submitRSVP(formData: RSVPFormData): Promise<ActionResult> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email) {
      return {
        success: false,
        error: 'Name and email are required',
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: 'Invalid email format',
      }
    }

    // Insert RSVP into database
    type RSVPInsert = Database['public']['Tables']['rsvps']['Insert']
    const newRSVP: RSVPInsert = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      attending: formData.attending ?? false,
    }

    const { data, error } = await supabase
      .from('rsvps')
      // Cast to any to satisfy Supabase generic typing in this context
      .insert(newRSVP as any)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return {
        success: false,
        error: 'Failed to save RSVP. Please try again.',
      }
    }

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error('Server action error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

