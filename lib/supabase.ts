/**
 * Supabase client configuration
 * Factory function — safe for Docker & Next.js builds
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

export function getSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_KEY.'
    )
  }

  return createClient<Database>(supabaseUrl, supabaseKey)
}
