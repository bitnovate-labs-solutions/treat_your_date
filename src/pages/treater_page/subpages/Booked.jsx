import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/data/mock_data";
import TreaterCard from "../components/TreaterCard";

// COMPONENTS
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Booked() {
  const [expandedId, setExpandedId] = useState(null);

  const { data: bookedItems } = useQuery({
    queryKey: ["foodItems", "booked"],
    queryFn: mockApi.getBookedItems,
  });

  //  CODES FOR FUTURE USE --------------------
  //   const { data: bookedItems } = useQuery({
  //     queryKey: ["foodItems", "booked"],
  //     queryFn: async () => {
  //       const { data, error } = await supabase
  //         .from("food_items")
  //         .select("*")
  //         .eq("status", "booked")
  //         .order("booked_at", { ascending: false });

  //       if (error) throw error;
  //       return data || [];
  //     },
  //   });

  return (
    <div className="space-y-4">
      {bookedItems?.map((item) => (
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
              Booked on: {new Date(item.booked_at).toLocaleDateString()}
            </div>
          }
        />
      ))}
      {bookedItems?.length === 0 && (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No booked items yet
        </div>
      )}
    </div>
  );
}
