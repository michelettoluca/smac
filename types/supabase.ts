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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      Reservation: {
        Row: {
          createdAt: string;
          id: number;
          status: Database["public"]["Enums"]["Status"];
        };
        Insert: {
          createdAt?: string;
          id?: number;
          status: Database["public"]["Enums"]["Status"];
        };
        Update: {
          createdAt?: string;
          id?: number;
          status?: Database["public"]["Enums"]["Status"];
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      Status: "unknown" | "wait" | "do_not_wait" | "timeout";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
