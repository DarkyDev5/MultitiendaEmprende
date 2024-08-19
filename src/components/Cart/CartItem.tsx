'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, Tag } from 'lucide-react';
import { formatPrice } from '@/src/utils/formatUtils';
import { CartItem as CartItemType } from '@/src/types/product';

export interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export default function CartItem({ item, updateQuantity, removeFromCart }: CartItemProps) {
  const totalPrice = item.quantity * item.product.price;
  const discount = item.product.originalPrice ? item.product.originalPrice - item.product.price : 0;
  const discountPercentage = discount > 0 ? Math.round((discount / item.product.originalPrice!) * 100) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col sm:flex-row items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
    >
      <div className="relative w-24 h-24 mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-md"
        />
        {discountPercentage > 0 && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-tl-md rounded-br-md">
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center justify-center sm:justify-start">
          <Tag size={16} className="mr-1 text-blue-500" />
          {item.product.category}
        </p>
        <div className="flex items-center justify-center sm:justify-start mb-2">
          <p className="text-lg font-bold text-blue-600 mr-2">{formatPrice(item.product.price)}</p>
          {item.product.originalPrice && item.product.originalPrice > item.product.price && (
            <p className="text-sm text-gray-500 line-through">{formatPrice(item.product.originalPrice)}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center sm:items-end">
        <motion.div className="flex items-center bg-gray-100 rounded-full p-1 mb-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
            className="p-1 bg-white rounded-full shadow-sm text-blue-500 hover:bg-blue-50"
          >
            <Minus size={16} />
          </motion.button>
          <span className="mx-3 font-medium text-gray-700 w-8 text-center">{item.quantity}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
            className="p-1 bg-white rounded-full shadow-sm text-blue-500 hover:bg-blue-50"
          >
            <Plus size={16} />
          </motion.button>
        </motion.div>
        <p className="text-sm font-semibold text-blue-600 mb-2">
          Total: {formatPrice(totalPrice)}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => removeFromCart(item.product.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 flex items-center"
        >
          <Trash2 size={16} className="mr-1" />
          Eliminar
        </motion.button>
      </div>
    </motion.div>
  );
}