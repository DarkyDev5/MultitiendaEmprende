// app/components/Cart/Cart.tsx
'use client';
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartContext } from '@/src/components/Cart/CartContext';
import CartHeader from './CartHeader';
import CartItems from './CartItems';
import CartFooter from './CartFooter';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { isCartOpen, closeCart, cart } = useCartContext();
  const cartRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeCart]);

  useEffect(() => {
    if (itemsRef.current) {
      itemsRef.current.scrollTop = itemsRef.current.scrollHeight;
    }
  }, [cart]);

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <motion.div
          ref={cartRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl flex flex-col"
        >
          <CartHeader />
          <div ref={itemsRef} className="flex-grow overflow-y-auto">
            {cart.length > 0 ? (
              <CartItems />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500">Agrega productos para solicitar una cotización</p>
              </div>
            )}
          </div>
          <CartFooter />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}