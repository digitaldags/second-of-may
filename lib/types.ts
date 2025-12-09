/**
 * TypeScript types for the database schema
 */

export type AttendanceType = 'church' | 'reception' | 'both'

export interface RSVP {
  id: string
  first_name: string
  last_name: string
  email: string
  attending: boolean
  attendance_type: AttendanceType
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
          attendance_type: AttendanceType
        }
        Update: Partial<{
          first_name: string
          last_name: string
          email: string
          attending: boolean
          attendance_type: AttendanceType
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
  attendance_type: AttendanceType
}

