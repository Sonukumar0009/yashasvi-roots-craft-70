// src/lib/supabaseEmployeeClient.ts
import { createClient } from "@supabase/supabase-js";

const EMP_URL = import.meta.env.VITE_SUPABASE_EMP_URL!;
const EMP_ANON = import.meta.env.VITE_SUPABASE_EMP_ANON_KEY!;

export const supabaseEmployee = createClient(EMP_URL, EMP_ANON, {
  auth: {
    persistSession: true,
    storageKey: "sb-emp-auth", // separate storage key so it won’t clash with customer auth
  },
});
