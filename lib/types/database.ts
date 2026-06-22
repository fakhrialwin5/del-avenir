// ──────────────────────────────────────────────
// Supabase Database Types
// Auto-generate with: npx supabase gen types typescript --project-id <ref> > lib/types/database.ts
// Or paste this manually after creating tables in the dashboard.
// ──────────────────────────────────────────────

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          category:
            | "academic"
            | "arts"
            | "sports"
            | "religious"
            | "community";
          level: "international" | "national" | "regional" | "local";
          year: number;
          students: string[];
          ranking: number;
          image_url: string | null;
          featured: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          category:
            | "academic"
            | "arts"
            | "sports"
            | "religious"
            | "community";
          level: "international" | "national" | "regional" | "local";
          year: number;
          students?: string[];
          ranking?: number;
          image_url?: string | null;
          featured?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string;
          category?:
            | "academic"
            | "arts"
            | "sports"
            | "religious"
            | "community";
          level?: "international" | "national" | "regional" | "local";
          year?: number;
          students?: string[];
          ranking?: number;
          image_url?: string | null;
          featured?: boolean;
        };
      };
      registrations: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          role: "Guest" | "Participant" | "Volunteer";
          guests: number;
          status: "pending" | "confirmed" | "cancelled";
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          role: "Guest" | "Participant" | "Volunteer";
          guests?: number;
          status?: "pending" | "confirmed" | "cancelled";
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          role?: "Guest" | "Participant" | "Volunteer";
          guests?: number;
          status?: "pending" | "confirmed" | "cancelled";
        };
      };
      gallery_photos: {
        Row: {
          id: string;
          created_at: string;
          src: string;
          alt: string;
          caption: string;
          sort_order: number;
          event_name: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          src: string;
          alt: string;
          caption: string;
          sort_order?: number;
          event_name?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          src?: string;
          alt?: string;
          caption?: string;
          sort_order?: number;
          event_name?: string;
        };
      };
      sponsors: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          tier: "gold" | "silver" | "bronze";
          logo_url: string | null;
          website_url: string | null;
          amount: number | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          tier: "gold" | "silver" | "bronze";
          logo_url?: string | null;
          website_url?: string | null;
          amount?: number | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          tier?: "gold" | "silver" | "bronze";
          logo_url?: string | null;
          website_url?: string | null;
          amount?: number | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
