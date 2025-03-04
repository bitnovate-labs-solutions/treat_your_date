import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const { user, checkUserProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // First get the session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // Then check if user has a profile
          const profile = await checkUserProfile(session.user.id);

          // If user has no profile, direct user to /create-profile page
          if (!profile) {
            navigate("/create-profile", { replace: true });
          } else {
            navigate(`/${profile.role}`, { replace: true }); // else direct user to either /treator or /treatee page
          }
        }
      } catch (error) {
        console.error("Callback error:", error);
        navigate("/auth", { replace: true });
      }
    };

    handleCallback();
  }, [user, navigate, checkUserProfile]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Setting up your account...</p>
    </div>
  );
}
