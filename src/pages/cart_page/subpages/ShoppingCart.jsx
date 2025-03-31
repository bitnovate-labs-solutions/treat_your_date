// import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { mockApi } from "@/lib/mockData";
import useCartStore from "@/lib/cart_store";
import ImageWithFallback from "@/components/ImageWithFallback";
import EmptyCart from "@/assets/images/empty_cart.png";

export default function ShoppingCart({ onSuccess }) {
  const navigate = useNavigate();

  const { items, updateQuantity, removeItem, getTotal } = useCartStore(); // Zustand functions

  const total = getTotal();

  // const { data: items = [], isLoading } = useQuery({
  //   queryKey: ["cartItems"],
  //   queryFn: mockApi.getCartItems,
  // });

  // const [cartItems, setCartItems] = useState(items);

  // useEffect(() => {
  //   setCartItems(items);
  // }, [items]);

  // const updateQuantity = (id, delta) => {
  //   setCartItems(
  //     cartItems
  //       .map((item) => {
  //         if (item.id === id) {
  //           const newQuantity = Math.max(0, item.quantity + delta);
  //           return { ...item, quantity: newQuantity };
  //         }
  //         return item;
  //       })
  //       .filter((item) => item.quantity > 0)
  //   );
  // };

  // const total = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-white flex items-center justify-center">
  //       <div className="text-gray-500">Loading cart...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto">
        {/* SHOPPING CART EMPTY PAGE */}
        {items.length === 0 ? (
          <div className="fixed inset-0 max-w-sm mx-auto flex flex-col items-center justify-center px-6">
            <ImageWithFallback src={EmptyCart} className="w-50 h-auto mb-6" />
            <p className="text-lightgray text-sm">Your cart is empty</p>
            <p className="text-lightgray text-sm mb-10 text-center px-10">
              Browser products and add to cart to place on order!
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="w-full bg-primary hover:bg-primary-hover text-white"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* SHOPPING CART ADDED ITEMS */}
            <div className="space-y-4 p-4">
              {items.map((item) => (
                <div
                  key={item.itemKey}
                  className="flex items-start gap-3 bg-white shadow-lg p-4 rounded-xl"
                >
                  {/* CARD IMAGE */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-5">
                    <div className="col-span-4 space-y-5">
                      {/* RESTAURANT NAME & MEAL PACKAGE */}
                      <div>
                        <h3 className="text-xs font-bold text-gray-800">
                          {item.restaurantName}
                        </h3>
                        <h3 className="text-sm font-light text-darkgray">
                          {item.name}
                        </h3>
                      </div>

                      <div className="grid grid-cols-2">
                        {/* ITEM PRICE */}
                        <div>
                          <p className="text-gray-600 font-bold">
                            RM {item.price}
                          </p>
                        </div>

                        {/* DELETE BUTTON */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => removeItem(item.itemKey)}
                            className="text-red-500 hover:text-red-600 text-right"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* + / - QUANTITY BUTTONS */}
                    <div className="flex flex-col items-center gap-2 ml-5">
                      <button
                        onClick={() => updateQuantity(item.itemKey, -1)}
                        className="w-5 h-5 flex items-center justify-center rounded-sm bg-white border border-gray-300"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.itemKey, 1)}
                        className="w-5 h-5 flex items-center justify-center rounded-sm bg-white border border-gray-300"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER NOW SECTION */}
            <div className="fixed bottom-20 left-0 right-0 max-w-sm mx-auto border-t border-lightgray/20 shadow-lg bg-white">
              {/* TOTAL PRICE */}
              <div className="pt-6 px-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Total</span>
                  <span className="text-base font-semibold">
                    RM {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* ORDER NOW BUTTON */}
              <div className="px-6 pb-6">
                <Button
                  onClick={onSuccess}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-hover text-white shadow-md"
                >
                  Order Now
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
