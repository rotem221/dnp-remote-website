export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admin_audit_logs: {
        Row: {
          action: string
          admin_email: string | null
          admin_id: string | null
          admin_name: string | null
          created_at: string
          details: Json | null
          id: string
          ip_address: string | null
          resource_id: string | null
          resource_type: string | null
          severity: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_email?: string | null
          admin_id?: string | null
          admin_name?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          severity?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_email?: string | null
          admin_id?: string | null
          admin_name?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: string | null
          resource_id?: string | null
          resource_type?: string | null
          severity?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      admins: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          name: string
          notification_preferences: Json | null
          permissions: Json | null
          role: string
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name: string
          notification_preferences?: Json | null
          permissions?: Json | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string
          notification_preferences?: Json | null
          permissions?: Json | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      app_config: {
        Row: {
          created_at: string | null
          description: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      app_secrets: {
        Row: {
          created_at: string | null
          id: string
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      app_versions: {
        Row: {
          created_at: string | null
          current_version: string
          force_update: boolean | null
          id: string
          min_required_version: string
          platform: string
          release_notes: string | null
          store_url: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_version: string
          force_update?: boolean | null
          id?: string
          min_required_version?: string
          platform: string
          release_notes?: string | null
          store_url: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_version?: string
          force_update?: boolean | null
          id?: string
          min_required_version?: string
          platform?: string
          release_notes?: string | null
          store_url?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      banned_ips: {
        Row: {
          ban_end_date: string | null
          banned_by_admin_id: string | null
          created_at: string | null
          id: string
          ip_address: string | null
          is_permanent: boolean | null
          reason: string | null
          updated_at: string | null
          user_id: string | null
          user_type: string | null
        }
        Insert: {
          ban_end_date?: string | null
          banned_by_admin_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          is_permanent?: boolean | null
          reason?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Update: {
          ban_end_date?: string | null
          banned_by_admin_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          is_permanent?: boolean | null
          reason?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "banned_ips_banned_by_admin_id_fkey"
            columns: ["banned_by_admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_users: {
        Row: {
          block_end_date: string | null
          blocked_by_admin_id: string | null
          blocked_by_admin_name: string | null
          created_at: string | null
          id: string
          ip_banned: boolean | null
          is_permanent: boolean | null
          reason: string
          reason_code: string | null
          updated_at: string | null
          user_email: string
          user_id: string
          user_name: string
          user_type: string
        }
        Insert: {
          block_end_date?: string | null
          blocked_by_admin_id?: string | null
          blocked_by_admin_name?: string | null
          created_at?: string | null
          id?: string
          ip_banned?: boolean | null
          is_permanent?: boolean | null
          reason: string
          reason_code?: string | null
          updated_at?: string | null
          user_email: string
          user_id: string
          user_name: string
          user_type: string
        }
        Update: {
          block_end_date?: string | null
          blocked_by_admin_id?: string | null
          blocked_by_admin_name?: string | null
          created_at?: string | null
          id?: string
          ip_banned?: boolean | null
          is_permanent?: boolean | null
          reason?: string
          reason_code?: string | null
          updated_at?: string | null
          user_email?: string
          user_id?: string
          user_name?: string
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_users_blocked_by_admin_id_fkey"
            columns: ["blocked_by_admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          arrival_time: string | null
          booking_date: string
          cancellation_reason: string | null
          created_at: string | null
          end_request_status: string | null
          end_requested_at: string | null
          end_time: string
          estimated_arrival: string | null
          expected_arrival_time: string | null
          finish_time: string | null
          id: string
          instant_availability_id: string | null
          kids_ids: string[] | null
          notes: string | null
          on_the_way_time: string | null
          parent_id: string
          sitter_id: string
          start_time: string
          status: string
          total_price: number
          updated_at: string | null
        }
        Insert: {
          arrival_time?: string | null
          booking_date: string
          cancellation_reason?: string | null
          created_at?: string | null
          end_request_status?: string | null
          end_requested_at?: string | null
          end_time: string
          estimated_arrival?: string | null
          expected_arrival_time?: string | null
          finish_time?: string | null
          id?: string
          instant_availability_id?: string | null
          kids_ids?: string[] | null
          notes?: string | null
          on_the_way_time?: string | null
          parent_id: string
          sitter_id: string
          start_time: string
          status?: string
          total_price: number
          updated_at?: string | null
        }
        Update: {
          arrival_time?: string | null
          booking_date?: string
          cancellation_reason?: string | null
          created_at?: string | null
          end_request_status?: string | null
          end_requested_at?: string | null
          end_time?: string
          estimated_arrival?: string | null
          expected_arrival_time?: string | null
          finish_time?: string | null
          id?: string
          instant_availability_id?: string | null
          kids_ids?: string[] | null
          notes?: string | null
          on_the_way_time?: string | null
          parent_id?: string
          sitter_id?: string
          start_time?: string
          status?: string
          total_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_instant_availability_id_fkey"
            columns: ["instant_availability_id"]
            isOneToOne: false
            referencedRelation: "instant_availability"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters_public"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_sync_settings: {
        Row: {
          calendar_id: string | null
          created_at: string
          google_access_token: string | null
          google_refresh_token: string | null
          google_token_expires_at: string | null
          id: string
          is_enabled: boolean
          last_sync_at: string | null
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          calendar_id?: string | null
          created_at?: string
          google_access_token?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id?: string
          is_enabled?: boolean
          last_sync_at?: string | null
          updated_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          calendar_id?: string | null
          created_at?: string
          google_access_token?: string | null
          google_refresh_token?: string | null
          google_token_expires_at?: string | null
          id?: string
          is_enabled?: boolean
          last_sync_at?: string | null
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      chats: {
        Row: {
          blocked_by: string | null
          created_at: string | null
          id: string
          is_archived: boolean
          is_blocked: boolean | null
          is_pinned: boolean | null
          last_message_at: string | null
          last_message_sender_id: string | null
          last_message_text: string | null
          parent_id: string | null
          sitter_id: string | null
          unread_count_parent: number | null
          unread_count_sitter: number | null
          updated_at: string | null
        }
        Insert: {
          blocked_by?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean
          is_blocked?: boolean | null
          is_pinned?: boolean | null
          last_message_at?: string | null
          last_message_sender_id?: string | null
          last_message_text?: string | null
          parent_id?: string | null
          sitter_id?: string | null
          unread_count_parent?: number | null
          unread_count_sitter?: number | null
          updated_at?: string | null
        }
        Update: {
          blocked_by?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean
          is_blocked?: boolean | null
          is_pinned?: boolean | null
          last_message_at?: string | null
          last_message_sender_id?: string | null
          last_message_text?: string | null
          parent_id?: string | null
          sitter_id?: string | null
          unread_count_parent?: number | null
          unread_count_sitter?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chats_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chats_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters_public"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_email_verification: {
        Row: {
          created_at: string | null
          email: string
          id: string
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
        }
        Relationships: []
      }
      device_tokens: {
        Row: {
          created_at: string
          device_name: string | null
          id: string
          is_active: boolean
          last_used_at: string | null
          platform: string
          token: string
          token_type: string
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          created_at?: string
          device_name?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          platform: string
          token: string
          token_type?: string
          updated_at?: string
          user_id: string
          user_type: string
        }
        Update: {
          created_at?: string
          device_name?: string | null
          id?: string
          is_active?: boolean
          last_used_at?: string | null
          platform?: string
          token?: string
          token_type?: string
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
      email_verification_codes: {
        Row: {
          code: string
          created_at: string | null
          email: string
          expires_at: string | null
          id: string
          used: boolean | null
        }
        Insert: {
          code: string
          created_at?: string | null
          email: string
          expires_at?: string | null
          id?: string
          used?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string | null
          email?: string
          expires_at?: string | null
          id?: string
          used?: boolean | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          id: string
          parent_id: string | null
          sitter_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          parent_id?: string | null
          sitter_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          parent_id?: string | null
          sitter_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters_public"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_sessions: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          last_seen: string
          session_id: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          last_seen?: string
          session_id: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          last_seen?: string
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      instant_availability: {
        Row: {
          available_from: string | null
          available_to: string | null
          city: string | null
          created_at: string | null
          expires_at: string
          id: string
          latitude: number
          longitude: number
          message: string | null
          radius_km: number
          sitter_id: string
        }
        Insert: {
          available_from?: string | null
          available_to?: string | null
          city?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          latitude: number
          longitude: number
          message?: string | null
          radius_km?: number
          sitter_id: string
        }
        Update: {
          available_from?: string | null
          available_to?: string | null
          city?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          latitude?: number
          longitude?: number
          message?: string | null
          radius_km?: number
          sitter_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "instant_availability_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "instant_availability_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters_public"
            referencedColumns: ["id"]
          },
        ]
      }
      ip_bans: {
        Row: {
          banned_by: string | null
          banned_until: string | null
          created_at: string | null
          id: string
          ip_address: string
          is_active: boolean | null
          reason: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          banned_by?: string | null
          banned_until?: string | null
          created_at?: string | null
          id?: string
          ip_address: string
          is_active?: boolean | null
          reason?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          banned_by?: string | null
          banned_until?: string | null
          created_at?: string | null
          id?: string
          ip_address?: string
          is_active?: boolean | null
          reason?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ip_bans_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      job_listings: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          date: string
          description: string
          end_time: string
          hourly_rate: number | null
          id: string
          is_available: boolean
          kids_count: number
          kids_ids: string[] | null
          kids_location: string
          parent_id: string | null
          requirements: string | null
          sitter_id: string | null
          start_time: string
          status: string
          title: string
          updated_at: string
          views_count: number
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          date: string
          description: string
          end_time: string
          hourly_rate?: number | null
          id?: string
          is_available?: boolean
          kids_count?: number
          kids_ids?: string[] | null
          kids_location?: string
          parent_id?: string | null
          requirements?: string | null
          sitter_id?: string | null
          start_time: string
          status?: string
          title: string
          updated_at?: string
          views_count?: number
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          date?: string
          description?: string
          end_time?: string
          hourly_rate?: number | null
          id?: string
          is_available?: boolean
          kids_count?: number
          kids_ids?: string[] | null
          kids_location?: string
          parent_id?: string | null
          requirements?: string | null
          sitter_id?: string | null
          start_time?: string
          status?: string
          title?: string
          updated_at?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "job_listings_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_listings_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_listings_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_listings_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters_public"
            referencedColumns: ["id"]
          },
        ]
      }
      kids: {
        Row: {
          age: string
          created_at: string | null
          gender: string | null
          id: string
          name: string
          parent_id: string
          updated_at: string | null
        }
        Insert: {
          age: string
          created_at?: string | null
          gender?: string | null
          id?: string
          name: string
          parent_id: string
          updated_at?: string | null
        }
        Update: {
          age?: string
          created_at?: string | null
          gender?: string | null
          id?: string
          name?: string
          parent_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kids_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kids_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents_limited"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          audio_duration: number | null
          audio_uri: string | null
          chat_id: string
          created_at: string | null
          deleted_at: string | null
          file_type: string | null
          file_uri: string | null
          id: string
          is_deleted: boolean
          is_read: boolean | null
          read_at: string | null
          sender_id: string
          sender_type: string
          text: string | null
          updated_at: string | null
        }
        Insert: {
          audio_duration?: number | null
          audio_uri?: string | null
          chat_id: string
          created_at?: string | null
          deleted_at?: string | null
          file_type?: string | null
          file_uri?: string | null
          id?: string
          is_deleted?: boolean
          is_read?: boolean | null
          read_at?: string | null
          sender_id: string
          sender_type: string
          text?: string | null
          updated_at?: string | null
        }
        Update: {
          audio_duration?: number | null
          audio_uri?: string | null
          chat_id?: string
          created_at?: string | null
          deleted_at?: string | null
          file_type?: string | null
          file_uri?: string | null
          id?: string
          is_deleted?: boolean
          is_read?: boolean | null
          read_at?: string | null
          sender_id?: string
          sender_type?: string
          text?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          booking_id: string | null
          created_at: string | null
          data: Json
          id: string
          is_read: boolean | null
          job_listing_id: string | null
          message: string
          read_at: string | null
          related_user_id: string | null
          status: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          data?: Json
          id?: string
          is_read?: boolean | null
          job_listing_id?: string | null
          message: string
          read_at?: string | null
          related_user_id?: string | null
          status?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
          user_type: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          data?: Json
          id?: string
          is_read?: boolean | null
          job_listing_id?: string | null
          message?: string
          read_at?: string | null
          related_user_id?: string | null
          status?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_job_listing_id_fkey"
            columns: ["job_listing_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      parent_requests: {
        Row: {
          city: string | null
          created_at: string | null
          expires_at: string
          id: string
          latitude: number
          longitude: number
          message: string | null
          parent_id: string
          radius_km: number
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          expires_at: string
          id?: string
          latitude: number
          longitude: number
          message?: string | null
          parent_id: string
          radius_km?: number
        }
        Update: {
          city?: string | null
          created_at?: string | null
          expires_at?: string
          id?: string
          latitude?: number
          longitude?: number
          message?: string | null
          parent_id?: string
          radius_km?: number
        }
        Relationships: [
          {
            foreignKeyName: "parent_requests_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parent_requests_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents_limited"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          address: string | null
          apartment: string | null
          auth_user_id: string | null
          city: string | null
          created_at: string | null
          email: string
          floor: string | null
          gender: string | null
          id: string
          last_ip: string | null
          last_login_at: string | null
          last_seen: string | null
          name: string
          notification_preferences: Json | null
          phone: string
          premium_override_until: string | null
          profile_image_url: string | null
          subscription_active: boolean | null
          subscription_cancellation_reason: string | null
          subscription_cancelled: boolean | null
          subscription_cancelled_at: string | null
          subscription_discount_percent: number | null
          subscription_end_date: string | null
          subscription_payment_type: string | null
          subscription_price: number | null
          subscription_start_date: string | null
          subscription_type: string | null
          terms_accepted: boolean
          trial_end_date: string | null
          trial_start_date: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          apartment?: string | null
          auth_user_id?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          floor?: string | null
          gender?: string | null
          id?: string
          last_ip?: string | null
          last_login_at?: string | null
          last_seen?: string | null
          name: string
          notification_preferences?: Json | null
          phone: string
          premium_override_until?: string | null
          profile_image_url?: string | null
          subscription_active?: boolean | null
          subscription_cancellation_reason?: string | null
          subscription_cancelled?: boolean | null
          subscription_cancelled_at?: string | null
          subscription_discount_percent?: number | null
          subscription_end_date?: string | null
          subscription_payment_type?: string | null
          subscription_price?: number | null
          subscription_start_date?: string | null
          subscription_type?: string | null
          terms_accepted?: boolean
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          apartment?: string | null
          auth_user_id?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          floor?: string | null
          gender?: string | null
          id?: string
          last_ip?: string | null
          last_login_at?: string | null
          last_seen?: string | null
          name?: string
          notification_preferences?: Json | null
          phone?: string
          premium_override_until?: string | null
          profile_image_url?: string | null
          subscription_active?: boolean | null
          subscription_cancellation_reason?: string | null
          subscription_cancelled?: boolean | null
          subscription_cancelled_at?: string | null
          subscription_discount_percent?: number | null
          subscription_end_date?: string | null
          subscription_payment_type?: string | null
          subscription_price?: number | null
          subscription_start_date?: string | null
          subscription_type?: string | null
          terms_accepted?: boolean
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      password_reset_codes: {
        Row: {
          code: string
          created_at: string | null
          email: string
          expires_at: string
          id: string
          used: boolean | null
          used_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          email: string
          expires_at: string
          id?: string
          used?: boolean | null
          used_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: string
          used?: boolean | null
          used_at?: string | null
        }
        Relationships: []
      }
      push_notification_queue: {
        Row: {
          body: string
          created_at: string | null
          data: Json | null
          error_message: string | null
          id: string
          notification_type: string | null
          profile_image_url: string | null
          recipient_user_id: string
          sent_at: string | null
          status: string | null
          title: string
          tokens: Json
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          data?: Json | null
          error_message?: string | null
          id?: string
          notification_type?: string | null
          profile_image_url?: string | null
          recipient_user_id: string
          sent_at?: string | null
          status?: string | null
          title: string
          tokens: Json
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          data?: Json | null
          error_message?: string | null
          id?: string
          notification_type?: string | null
          profile_image_url?: string | null
          recipient_user_id?: string
          sent_at?: string | null
          status?: string | null
          title?: string
          tokens?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      rate_limit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_read: boolean | null
          priority: string
          read_at: string | null
          read_by: string | null
          reported_user_email: string | null
          reported_user_id: string | null
          reported_user_name: string | null
          reported_user_type: string | null
          reporter_email: string | null
          reporter_id: string | null
          reporter_name: string | null
          reporter_type: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_read?: boolean | null
          priority?: string
          read_at?: string | null
          read_by?: string | null
          reported_user_email?: string | null
          reported_user_id?: string | null
          reported_user_name?: string | null
          reported_user_type?: string | null
          reporter_email?: string | null
          reporter_id?: string | null
          reporter_name?: string | null
          reporter_type?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_read?: boolean | null
          priority?: string
          read_at?: string | null
          read_by?: string | null
          reported_user_email?: string | null
          reported_user_id?: string | null
          reported_user_name?: string | null
          reported_user_type?: string | null
          reporter_email?: string | null
          reporter_id?: string | null
          reporter_name?: string | null
          reporter_type?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_read_by_fkey"
            columns: ["read_by"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          parent_id: string
          rating: number
          sitter_id: string
          updated_at: string | null
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          parent_id: string
          rating: number
          sitter_id: string
          updated_at?: string | null
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          parent_id?: string
          rating?: number
          sitter_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents_limited"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters_public"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          affected_user_id: string | null
          affected_user_type: string | null
          created_at: string
          description: string | null
          event_type: string
          id: string
          is_acknowledged: boolean | null
          metadata: Json | null
          severity: string | null
          source_ip: string | null
          title: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          affected_user_id?: string | null
          affected_user_type?: string | null
          created_at?: string
          description?: string | null
          event_type: string
          id?: string
          is_acknowledged?: boolean | null
          metadata?: Json | null
          severity?: string | null
          source_ip?: string | null
          title: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          affected_user_id?: string | null
          affected_user_type?: string | null
          created_at?: string
          description?: string | null
          event_type?: string
          id?: string
          is_acknowledged?: boolean | null
          metadata?: Json | null
          severity?: string | null
          source_ip?: string | null
          title?: string
        }
        Relationships: []
      }
      site_visits: {
        Row: {
          browser: string | null
          city: string | null
          country: string | null
          created_at: string
          device_type: string | null
          id: string
          ip_address: string | null
          os: string | null
          page_url: string | null
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
          user_type: string
          visit_date: string
          visited_at: string
        }
        Insert: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
          user_type?: string
          visit_date?: string
          visited_at?: string
        }
        Update: {
          browser?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          id?: string
          ip_address?: string | null
          os?: string | null
          page_url?: string | null
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
          user_type?: string
          visit_date?: string
          visited_at?: string
        }
        Relationships: []
      }
      sitters: {
        Row: {
          address: string | null
          auth_user_id: string | null
          availability: Json | null
          availability_hours: Json | null
          bio: string | null
          birthdate: string | null
          city: string | null
          created_at: string | null
          date_availability: Json | null
          email: string
          experience: string | null
          gender: string | null
          id: string
          id_verified: boolean | null
          last_ip: string | null
          last_login_at: string | null
          last_seen: string | null
          likes: number | null
          max_price: number | null
          min_price: number | null
          name: string
          notification_preferences: Json | null
          phone: string
          premium_override_until: string | null
          profile_image_url: string | null
          skills: string[] | null
          subscription_active: boolean | null
          subscription_cancellation_reason: string | null
          subscription_cancelled: boolean | null
          subscription_cancelled_at: string | null
          subscription_discount_percent: number | null
          subscription_end_date: string | null
          subscription_payment_type: string | null
          subscription_price: number | null
          subscription_start_date: string | null
          subscription_type: string | null
          terms_accepted: boolean
          trial_end_date: string | null
          trial_start_date: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          auth_user_id?: string | null
          availability?: Json | null
          availability_hours?: Json | null
          bio?: string | null
          birthdate?: string | null
          city?: string | null
          created_at?: string | null
          date_availability?: Json | null
          email: string
          experience?: string | null
          gender?: string | null
          id?: string
          id_verified?: boolean | null
          last_ip?: string | null
          last_login_at?: string | null
          last_seen?: string | null
          likes?: number | null
          max_price?: number | null
          min_price?: number | null
          name: string
          notification_preferences?: Json | null
          phone: string
          premium_override_until?: string | null
          profile_image_url?: string | null
          skills?: string[] | null
          subscription_active?: boolean | null
          subscription_cancellation_reason?: string | null
          subscription_cancelled?: boolean | null
          subscription_cancelled_at?: string | null
          subscription_discount_percent?: number | null
          subscription_end_date?: string | null
          subscription_payment_type?: string | null
          subscription_price?: number | null
          subscription_start_date?: string | null
          subscription_type?: string | null
          terms_accepted?: boolean
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          auth_user_id?: string | null
          availability?: Json | null
          availability_hours?: Json | null
          bio?: string | null
          birthdate?: string | null
          city?: string | null
          created_at?: string | null
          date_availability?: Json | null
          email?: string
          experience?: string | null
          gender?: string | null
          id?: string
          id_verified?: boolean | null
          last_ip?: string | null
          last_login_at?: string | null
          last_seen?: string | null
          likes?: number | null
          max_price?: number | null
          min_price?: number | null
          name?: string
          notification_preferences?: Json | null
          phone?: string
          premium_override_until?: string | null
          profile_image_url?: string | null
          skills?: string[] | null
          subscription_active?: boolean | null
          subscription_cancellation_reason?: string | null
          subscription_cancelled?: boolean | null
          subscription_cancelled_at?: string | null
          subscription_discount_percent?: number | null
          subscription_end_date?: string | null
          subscription_payment_type?: string | null
          subscription_price?: number | null
          subscription_start_date?: string | null
          subscription_type?: string | null
          terms_accepted?: boolean
          trial_end_date?: string | null
          trial_start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscription_payments: {
        Row: {
          amount: number
          created_at: string | null
          discount_percent: number | null
          id: string
          invoice_number: string | null
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          period_end: string
          period_start: string
          sitter_id: string
          status: string | null
          subscription_type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          discount_percent?: number | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          period_end: string
          period_start: string
          sitter_id: string
          status?: string | null
          subscription_type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          discount_percent?: number | null
          id?: string
          invoice_number?: string | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          period_end?: string
          period_start?: string
          sitter_id?: string
          status?: string | null
          subscription_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_payments_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_payments_sitter_id_fkey"
            columns: ["sitter_id"]
            isOneToOne: false
            referencedRelation: "sitters_public"
            referencedColumns: ["id"]
          },
        ]
      }
      support_agents_online: {
        Row: {
          admin_id: string
          id: string
          is_online: boolean | null
          last_seen: string | null
        }
        Insert: {
          admin_id: string
          id?: string
          is_online?: boolean | null
          last_seen?: string | null
        }
        Update: {
          admin_id?: string
          id?: string
          is_online?: boolean | null
          last_seen?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_agents_online_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: true
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      support_messages: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          sender_avatar: string | null
          sender_id: string | null
          sender_name: string | null
          sender_type: string
          ticket_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          sender_avatar?: string | null
          sender_id?: string | null
          sender_name?: string | null
          sender_type: string
          ticket_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          sender_avatar?: string | null
          sender_id?: string | null
          sender_name?: string | null
          sender_type?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_admin_id: string | null
          category: string | null
          created_at: string | null
          guest_email: string | null
          guest_name: string | null
          id: string
          priority: string | null
          resolved_at: string | null
          session_id: string | null
          source: string | null
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string | null
          user_type: string | null
        }
        Insert: {
          assigned_admin_id?: string | null
          category?: string | null
          created_at?: string | null
          guest_email?: string | null
          guest_name?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Update: {
          assigned_admin_id?: string | null
          category?: string | null
          created_at?: string | null
          guest_email?: string | null
          guest_name?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_admin_id_fkey"
            columns: ["assigned_admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
      support_typing: {
        Row: {
          admin_id: string | null
          id: string
          is_typing: boolean | null
          ticket_id: string
          updated_at: string | null
          user_id: string | null
          user_type: string
        }
        Insert: {
          admin_id?: string | null
          id?: string
          is_typing?: boolean | null
          ticket_id: string
          updated_at?: string | null
          user_id?: string | null
          user_type: string
        }
        Update: {
          admin_id?: string | null
          id?: string
          is_typing?: boolean | null
          ticket_id?: string
          updated_at?: string | null
          user_id?: string | null
          user_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_typing_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_typing_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      suspicious_activity: {
        Row: {
          activity_type: string
          created_at: string
          description: string | null
          id: string
          ip_address: string | null
          is_resolved: boolean | null
          metadata: Json | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          risk_score: number | null
          updated_at: string
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          user_name: string | null
          user_type: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: string | null
          is_resolved?: boolean | null
          metadata?: Json | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          risk_score?: number | null
          updated_at?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
          user_type?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: string | null
          is_resolved?: boolean | null
          metadata?: Json | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          risk_score?: number | null
          updated_at?: string
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      testers: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          created_at: string | null
          designation: string
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location: string | null
          name: string
          quote: string
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          designation: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          name: string
          quote: string
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          designation?: string
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
          name?: string
          quote?: string
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      used_trials: {
        Row: {
          created_at: string | null
          email_hash: string
          id: string
        }
        Insert: {
          created_at?: string | null
          email_hash: string
          id?: string
        }
        Update: {
          created_at?: string | null
          email_hash?: string
          id?: string
        }
        Relationships: []
      }
      user_bans: {
        Row: {
          banned_by: string | null
          banned_by_name: string | null
          banned_until: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          reason: string | null
          reason_code: string | null
          updated_at: string | null
          user_email: string | null
          user_id: string
          user_name: string | null
          user_type: string | null
        }
        Insert: {
          banned_by?: string | null
          banned_by_name?: string | null
          banned_until?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          reason?: string | null
          reason_code?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id: string
          user_name?: string | null
          user_type?: string | null
        }
        Update: {
          banned_by?: string | null
          banned_by_name?: string | null
          banned_until?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          reason?: string | null
          reason_code?: string | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string
          user_name?: string | null
          user_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_bans_banned_by_fkey"
            columns: ["banned_by"]
            isOneToOne: false
            referencedRelation: "admins"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      active_listings_stats: {
        Row: {
          parent_listings_count: number | null
          sitter_listings_count: number | null
          total_active_listings: number | null
        }
        Relationships: []
      }
      app_versions_public: {
        Row: {
          current_version: string | null
          force_update: boolean | null
          min_required_version: string | null
          platform: string | null
          release_notes: string | null
          store_url: string | null
        }
        Insert: {
          current_version?: string | null
          force_update?: boolean | null
          min_required_version?: string | null
          platform?: string | null
          release_notes?: string | null
          store_url?: string | null
        }
        Update: {
          current_version?: string | null
          force_update?: boolean | null
          min_required_version?: string | null
          platform?: string | null
          release_notes?: string | null
          store_url?: string | null
        }
        Relationships: []
      }
      calendar_sync_status: {
        Row: {
          calendar_id: string | null
          created_at: string | null
          has_access_token: boolean | null
          has_refresh_token: boolean | null
          id: string | null
          is_enabled: boolean | null
          last_sync_at: string | null
          updated_at: string | null
          user_id: string | null
          user_type: string | null
        }
        Insert: {
          calendar_id?: string | null
          created_at?: string | null
          has_access_token?: never
          has_refresh_token?: never
          id?: string | null
          is_enabled?: boolean | null
          last_sync_at?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Update: {
          calendar_id?: string | null
          created_at?: string | null
          has_access_token?: never
          has_refresh_token?: never
          id?: string | null
          is_enabled?: boolean | null
          last_sync_at?: string | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
        }
        Relationships: []
      }
      parents_limited: {
        Row: {
          city: string | null
          created_at: string | null
          id: string | null
          name: string | null
          profile_image_url: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          profile_image_url?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          profile_image_url?: string | null
        }
        Relationships: []
      }
      reviews_public: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string | null
          rating: number | null
          reviewer_name: string | null
          sitter_image: string | null
          sitter_name: string | null
        }
        Relationships: []
      }
      sitters_public: {
        Row: {
          availability: Json | null
          availability_hours: Json | null
          bio: string | null
          city: string | null
          created_at: string | null
          experience: string | null
          gender: string | null
          id: string | null
          id_verified: boolean | null
          likes: number | null
          max_price: number | null
          min_price: number | null
          name: string | null
          profile_image_url: string | null
          skills: string[] | null
          subscription_active: boolean | null
        }
        Insert: {
          availability?: Json | null
          availability_hours?: Json | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          experience?: string | null
          gender?: string | null
          id?: string | null
          id_verified?: boolean | null
          likes?: number | null
          max_price?: number | null
          min_price?: number | null
          name?: string | null
          profile_image_url?: string | null
          skills?: string[] | null
          subscription_active?: boolean | null
        }
        Update: {
          availability?: Json | null
          availability_hours?: Json | null
          bio?: string | null
          city?: string | null
          created_at?: string | null
          experience?: string | null
          gender?: string | null
          id?: string | null
          id_verified?: boolean | null
          likes?: number | null
          max_price?: number | null
          min_price?: number | null
          name?: string | null
          profile_image_url?: string | null
          skills?: string[] | null
          subscription_active?: boolean | null
        }
        Relationships: []
      }
      support_agents_count: {
        Row: {
          online_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      bytea_to_text: { Args: { data: string }; Returns: string }
      check_email_verified: { Args: { user_email: string }; Returns: Json }
      check_expired_trials: { Args: never; Returns: undefined }
      check_phone_exists: {
        Args: { p_exclude_uid?: string; p_phone: string }
        Returns: boolean
      }
      check_rate_limit: {
        Args: {
          p_action: string
          p_max_attempts?: number
          p_user_id: string
          p_window_minutes?: number
        }
        Returns: {
          allowed: boolean
          current_attempts: number
          remaining_attempts: number
          reset_at: string
        }[]
      }
      check_rate_limit_by_ip: {
        Args: {
          p_action: string
          p_ip_address: unknown
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: {
          allowed: boolean
          current_attempts: number
          remaining_attempts: number
          reset_at: string
        }[]
      }
      claim_trial: { Args: { p_email_hash: string }; Returns: boolean }
      cleanup_expired_reset_codes: { Args: never; Returns: number }
      cleanup_inactive_device_tokens: { Args: never; Returns: number }
      cleanup_old_guest_sessions: { Args: never; Returns: number }
      cleanup_old_notifications: { Args: never; Returns: number }
      cleanup_old_rate_limits: { Args: never; Returns: undefined }
      cleanup_old_site_visits: { Args: never; Returns: number }
      confirm_email_verification: {
        Args: { user_email: string }
        Returns: Json
      }
      create_booking: {
        Args: {
          p_booking_date: string
          p_end_time: string
          p_kids_ids: string[]
          p_notes?: string
          p_parent_id: string
          p_sitter_id: string
          p_start_time: string
          p_total_price: number
        }
        Returns: Json
      }
      create_notification: {
        Args: {
          p_booking_id?: string
          p_job_listing_id?: string
          p_message: string
          p_related_user_id?: string
          p_status?: string
          p_title: string
          p_type: string
          p_user_id: string
          p_user_type: string
        }
        Returns: string
      }
      create_notification_for_booking_participant: {
        Args: {
          p_booking_id: string
          p_message: string
          p_related_user_id?: string
          p_status: string
          p_title: string
          p_type: string
          p_user_id: string
          p_user_type: string
        }
        Returns: string
      }
      create_password_reset_code: {
        Args: { user_email: string }
        Returns: Json
      }
      deactivate_all_user_tokens: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      deactivate_device_token: {
        Args: { p_token: string; p_user_id: string }
        Returns: undefined
      }
      delete_user_account: {
        Args: { user_id_to_delete: string }
        Returns: undefined
      }
      generate_reset_code: { Args: never; Returns: string }
      get_admin_role: { Args: never; Returns: string }
      get_my_parent_id: { Args: never; Returns: string }
      get_my_sitter_id: { Args: never; Returns: string }
      get_pending_notifications: {
        Args: { batch_size?: number }
        Returns: {
          body: string
          created_at: string | null
          data: Json | null
          error_message: string | null
          id: string
          notification_type: string | null
          profile_image_url: string | null
          recipient_user_id: string
          sent_at: string | null
          status: string | null
          title: string
          tokens: Json
          updated_at: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "push_notification_queue"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_user_device_tokens: {
        Args: { p_user_id: string }
        Returns: {
          platform: string
          token: string
          token_type: string
        }[]
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "http_request"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_delete:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_get:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
        SetofOptions: {
          from: "*"
          to: "http_header"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_list_curlopt: {
        Args: never
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_post:
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_reset_curlopt: { Args: never; Returns: boolean }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      insert_notification_compat: {
        Args: {
          p_data?: Json
          p_message: string
          p_title: string
          p_type: string
          p_user_id: string
          p_user_kind: string
        }
        Returns: undefined
      }
      is_active_admin: { Args: never; Returns: boolean }
      is_admin: { Args: never; Returns: boolean }
      is_ip_banned: { Args: { check_ip: string }; Returns: boolean }
      is_parent_in_my_bookings: {
        Args: { check_parent_id: string }
        Returns: boolean
      }
      is_parent_in_my_chats: {
        Args: { check_parent_id: string }
        Returns: boolean
      }
      is_sitter_in_my_bookings: {
        Args: { check_sitter_id: string }
        Returns: boolean
      }
      is_sitter_in_my_chats: {
        Args: { check_sitter_id: string }
        Returns: boolean
      }
      mark_notification_failed: {
        Args: { error_msg: string; notification_id: string }
        Returns: undefined
      }
      mark_notification_sent: {
        Args: { notification_id: string }
        Returns: undefined
      }
      nearby_instant_availability: {
        Args: { p_lat: number; p_lon: number; p_radius_km?: number }
        Returns: {
          available_from: string | null
          available_to: string | null
          city: string | null
          created_at: string | null
          expires_at: string
          id: string
          latitude: number
          longitude: number
          message: string | null
          radius_km: number
          sitter_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "instant_availability"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      nearby_parent_requests: {
        Args: { p_lat: number; p_lon: number; p_radius_km?: number }
        Returns: {
          city: string | null
          created_at: string | null
          expires_at: string
          id: string
          latitude: number
          longitude: number
          message: string | null
          parent_id: string
          radius_km: number
        }[]
        SetofOptions: {
          from: "*"
          to: "parent_requests"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      parent_ids_for_sitter_bookings: { Args: never; Returns: string[] }
      parent_ids_with_active_requests: { Args: never; Returns: string[] }
      record_rate_limit_attempt: {
        Args: {
          p_action: string
          p_ip_address?: unknown
          p_user_agent?: string
          p_user_id: string
        }
        Returns: undefined
      }
      refresh_active_listings_stats: { Args: never; Returns: undefined }
      register_device_token: {
        Args: {
          p_device_name?: string
          p_platform: string
          p_token: string
          p_token_type?: string
          p_user_id: string
          p_user_type: string
        }
        Returns: string
      }
      request_email_verification: {
        Args: { user_email: string }
        Returns: Json
      }
      request_password_reset: { Args: { user_email: string }; Returns: Json }
      reset_user_password: {
        Args: { new_password: string; user_email: string }
        Returns: Json
      }
      sanitize_text_input: { Args: { p_input: string }; Returns: string }
      send_password_reset_email: {
        Args: { reset_code: string; user_email: string; user_name?: string }
        Returns: Json
      }
      send_reset_email: {
        Args: { reset_code: string; user_email: string; user_name?: string }
        Returns: Json
      }
      text_to_bytea: { Args: { data: string }; Returns: string }
      update_user_last_seen: {
        Args: { user_id: string; user_type: string }
        Returns: undefined
      }
      urlencode:
        | { Args: { data: Json }; Returns: string }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
      validate_email: { Args: { p_email: string }; Returns: boolean }
      validate_israeli_id: { Args: { p_id: string }; Returns: boolean }
      validate_israeli_phone: { Args: { p_phone: string }; Returns: boolean }
      verify_email_code: {
        Args: { user_code: string; user_email: string }
        Returns: Json
      }
      verify_reset_code: {
        Args: { user_code: string; user_email: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
