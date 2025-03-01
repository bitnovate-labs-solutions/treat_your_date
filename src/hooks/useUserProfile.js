import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useUserProfile(authUser) {
  // user prop -> the user id from the user_profiles table passed from components using this hook
  const fetchProfile = async () => {
    if (!authUser?.id) return null;

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", authUser.id)
      .single();

    if (error) {
      // PGRST116 means no profile found - this is expected for new users
      if (error.code === "PGRST116") {
        console.log("No profile found for new user");
        return null;
      }
      console.error("Profile fetch error:", error);
      throw error;
    }

    return data;
  };

  return useQuery({
    queryKey: ["profile", authUser?.id],
    queryFn: fetchProfile,
    enabled: !!authUser?.id,
    retry: false, // Don't retry on error for new users
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    suspense: true,
  });
}
