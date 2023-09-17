import { supabase } from "../lib/supabase";

export async function fetchLatestReservation() {
  const { data } = await supabase
    .from("Reservation")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(1);

  return data?.[0];
}

export async function updateReservation(
  id: Reservation["id"],
  data: Partial<Reservation>,
) {
  return supabase.from("Reservation").update(data).eq("id", id).select();
}
