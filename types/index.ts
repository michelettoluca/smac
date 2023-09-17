import { Database } from "./supabase";

declare global {
  type Reservation = Database["public"]["Tables"]["Reservation"]["Row"];
  type Status = Database["public"]["Enums"]["Status"];
}
