// Zustand store for managing a shopping cart, with persistence enabled using the persist middleware
// useCartStore -> Zustand store created to hold cart-related states

// Manages cart items with:
// addItem(item): Adds an item to the cart or increases its quantity if it already exists.
// removeItem(itemKey): Removes an item from the cart.
// updateQuantity(itemKey, delta): Increases or decreases item quantity. If quantity drops to 0, it removes the item.
// clearCart(): Empties the cart.
// getTotal(): Calculates the total cost of all items.

import { create } from "zustand";
import { persist } from "zustand/middleware"; // middleware used to store the cart in local storage under the key 'cart-storage' so it persists across page reloads

// HOLD CART-RELATED STATE
const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      // ADD ITEM
      addItem: (item) => {
        const items = get().items;
        // Create a unique identifier for each item
        const itemKey = `${item.id}-${item.name}-${item.price}`;
        const existingItem = items.find(
          (i) => `${i.id}-${i.name}-${i.price}` === itemKey
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              `${i.id}-${i.name}-${i.price}` === itemKey
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1, itemKey }] });
        }
      },
      // REMOVE ITEM
      removeItem: (itemKey) => {
        const items = get().items;
        set({
          items: items.filter((i) => i.itemKey !== itemKey),
        });
      },
      // UPDATE ITEM QUANTITY
      updateQuantity: (itemKey, delta) => {
        const items = get().items;
        set({
          items: items
            .map((item) =>
              item.itemKey === itemKey
                ? { ...item, quantity: Math.max(0, item.quantity + delta) }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },
      // CLEAR ITEMS
      clearCart: () => set({ items: [] }),
      //   GET TOTAL AMOUNT
      getTotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
