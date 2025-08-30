import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const [msg, setMsg] = useState("Completing sign-in…");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // Supabase automatically picks up tokens from the URL fragment (?code=)
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setMsg(error.message);
      } else {
        setMsg("Signed in! Redirecting…");
        setTimeout(() => navigate("/", { replace: true }), 1200);
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">{msg}</p>
    </div>
  );
}
