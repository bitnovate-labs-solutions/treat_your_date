import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

// FOOD CATEGORY ENUM VALUES
const fetchFoodCategoryValues = async () => {
  const { data, error } = await supabase.rpc("enum_range", {
    enum_name: "food_category_enum",
  });

  if (error) throw new Error(error.message);
  return data;
};

export function useFoodCategoryEnum() {
  return useQuery({
    queryKey: ["food_category_enum"],
    queryFn: fetchFoodCategoryValues,
  });
}

// CUISINE TYPE ENUM VALUES
const fetchCuisineTypeValues = async () => {
  const { data, error } = await supabase.rpc("enum_range", {
    enum_name: "cuisine_type_enum",
  });

  if (error) throw new Error(error.message);
  return data;
};

export function useCuisineTypeEnum() {
  return useQuery({
    queryKey: ["cuisine_type_enum"],
    queryFn: fetchCuisineTypeValues,
  });
}
