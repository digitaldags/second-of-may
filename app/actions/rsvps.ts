/**
 * Server actions for fetching and managing RSVPs (admin only)
 */

'use server'

import { supabase } from '@/lib/supabase'
import type { RSVP } from '@/lib/types'

/**
 * Fetch all RSVPs from the database
 * @returns Array of RSVP objects
 */
export async function getAllRSVPs(): Promise<RSVP[]> {
  try {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching RSVPs:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching RSVPs:', error)
    return []
  }
}

/**
 * Update an existing RSVP
 * @param id - RSVP ID
 * @param updates - Fields to update (name, email, attending)
 */
export async function updateRSVP(
  id: string,
  updates: Partial<Pick<RSVP, 'name' | 'email' | 'attending'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload: Partial<Pick<RSVP, 'name' | 'email' | 'attending'>> = {}

    if (typeof updates.name === 'string') {
      payload.name = updates.name.trim()
    }

    if (typeof updates.email === 'string') {
      payload.email = updates.email.trim().toLowerCase()
    }

    if (typeof updates.attending === 'boolean') {
      payload.attending = updates.attending
    }

    const { error } = await supabase
      .from('rsvps')
      .update(payload)
      .eq('id', id)

    if (error) {
      console.error('Error updating RSVP:', error)
      return { success: false, error: 'Failed to update RSVP.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating RSVP:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

/**
 * Delete an RSVP
 * @param id - RSVP ID
 */
export async function deleteRSVP(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('rsvps').delete().eq('id', id)

    if (error) {
      console.error('Error deleting RSVP:', error)
      return { success: false, error: 'Failed to delete RSVP.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting RSVP:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}
