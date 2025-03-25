import { useQuery } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";
import { mockApi } from "@/lib/mockData";

// COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Booked() {
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
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookedItems?.map((item) => (
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
                Booked on: {new Date(item.booked_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
        {bookedItems?.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No booked items yet
          </div>
        )}
      </div>
    </div>
  );
}
