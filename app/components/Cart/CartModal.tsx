// components/CartModal.tsx
"use client"
import React from 'react';
import { useCart } from './CartContext';
import Cart from './Cart';

const CartModal: React.FC = () => {
  const { isCartOpen, closeCart } = useCart();

  if (!isCartOpen) return null;

  return <Cart onClose={closeCart} />;
};

export default CartModal;