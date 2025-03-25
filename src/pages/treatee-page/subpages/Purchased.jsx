import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/lib/mockData";

// COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Purchased() {
  const { data: purchasedTreats } = useQuery({
    queryKey: ["foodItems", "purchased"],
    queryFn: mockApi.getPurchasedItems,
  });

  // CODES FOR FUTURE USE -------------------
  //   const { data: purchasedTreats } = useQuery({
  //     queryKey: ["foodItems", "purchased"],
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
  //         .eq("status", "purchased")
  //         .order("purchased_at", { ascending: false });

  //       if (error) throw error;
  //       return data || [];
  //     },
  //   });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {purchasedTreats?.map((treat) => (
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
                  Purchased from:{" "}
                  {treat.user_profiles?.display_name || "Anonymous"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(treat.purchased_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
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
