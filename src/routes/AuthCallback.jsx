import { useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  // const { user, checkUserProfile } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const handleCallback = async () => {
  //     try {
  //       // First get the session
  //       const {
  //         data: { session },
  //       } = await supabase.auth.getSession();

  //       if (session?.user) {
  //         // Then check if user has a profile
  //         const profile = await checkUserProfile(session.user.id);

  //         // If user has no profile, direct user to /create-profile page
  //         if (!profile) {
  //           navigate("/create-profile", { replace: true });
  //         } else {
  //           navigate(`/${profile.role}`, { replace: true }); // else if existing user - redirect user to their role page
  //         }
  //       } else {
  //         navigate("/auth", { replace: true });
  //       }
  //     } catch (error) {
  //       console.error("Callback error:", error);
  //       navigate("/auth", { replace: true });
  //     }
  //   };

  //   handleCallback();
  // }, [user, navigate, checkUserProfile]);

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
        navigate("/dashboard"); // Fallback route
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
