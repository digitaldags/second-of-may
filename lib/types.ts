/**
 * TypeScript types for the database schema
 */

export interface RSVP {
  id: string
  name: string
  email: string
  attending: boolean
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      rsvps: {
        Row: RSVP
        Insert: Omit<RSVP, 'id' | 'created_at'>
        Update: Partial<Omit<RSVP, 'id' | 'created_at'>>
      }
    }
  }
}

export interface RSVPFormData {
  name: string
  email: string
  attending: boolean
}

