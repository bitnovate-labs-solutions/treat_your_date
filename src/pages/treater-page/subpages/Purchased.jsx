import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/lib/mockData";

// COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Purchased() {
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
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {purchasedItems?.map((item) => (
          <Card key={item.id} className="bg-white shadow-lg border-none">
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
              <p className="text-sm mt-2 text-muted-foreground">
                {item.location}
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                Purchased on: {new Date(item.purchased_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
        {purchasedItems?.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No purchased items yet
          </div>
        )}
      </div>
    </div>
  );
}
