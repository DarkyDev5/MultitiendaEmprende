'use client';

import { useCartContext } from '@/src/components/Cart/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function CartHeader() {
  const { closeCart, getItemCount } = useCartContext();
  const itemCount = getItemCount();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex justify-between items-center p-6 border-b bg-white shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center space-x-4 group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative">
          <ShoppingCart size={24} className="text-blue-600" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: itemCount > 0 ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          Tu Carrito
        </h2>
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.span
              key="item-count"
              className="bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-sm font-semibold"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {itemCount} {itemCount === 1 ? 'Producto' : 'Productos'}
            </motion.span>
          )}
        </AnimatePresence>
        <motion.div
          animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={20} className="text-blue-600" />
        </motion.div>
      </motion.div>
      <motion.button
        onClick={closeCart}
        className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="sr-only">Cerrar Carrito</span>
        <X size={24} />
      </motion.button>
    </motion.div>
  );
}