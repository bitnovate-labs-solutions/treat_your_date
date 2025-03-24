import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // USESTATES
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // SESSION CHECK
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        // Get initial session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        // const { data: session, error } = await supabase.auth.getSession();

        setUser(session?.user ?? null);
        // if (error) console.error("Auth initialization error:", error);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id); // Debug log
      if (event === "SIGNED_IN") {
        setUser(session?.user);
        // Only check profile if email is confirmed
        if (session.user.email_confirmed_at && location.pathname === "/") {
          navigate("/create-profile", { replace: true });
        }
      } else if (event === "USER_UPDATED") {
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        localStorage.setItem("isExistingUser", "true");
        setUser(null);
        navigate("/auth", { state: { mode: "login" }, replace: true });
      }
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

      if (error && error?.code === "PGRST116") {
        // No profile found, redirect to create profile
        navigate("/create-profile", { replace: true });
      } else if (profile?.role) {
        // If we have a role, navigate to the role page
        navigate(`/${profile.role}`, { replace: true });
      }

      if (error) throw error;
      return profile;
    } catch (error) {
      console.error("Error in checkUserProfile:", error);
      return null;
    }
  };

  // SIGN IN
  const signIn = async (credentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(
        credentials
      );
      if (error) throw error;

      if (data.user.email_confirmed_at) {
        await checkUserProfile(data.user.id);
      }
      return data;
    } catch (error) {
      console.error("Sign-in error:", error.message);
      throw error;
    }
  };

  // SIGN UP
  const signUp = async (credentials) => {
    try {
      const { data, error } = await supabase.auth.signUp(credentials);
      if (error) throw error; // Ensure errors are caught in catch block

      return data;
    } catch (error) {
      console.error("Signup error: ", error.message);
      throw error; // Re-throw for handling at a higher level if needed
    }
  };

  // SIGN OUT
  const signOut = async () => {
    try {
      // Clear React Query cache first
      queryClient.clear();

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
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
  };

  const value = {
    // SIGN IN WITH GOOGLE
    // signInWithGoogle: async () => {
    //   const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider: "google",
    //     options: {
    //       redirectTo: `${window.location.origin}/auth/callback`,
    //     },
    //   });

    //   console.log("Auth response: ", { data, error });

    //   if (error) throw error;
    //   return data;
    // },
    // SIGN OUT
    // signOut: async () => {
    //   try {
    //     // Clear React Query cache first
    //     queryClient.clear();

    //     // Sign out from supabase (this also handles Google OAuth sign-out)
    //     const { error } = await supabase.auth.signOut({
    //       scope: "global", // ensures complete sign-out including OAuth providers
    //     });

    //     if (error) throw error;

    //     // Explicitly remove all Supabase-related items from localStorage
    //     for (const key of Object.keys(localStorage)) {
    //       if (key.startsWith("sb-")) {
    //         localStorage.removeItem(key);
    //       }
    //     }

    //     // Clear local state regardless of session status
    //     setUser(null);

    //     // Navigate to auth page after sign out
    //     navigate("/auth", { replace: true });
    //   } catch (error) {
    //     console.error("Sign out error:", error);
    //     // Still attempt to clear everything even if there's an error
    //     for (const key of Object.keys(localStorage)) {
    //       if (key.startsWith("sb-")) {
    //         localStorage.removeItem(key);
    //       }
    //     }
    //     setUser(null);
    //     navigate("/auth", { replace: true });
    //   }
    // },
    signUp,
    signIn,
    signOut,
    user,
    checkUserProfile,
  };

  // LOADING ANIMATION
  if (loading && !user) {
    return <Loader />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
