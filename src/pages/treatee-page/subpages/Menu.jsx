import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/lib/mock_data";
import TreateeCard from "../components/TreateeCard";

// COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Menu() {
  const { data: purchasedTreats } = useQuery({
    queryKey: ["foodItems", "purchased"],
    queryFn: mockApi.getPurchasedItems,
  });
  // CODES FOR FUTURE USE!!! --------------------
  //   const { data: availableTreats } = useQuery({
  //     queryKey: ["foodItems", "available"],
  //     queryFn: async () => {
  //       const { data, error } = await supabase
  //         .from("food_items")
  //         .select(
  //           `
  //           *,
  //           user_profiles!food_items_user_id_fkey_profiles (
  //             display_name
  //           )
  //         `
  //         )
  //         .eq("status", "available")
  //         .order("created_at", { ascending: false });

  //       if (error) throw error;
  //       return data || [];
  //     },
  //   });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {purchasedTreats?.map((item) => (
          <TreateeCard
            key={item.id}
            item={item}
            isLiked={false}
            onLike={() => {}}
            // additionalInfo={
            //   <div className="text-sm text-gray-500">
            //     {new Date(item.purchased_at).toLocaleDateString()}
            //   </div>
            // }
          />
        ))}
        {purchasedTreats?.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No purchased treats yet
          </div>
        )}
      </div>
    </div>
  );
}
