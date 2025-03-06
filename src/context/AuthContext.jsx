import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Loader";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      // Get initial session
      const { data: session, error } = await supabase.auth.getSession();

      if (error) console.error("Auth initialization error:", error);
      setUser(session?.session?.user ?? null);
      setLoading(false);
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
    // SIGN IN WITH GOOGLE
    signInWithGoogle: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      console.log("Auth response: ", { data, error });

      if (error) throw error;
      return data;
    },
    // SIGN OUT
    signOut: async () => {
      try {
        // Clear React Query cache first
        queryClient.clear();

        // Sign out from supabase (this also handles Google OAuth sign-out)
        const { error } = await supabase.auth.signOut({
          scope: "global", // ensures complete sign-out including OAuth providers
        });

        if (error) throw error;

        // Explicitly remove all Supabase-related items from localStorage
        for (const key of Object.keys(localStorage)) {
          if (key.startsWith("sb-")) {
            localStorage.removeItem(key);
          }
        }

        // Clear local state regardless of session status
        setUser(null);

        // Navigate to auth page after sign out
        navigate("/auth", { replace: true });
      } catch (error) {
        console.error("Sign out error:", error);
        // Still attempt to clear everything even if there's an error
        for (const key of Object.keys(localStorage)) {
          if (key.startsWith("sb-")) {
            localStorage.removeItem(key);
          }
        }
        setUser(null);
        navigate("/auth", { replace: true });
      }
    },
    user,
    checkUserProfile,
  };

  // LOADING ANIMATION
  if (loading && !user) {
    return <Loader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
