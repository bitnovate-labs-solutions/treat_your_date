import { Suspense, useCallback } from "react";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { supabase } from "@/lib/supabase";

// Components and UI
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Error and Loading Handlers
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/ErrorFallback";
import { CardSkeleton } from "@/components/LoadingSkeleton";
// import { Button } from "@/components/ui/button";
// import { Heart } from "lucide-react";
import { useLocation } from "react-router-dom";
import Menu from "./subpages/Menu";
import Purchased from "./subpages/Purchased";
import Booked from "./subpages/Booked";

// FOOD CARD COMPONENT

// function FoodItems() {
//   const queryClient = useQueryClient();

//   const fetchFoodItems = useCallback(async () => {
//     const { data, error } = await supabase
//       .from("foods")
//       .select(
//         `
//         *,
//         restaurants (
//           id,
//           name,
//           location,
//           image_url
//         ),
//         user_selections (
//           id,
//           user_profile_id,
//           role,
//           user_profiles (
//             id,
//             display_name,
//             avatar_url
//           )
//         )
//       `
//       )
//       .order("available_date", { ascending: true });

//     if (error) throw error;

//     // Preload images immediately after data fetch
//     data?.forEach((item) => {
//       const img = new Image();
//       img.src = item.image_url || item.restaurants?.image_url;
//     });

//     return data;
//   }, []);

//   const { data: foodItems } = useQuery({
//     queryKey: ["foodItems"],
//     queryFn: fetchFoodItems,
//     suspense: true,
//     placeholderData: () => {
//       return queryClient.getQueryData(["foodItems"]) || [];
//     },
//   });

//   return (
//     <>
//       <div className="space-y-4">
//         <div className="grid grid-cols-1 gap-4">
//           {foodItems?.map((item) => (
//             <Card
//               key={item.id}
//               className="overflow-hidden bg-white border-gray-200 shadow-md"
//             >
//               <div className="relative">
//                 {/* CARD IMAGE */}
//                 <img
//                   src={item.image_url || item.restaurants?.image_url}
//                   alt={item.name}
//                   className="w-full h-38 object-cover"
//                 />
//                 <div className="absolute top-4 right-4 flex gap-2">
//                   {/* CARD LABEL */}
//                   <span className="flex items-center bg-[#636AE8] text-white px-3 py-auto rounded-lg text-sm">
//                     {item.meal_type} | SET A
//                   </span>
//                   {/* CARD LIKE BUTTON */}
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="bg-white/80 rounded-lg"
//                   >
//                     <Heart className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               {/* CARD CONTENT */}
//               <CardContent className="p-4">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <h3 className="text-xl font-semibold">{item.name}</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {item.restaurants?.location}
//                     </p>
//                   </div>
//                   <div className="text-sm text-muted-foreground flex items-center">
//                     <span className="mr-1">📅</span>
//                     {new Date(item.date).toLocaleDateString("en-US", {
//                       month: "short",
//                       day: "2-digit",
//                       year: "numeric",
//                     })}
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center mt-4">
//                   <div>
//                     <p className="text-sm font-medium mb-1">Treators</p>
//                     <div className="flex items-center">
//                       <div className="flex -space-x-2">
//                         {item.user_selections?.slice(0, 3).map((selection) => (
//                           <div
//                             key={selection.id}
//                             className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
//                           >
//                             {selection.user_profiles?.avatar_url ? (
//                               <img
//                                 src={selection.user_profiles.avatar_url}
//                                 alt={selection.user_profiles.display_name}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-full h-full bg-[#EEF2FF] flex items-center justify-center">
//                                 <span className="text-xs text-[#636AE8]">
//                                   {selection.user_profiles?.display_name?.[0] ||
//                                     "?"}
//                                 </span>
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                         {item.user_selections?.length > 3 && (
//                           <div className="w-8 h-8 rounded-full bg-[#EEF2FF] border-2 border-white flex items-center justify-center">
//                             <span className="text-xs text-[#636AE8]">
//                               +{item.user_selections.length - 3}
//                             </span>
//                           </div>
//                         )}
//                       </div>
//                       <span className="text-sm text-rose-500 ml-4">
//                         +{item.likes || 0} interested
//                       </span>
//                     </div>
//                   </div>
//                   <Button className="bg-[#636AE8] hover:bg-[#4F46E5] text-white">
//                     Join
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

export default function Treater() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activeTab = searchParams.get("tab") || "menu";

  const renderContent = () => {
    switch (activeTab) {
      case "menu":
        return <Menu />;
      case "purchased":
        return <Purchased />;
      case "booked":
        return <Booked />;
      default:
        return <Menu />;
    }
  };

  return (
    <ScrollArea>
      <div className="bg-transparent py-4">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<CardSkeleton />}>
            {/* <FoodItems /> */}
            {renderContent()}
          </Suspense>
        </ErrorBoundary>
      </div>
    </ScrollArea>
  );
}
