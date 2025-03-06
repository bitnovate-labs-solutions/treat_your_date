import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data: session, error } = await supabase.auth.getSession();

      if (error || !session?.session?.user) {
        console.error("Authentication error: ", error);
        return navigate("/auth"); // redirect to login if there's an issue
      }

      const userId = session.session.user.id;

      // Check if the user exists in 'user_profile'
      const { data: userProfile, error: profileError } = await supabase
        .from("user_profile")
        .select("role")
        .eq("id", userId).single;

      if (profileError || !userProfile) {
        // If the user does NOT exist, send them to create profile
        return navigate("/create-profile");
      }

      // Redirect based on user role
      if (userProfile.role === "treater") {
        navigate("/treater");
      } else if (userProfile.role === "treatee") {
        navigate("/treatee");
      } else {
        navigate("/"); // Fallback route
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Processing authentication...</p>
    </div>
  );
}
