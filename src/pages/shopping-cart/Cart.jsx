import { useState } from "react";
import ShoppingCart from "./subpages/ShoppingCart";
import OrderSuccess from "./subpages/OrderSuccess";

export default function Cart() {
  const [orderComplete, setOrderComplete] = useState(false);

  if (orderComplete) {
    return <OrderSuccess />;
  }

  return <ShoppingCart onSuccess={() => setOrderComplete(true)} />;
}
