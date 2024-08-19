"use client"

import { useCart } from './CartContext';
import Cart from './Cart';

export default function CartModal() {
  const { isCartOpen, closeCart } = useCart();

  if (!isCartOpen) {
    return null;
  }

  return <Cart onClose={closeCart} />;
}