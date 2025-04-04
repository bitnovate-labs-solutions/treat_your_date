import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const getPurchases = async () => {
  const { data, error } = await supabase
    .from("purchases")
    .select(
      `*, 
        purchase_items (
            *,
            menu_packages (
              *,
              menu_images (*),
              restaurant:restaurants!inner (
                id,
                name,
                description,
                location,
                address,
                image_url,
                phone_number
              )
            )
        )
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const usePurchasedItems = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: getPurchases,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval: 1000 * 30, // Refresh every 30 seconds
  });
};
