import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useCartStore from "@/lib/cart_store";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

export default function OrderCard({ item, restaurantName }) {
  const [isInCart, setIsInCart] = useState(false);
  const { items, addItem, removeItem } = useCartStore();

  // Check if item is in cart whenever items change
  useEffect(() => {
    const itemInCart = items.some(
      (cartItem) =>
        cartItem.name === item.name &&
        cartItem.restaurantName === restaurantName
    );
    setIsInCart(itemInCart);
  }, [items, item.name, restaurantName]);

  // HANDLE ADD TO CART
  const handleAddToCart = () => {
    const itemsWithRestaurantName = {
      ...item,
      restaurantName,
    };

    addItem(itemsWithRestaurantName);
    window.scrollTo(0, 0);
    toast.success("Added to cart", {
      duration: 1000,
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

  const cartItems = useMemo(() => {
    return items.filter((cartItem) =>
      cartItem.restaurant_name === item.restaurant_name &&
      cartItem.cuisine_type === item.cuisine_type
    );
  }, [items, item.restaurant_name, restaurantName]);

  return (
    <Card className="flex p-3 border border-gray-200 shadow-md">
      {/* ITEM IMAGE */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <ImageWithFallback
          src={item.image_url}
          alt={item.restaurant_name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="flex-1 flex-col gap-4 p-0 ml-2">
        {/* ITEM NAME & DESCRIPTION */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-900">{item.restaurant_name}</h3>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>

        {/* FOOTER */}
        <CardFooter className="flex items-center justify-between p-0">
          <span className="text-[#6366F1] font-medium">RM {item.price}</span>
          <Button
            className={`h-8 bg-[#6366F1] text-white hover:bg-[#4F46E5] rounded-lg ${
              isInCart ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600 px-6"
            }`}
            disabled={isInCart}
            onClick={handleAddToCart}
          >
            <span className="text-sm">{isInCart ? "Added" : "Add"}</span>
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
