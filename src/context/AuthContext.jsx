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
    let mounted = true;

    // Get initial session
    const initializeAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Session initialized:", session);

        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          // const profile = await checkUserProfile(session.user.id);
          // const currentPath = window.location.pathname;

          // Only redirect if not already on create-profile
          // if (!profile && currentPath !== "/create-profile") {
          //   navigate("/create-profile", { replace: true });
          // } else if (profile && currentPath === "/create-profile") {
          //   navigate(`/${profile.role}`, { replace: true });
          // }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event); // Debug log
      if (!mounted) return;

      setUser(session?.user ?? null);

      // if (session?.user) {
      //   const profile = await checkUserProfile(session.user.id);
      //   const currentPath = window.location.pathname;

      //   if (!profile && currentPath !== "/create-profile") {
      //     navigate("/create-profile", { replace: true });
      //   }
      // }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // CHECK USER PROFILE
  const checkUserProfile = async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error && error.code === "PGRST116") {
        // No profile found - new user
        return null;
      } else if (error) {
        throw error;
      }
      return profile;
    } catch (error) {
      console.error("Error in checkUserProfile:", error);
      return null;
    }
  };

  const value = {
    signInWithGoogle: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // skipBrowserRedirect: true, // Prevent automatic redirect
          queryParams: {
            prompt: "select_account", // Always show account selector
            access_type: "offline",
          },
          flowType: "popup", // Use popup instead of redirect
        },
      });

      if (error) throw error;
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/", { replace: true });
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
