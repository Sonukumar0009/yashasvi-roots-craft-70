// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: {
//     persistSession: true, // keeps session across reloads
//     autoRefreshToken: true,
//   },
// });
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,        // e.g. https://gnbixieumyutlesybbkn.supabase.co
  import.meta.env.VITE_SUPABASE_ANON_KEY!    // your anon key
);
