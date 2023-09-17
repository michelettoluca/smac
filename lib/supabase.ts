import "react-native-url-polyfill/auto";

import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = "https://ndwprcrcmwnmuzbvtlvy.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_SECRET_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
