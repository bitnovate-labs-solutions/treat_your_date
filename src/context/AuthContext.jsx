import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error && error.code === "PGRST116") {
        // No profile found, redirect to role selection
        navigate("/role-selection", { replace: true });
      } else if (error) {
        console.error("Error checking user profile:", error);
      } else if (data?.role) {
        // Profile exists, navigate to their role page
        navigate(`/${data.role}`, { replace: true });
      }
    } catch (error) {
      console.error("Error in checkUserProfile:", error);
    }
  };

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
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
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      if (event === "SIGNED_IN") {
        setUser(session.user);
        // Only check profile if email is confirmed
        if (session.user.email_confirmed_at) {
          checkUserProfile(session.user.id);
        }
      } else if (event === "USER_UPDATED") {
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        navigate("/auth", { state: { mode: "login" }, replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // SIGN IN
  const signIn = async (credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword(credentials);
    if (error) throw error;
    await checkUserProfile(data.user.id);
    return data;
  };

  // SIGN UP
  const signUp = async (credentials) => {
    const { data, error } = await supabase.auth.signUp(credentials);
    if (error) throw error;
    // // Only check profile if session exists (email already confirmed)
    // if (data.session) {
    //   await checkUserProfile(data.user.id);
    // }
    return data;
  };

  // SIGN OUT
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    signUp,
    signIn,
    signOut,
    signInWithGoogle: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      return data;
    },
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
