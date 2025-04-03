import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchRestaurants = async () => {
  const { data, error } = await supabase // JOIN restaurant_stats, menu_packages and menu_images table here!
    .from("restaurants")
    .select(
      `
      *, 
      restaurant_stats (like_count, avg_rating),
      menu_packages (
        *,
        menu_images (*)
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval: 1000 * 30, // Refresh every 30 seconds
  });
};
