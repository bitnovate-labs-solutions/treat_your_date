import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/lib/mockData";

// COMPONENTS
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FoodCard from "../components/FoodCard";

export default function Purchased() {
  const [expandedId, setExpandedId] = useState(null);

  const { data: purchasedItems } = useQuery({
    queryKey: ["foodItems", "purchased"],
    queryFn: mockApi.getPurchasedItems,
  });

  // CODES FOR FUTURE USE -------------------
  //   const { data: purchasedItems } = useQuery({
  //     queryKey: ["foodItems", "purchased"],
  //     queryFn: async () => {
  //       const { data, error } = await supabase
  //         .from("food_items")
  //         .select("*")
  //         .eq("status", "purchased")
  //         .order("purchased_at", { ascending: false });

  //       if (error) throw error;
  //       return data || [];
  //     },
  //   });

  return (
    <div className="space-y-4">
      {purchasedItems?.map((item) => (
        <FoodCard
          key={item.id}
          item={item}
          expanded={expandedId === item.id}
          onToggle={() =>
            setExpandedId(expandedId === item.id ? null : item.id)
          }
          showMenuItems={false}
          additionalInfo={
            <div className="text-sm text-gray-500">
              Purchased on: {new Date(item.purchased_at).toLocaleDateString()}
            </div>
          }
        />
      ))}
      {purchasedItems?.length === 0 && (
        <div className="col-span-full text-center py-8 text-muted-foreground text-darkgray">
          No purchased items yet
        </div>
      )}
    </div>
  );
}
