'use client';

import React from 'react';
import { useCartContext } from '@/src/components/Cart/CartContext';
import CartItem from './CartItem';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CartContextType } from '@/src/types/product';
import toast, { Toaster } from 'react-hot-toast';

export default function CartItems() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartContext() as CartContextType;

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    toast.success('Cantidad actualizada');
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    toast.success('Producto eliminado del carrito');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado');
  };

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center h-full p-4 text-center"
      >
        <ShoppingCart size={64} className="text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">Agrega productos para solicitar una cotización</p>
        <Link href="/productos" passHref>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Explorar productos
          </motion.button>
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Toaster position="bottom-right" />
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {cart.map((item) => (
            <CartItem 
              key={item.product.id} 
              item={item} 
              updateQuantity={handleUpdateQuantity}
              removeFromCart={handleRemoveFromCart}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className="p-4 border-t bg-white">
        <div className="flex justify-between space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCart}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            <Trash2 size={18} className="mr-2" />
            Vaciar carrito
          </motion.button>
          <Link href="/productos" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              <ArrowLeft size={18} className="mr-2" />
              Seguir comprando
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}