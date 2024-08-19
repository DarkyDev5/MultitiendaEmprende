'use client';

import React from 'react';
import { useCartContext } from '@/src/components/Cart/CartContext';
import CartItem from './CartItem';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Trash2, ArrowLeft, X  } from 'lucide-react';
import Link from 'next/link';
import { CartContextType } from '@/src/types/product';
import toast, { Toaster } from 'react-hot-toast';

export default function CartItems() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCartContext() as CartContextType;

  const showToast = (message: string) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    toast.success('Cantidad actualizada', { duration: 3000 });
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
    toast.success('Producto eliminado del carrito', { duration: 3000 });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado', { duration: 3000 });
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
       <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
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