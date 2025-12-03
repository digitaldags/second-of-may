/**
 * Server actions for managing guest list (admin only)
 */

'use server'

import { supabase } from '@/lib/supabase'
import type { Database, Guest } from '@/lib/types'

/**
 * Fetch all guests from the database
 * @returns Array of Guest objects
 */
export async function getAllGuests(): Promise<Guest[]> {
  try {
    const { data, error } = await supabase
      .from('guest_list')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching guests:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching guests:', error)
    return []
  }
}

/**
 * Check if a guest exists in the guest list (case-insensitive)
 * @param first_name - Guest first name
 * @param last_name - Guest last name
 * @returns true if guest exists, false otherwise
 */
export async function checkGuestExists(
  first_name: string,
  last_name: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('guest_list')
      .select('id')
      .ilike('first_name', first_name.trim())
      .ilike('last_name', last_name.trim())
      .limit(1)

    if (error) {
      console.error('Error checking guest:', error)
      return false
    }

    return (data?.length ?? 0) > 0
  } catch (error) {
    console.error('Error checking guest:', error)
    return false
  }
}

/**
 * Update an existing guest
 * @param id - Guest ID
 * @param updates - Fields to update (first_name, last_name)
 */
export async function updateGuest(
  id: string,
  updates: Partial<Pick<Guest, 'first_name' | 'last_name'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    type GuestUpdate = Database['public']['Tables']['guest_list']['Update'] & {
      updated_at?: string
    }

    const payload: GuestUpdate = {
      updated_at: new Date().toISOString(),
    }

    if (typeof updates.first_name === 'string') {
      payload.first_name = updates.first_name.trim()
    }

    if (typeof updates.last_name === 'string') {
      payload.last_name = updates.last_name.trim()
    }

    const { error } = await (supabase as any)
      .from('guest_list')
      .update(payload)
      .eq('id', id)

    if (error) {
      console.error('Error updating guest:', error)
      return { success: false, error: 'Failed to update guest.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error updating guest:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

/**
 * Check if guest already exists in RSVPs (case-insensitive)
 */
async function checkGuestInRSVPs(
  first_name: string,
  last_name: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('rsvps')
      .select('id')
      .ilike('first_name', first_name.trim())
      .ilike('last_name', last_name.trim())
      .limit(1)

    if (error) {
      console.error('Error checking RSVPs:', error)
      return false
    }

    return (data?.length ?? 0) > 0
  } catch (error) {
    console.error('Error checking RSVPs:', error)
    return false
  }
}

/**
 * Create a new guest entry (admin action)
 */
export async function createGuest(
  first_name: string,
  last_name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const trimmedFirst = first_name.trim()
    const trimmedLast = last_name.trim()

    if (!trimmedFirst || !trimmedLast) {
      return { success: false, error: 'First and last name are required.' }
    }

    const exists = await checkGuestExists(trimmedFirst, trimmedLast)
    if (exists) {
      return { success: false, error: 'Guest already exists in the list.' }
    }

    const inRSVPs = await checkGuestInRSVPs(trimmedFirst, trimmedLast)
    if (inRSVPs) {
      return {
        success: false,
        error: 'This guest has already submitted an RSVP.',
      }
    }

    type GuestInsert = Database['public']['Tables']['guest_list']['Insert']
    const newGuest: GuestInsert = {
      first_name: trimmedFirst,
      last_name: trimmedLast,
    }

    const { error } = await supabase
      .from('guest_list')
      .insert(newGuest as any)

    if (error) {
      console.error('Error adding guest:', error)
      return { success: false, error: 'Failed to add guest.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error adding guest:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

/**
 * Delete a guest
 * @param id - Guest ID
 */
export async function deleteGuest(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.from('guest_list').delete().eq('id', id)

    if (error) {
      console.error('Error deleting guest:', error)
      return { success: false, error: 'Failed to delete guest.' }
    }

    return { success: true }
  } catch (error) {
    console.error('Error deleting guest:', error)
    return { success: false, error: 'An unexpected error occurred.' }
  }
}

