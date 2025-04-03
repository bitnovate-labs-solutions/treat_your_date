import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
// import { mockApi } from "@/data/mock_data";

// COMPONENTS
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TreaterCard from "../components/TreaterCard";

export default function Purchased() {
  const [expandedId, setExpandedId] = useState(null);
  const { user } = useAuth();

  const { data: purchasedItems } = useQuery({
    queryKey: ["foodItems", "purchased"],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("purchases")
        .select(`
          *,
          purchase_items (
            *,
            menu_packages (
              *,
              menu_images (*),
              menu_package_stats (*)
            ),
            restaurants (
              id,
              name,
              location,
              image_url
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to match the expected format
      return data.flatMap(purchase => 
        purchase.purchase_items.map(item => ({
          ...item.menu_packages,
          restaurantName: item.restaurants.name,
          purchased_at: purchase.created_at,
          quantity: item.quantity,
          total_price: item.price * item.quantity
        }))
      );
    },
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
        <TreaterCard
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
              <br />
              Quantity: {item.quantity}
              <br />
              Total: RM {item.total_price.toFixed(2)}
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
