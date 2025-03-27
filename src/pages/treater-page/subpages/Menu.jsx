import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/lib/mock_data";

// COMPONENTS
import { useState } from "react";
import FoodCard from "../components/FoodCard";

export default function Menu() {
  const [expandedId, setExpandedId] = useState(null);

  const { data: foodItems } = useQuery({
    queryKey: ["foodItems", "menu"],
    queryFn: mockApi.getMenuItems,
  });

  // CODES FOR FUTURE USE ------------------
  // const { data: foodItems } = useQuery({
  //   queryKey: ["foodItems", "menu"],
  //   queryFn: async () => {
  //     const { data, error } = await supabase
  //       .from("food_items")
  //       .select("*")
  //       .order("created_at", { ascending: false });

  //     if (error) throw error;
  //     return data || [];
  //   },
  // });

  return (
    <div className="space-y-4">
      {foodItems?.map((item) => (
        <FoodCard
          key={item.id}
          item={item}
          expanded={expandedId === item.id}
          onToggle={() =>
            setExpandedId(expandedId === item.id ? null : item.id)
          }
        />
      ))}
    </div>
  );
}
