import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/data/mock_data";
import { useFilters } from "@/context/FilterContext";

// COMPONENTS
import { useState } from "react";
import FoodCard from "../components/FoodCard";

export default function Menu() {
  const [expandedId, setExpandedId] = useState(null);
  const { filters } = useFilters();

  const { data: foodItems } = useQuery({
    queryKey: ["foodItems", "menu", filters],
    queryFn: mockApi.getMenuItems,
  });

  // Filter the food items based on the current filters
  const filteredItems = foodItems?.filter((item) => {
    // Filter by cuisine type
    if (filters.cuisine && item.cuisine_type !== filters.cuisine) {
      return false;
    }

    // Filter by category (if implemented in the future)
    if (filters.category && item.category !== filters.category) {
      return false;
    }

    return true;
  });

  // Sort the filtered items based on the sort filter
  const sortedItems = filteredItems?.sort((a, b) => {
    switch (filters.sort) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "trending":
        return b.likes - a.likes;
      case "rating_high":
        return b.rating - a.rating;
      case "rating_low":
        return a.rating - b.rating;
      case "price_high":
        return b.price - a.price;
      case "price_low":
        return a.price - b.price;
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
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
      {sortedItems?.map((item) => (
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
