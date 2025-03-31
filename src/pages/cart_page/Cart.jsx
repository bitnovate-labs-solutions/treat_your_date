import { useState } from "react";
import ShoppingCart from "./subpages/ShoppingCart";
import OrderSuccess from "./subpages/OrderSuccess";
import useCartStore from "@/lib/cart_store";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// import { mockApi } from "@/lib/mockData";

export default function Cart() {
  const [orderComplete, setOrderComplete] = useState(false);

  const queryClient = useQueryClient();
  const { items, clearCart } = useCartStore();

  // HANDLE PURCHASE
  const handlePurchase = async () => {
    try {
      // Purchase the items
      // await mockApi.purchaseItems(items);

      // Clear the cart
      clearCart();

      // Invalidate relevant queries to trigger refetch
      queryClient.invalidateQueries(["foodItems"]);
      queryClient.invalidateQueries(["foodItems", "purchased"]);

      // Show success state
      setOrderComplete(true);

      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Purchase error:", error);
    }
  };

  if (orderComplete) {
    return <OrderSuccess />;
  }

  // return <ShoppingCart onSuccess={() => setOrderComplete(true)} />;
  return <ShoppingCart onSuccess={handlePurchase} />;
}
