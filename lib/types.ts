/**
 * TypeScript types for the database schema
 */

export interface RSVP {
  id: string
  name: string
  email: string
  attending: boolean
  created_at: string
  updated_at: string | null
}

export interface Database {
  public: {
    Tables: {
      rsvps: {
        Row: RSVP
        Insert: {
          name: string
          email: string
          attending: boolean
        }
        Update: Partial<{
          name: string
          email: string
          attending: boolean
        }>
        Relationships: []
      }
    }
  }
}

export interface RSVPFormData {
  name: string
  email: string
  attending: boolean
}

