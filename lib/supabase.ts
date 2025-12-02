/**
 * Supabase client configuration
 * Creates a server-side client for database operations
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_KEY.'
  )
}

/**
 * Server-side Supabase client
 * Use this for API routes and server actions
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

