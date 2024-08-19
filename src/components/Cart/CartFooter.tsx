'use client';

import { useCartContext } from '@/src/components/Cart/CartContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ArrowRight, ShoppingCart, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatPrice } from '@/src/utils/formatUtils';

export default function CartFooter() {
  const { cart, getTotal } = useCartContext();
  const [animateTotal, setAnimateTotal] = useState(false);
  const total = getTotal();

  useEffect(() => {
    setAnimateTotal(true);
    const timer = setTimeout(() => setAnimateTotal(false), 300);
    return () => clearTimeout(timer);
  }, [total]);

  return (
    <motion.div
      className="p-6 border-t bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {cart.length > 0 ? (
          <motion.div
            key="with-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold text-gray-700">Total estimado:</span>
              <motion.span
                className="text-2xl font-bold text-blue-600"
                animate={{ scale: animateTotal ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {formatPrice(total)}
              </motion.span>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/cotizacion" className="block w-full py-3 px-4 bg-blue-600 text-white text-center rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2">
                <FileText size={20} />
                <span>Solicitar cotización</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>
            <motion.div
              className="mt-4 text-xs text-gray-600 text-center flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Info size={14} className="mr-1" />
              <span>Los precios pueden variar. Cotización sujeta a confirmación.</span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-500 mb-4">Agrega productos para solicitar una cotización</p>
            <Link href="/" className="inline-block py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Explorar productos
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}