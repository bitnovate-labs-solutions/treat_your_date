import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useUserProfile(user) {
  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data || null;
    },
    enabled: !!user?.id,
  });
}
