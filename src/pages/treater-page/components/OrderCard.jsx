import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useCartStore from "@/lib/cartStore";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default function OrderCard({ item, restaurantName }) {
  const addItem = useCartStore((state) => state.addItem); // use Zustand useCartStore to add items

  const handleAddToCart = () => {
    const itemsWithRestaurantName = {
      ...item,
      restaurantName,
    };

    addItem(itemsWithRestaurantName);
    toast.success("Added to cart", {
      duration: 1000, // Closes after 2 seconds
    });
  };

  //   const queryClient = useQueryClient();

  //   const addToCart = useMutation({
  //     mutationFn: async (item) => {
  //       // Simulate API call
  //       await new Promise((resolve) => setTimeout(resolve, 500));
  //       return item;
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["cartItems"]);
  //       toast.success("Added to cart");
  //     },
  //     onError: () => {
  //       toast.error("Failed to add to cart");
  //     },
  //   });

  return (
    <Card className="flex p-3 border border-gray-200 shadow-md">
      {/* ITEM IMAGE */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={item.image_url}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="flex-1 flex-col gap-4 p-0 ml-2">
        {/* ITEM NAME & DESCRIPTION */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>

        {/* FOOTER */}
        <CardFooter className="flex items-center justify-between p-0">
          <span className="text-[#6366F1] font-medium">RM {item.price}</span>
          <Button
            className="bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-xl"
            onClick={handleAddToCart}
          >
            <Heart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
