import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import TreateeCard from "./Treatee/components/TreateeCard";

export default function Explore() {
  const queryClient = useQueryClient();

  const fetchFoodItems = useCallback(async () => {
    // Try to get from cache first
    const cached = queryClient.getQueryData(["foodItems"]);
    if (cached) return cached;

    // If not in cache, fetch from API
    const { data, error } = await supabase
      .from("foods")
      .select(
        `
        *,
        restaurants (*),
        user_selections (
          id,
          user_profile_id,
          role,
          user_profiles (*)
        )
      `
      )
      .order("available_date", { ascending: true });

    if (error) throw error;

    // Cache the response
    queryClient.setQueryData(["foodItems"], data);
    return data;
  }, [queryClient]);

  const { data: foodItems } = useQuery({
    queryKey: ["foodItems"],
    queryFn: fetchFoodItems,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
    suspense: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        {foodItems?.map((item) => (
          <TreateeCard
            key={item.id}
            item={item}
            isLiked={item.isLiked}
            onLike={() => {}} // Implement like functionality as needed
          />
        ))}
      </div>
    </div>
  );
}
