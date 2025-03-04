import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      // Get initial session
      const { data: session, error } = await supabase.auth.getSession();

      if (error) console.error("Auth initialization error:", error);
      setUser(session?.session?.user ?? null);
      setLoading(false);

      // if (session?.user) {
      //   setUser(session.user);
      // } else {
      //   setUser(null);
      // }
      // } catch (error) {
      //   console.error("Auth initialization error:", error);
      // } finally {
      //   if (mounted) {
      //     setLoading(false);
      //   }
      // }
    };

    initializeAuth();

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", event); // Debug log
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // CHECK USER PROFILE in 'user_profiles' table
  const checkUserProfile = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error?.code === "PGRST116") return null; // No profile found - new user

      if (error) throw error;
      return profile;
    } catch (error) {
      console.error("Error in checkUserProfile:", error);
      return null;
    }
  };

  const value = {
    signInWithGoogle: async () => {
      // Check if app is in PWA mode
      const isPWA = window.matchMedia("(display-mode: standalone)").matches;
      const baseUrl = `${window.location.origin}`;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${baseUrl}/auth/callback`, // Ensure it stays in PWA scope
          skipBrowserRedirect: false, // Force a full-page redirect
          queryParams: {
            prompt: "select_account", // Always show account selector
            access_type: "offline",
            mobile: "1", // Avoid disabling mobile flow
            display: "page", // Use full-page redirect instead of popup
          },
        },
      });

      console.log("Auth response: ", { data, error });

      if (error) throw error;
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null); // Ensure user state is cleared
      navigate("/auth", { replace: true }); // Redirect to /auth after sign out. replace: true -> Prevents the user from going back to a protected page using the browser's back button.
    },
    user,
    checkUserProfile,
  };

  // LOADING ANIMATION
  if (loading && !user) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          color: "black",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading auth state...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
