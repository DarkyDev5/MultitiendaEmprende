'use client';

import React from "react";
import Image from 'next/image';
import Link from "next/link";
import { useCart } from "./CartContext";

interface CartProps {
  onClose: () => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function Cart({ onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Carrito de Compra ({cart.length})</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Cerrar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center space-x-4 py-4 border-b border-gray-200">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image 
                  src={item.product.image} 
                  alt={item.product.name} 
                  layout="fill" 
                  objectFit="cover" 
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-900">{item.product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">Cantidad: {item.quantity}</p>
                <div className="mt-2 flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="text-gray-500 hover:text-gray-600"
                  >
                    -
                  </button>
                  <span className="mx-2 text-gray-700">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-gray-900">{formatCurrency(item.product.price * item.quantity)}</p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4 space-y-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{formatCurrency(subtotal)}</p>
          </div>
          <p className="text-sm text-gray-500">El envío se calcula al cotizar.</p>
          <Link 
            href="/Cotize" 
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Formulario de Cotización
          </Link>
          <div className="text-center">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              onClick={onClose}
            >
              Seguir Comprando
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;