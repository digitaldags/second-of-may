/**
 * TypeScript types for the database schema
 */

export interface RSVP {
  id: string
  first_name: string
  last_name: string
  email: string
  attending: boolean
  created_at: string
  updated_at: string | null
}

export interface Guest {
  id: string
  first_name: string
  last_name: string
  created_at: string
  updated_at: string | null
}

export interface Database {
  public: {
    Tables: {
      rsvps: {
        Row: RSVP
        Insert: {
          first_name: string
          last_name: string
          email: string
          attending: boolean
        }
        Update: Partial<{
          first_name: string
          last_name: string
          email: string
          attending: boolean
        }>
        Relationships: []
      }
      guest_list: {
        Row: Guest
        Insert: {
          first_name: string
          last_name: string
        }
        Update: Partial<{
          first_name: string
          last_name: string
        }>
        Relationships: []
      }
    }
  }
}

export interface RSVPFormData {
  first_name: string
  last_name: string
  email: string
  attending: boolean
}

