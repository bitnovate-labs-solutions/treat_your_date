import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/lib/mock_data";

// COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Menu() {
  const { data: availableTreats } = useQuery({
    queryKey: ["foodItems", "available"],
    queryFn: mockApi.getMenuItems,
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
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableTreats?.map((treat) => (
          <Card key={treat.id} className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle>{treat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{treat.description}</p>
              <p className="text-sm mt-2 text-muted-foreground">
                {treat.location}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">
                  By {treat.user_profiles?.display_name || "Anonymous"}
                </span>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {availableTreats?.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No available treats at the moment
          </div>
        )}
      </div>
    </div>
  );
}
