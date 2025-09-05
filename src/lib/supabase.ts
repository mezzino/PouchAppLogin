import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import Constants from 'expo-constants';

// Get environment variables from app.config.js or .env file
const { SUPABASE_URL, SUPABASE_ANON_KEY } = Constants.expoConfig?.extra || {};

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("[Supabase] Missing environment variables. Please check your app.config.js or .env file.");
  console.log("SUPABASE_URL:", SUPABASE_URL ? "Set" : "Missing");
  console.log("SUPABASE_ANON_KEY:", SUPABASE_ANON_KEY ? "Set" : "Missing");
}

export const supabase = createClient(
  SUPABASE_URL || "",
  SUPABASE_ANON_KEY || "",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
);
