import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/data/mock_data";

// COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Booked() {
  const { data: bookedTreats } = useQuery({
    queryKey: ["foodItems", "booked"],
    queryFn: mockApi.getBookedItems,
  });

  // CODES FOR FUTURE USE ------------------
  //   const { data: bookedTreats } = useQuery({
  //     queryKey: ["foodItems", "booked"],
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
  //         .eq("status", "booked")
  //         .order("booked_at", { ascending: false });

  //       if (error) throw error;
  //       return data || [];
  //     },
  //   });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookedTreats?.map((treat) => (
          <Card key={treat.id} className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle>{treat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{treat.description}</p>
              <p className="text-sm mt-2 text-muted-foreground">
                {treat.location}
              </p>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Booked with:{" "}
                  {treat.user_profiles?.display_name || "Anonymous"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(treat.booked_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
        {bookedTreats?.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No booked treats yet
          </div>
        )}
      </div>
    </div>
  );
}
