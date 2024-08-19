"use client"

import { useCartContext } from "@/src/components/Cart/CartContext";
import Cart from './Cart';

export default function CartModal() {
  const { isCartOpen } = useCartContext();

  if (!isCartOpen) {
    return null;
  }

  return <Cart />;
}
