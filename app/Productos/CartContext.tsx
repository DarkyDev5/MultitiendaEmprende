"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { CartItem, Product } from "./Cards";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    emptyCart: () => void;  // Agrega esta línea
  }

export const CartContext = createContext<CartContextType>(null!);

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } else {
      return [];
    }
  }); 

  
 
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex !== -1) {
        // Clona el array y actualiza el elemento existente
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        // Añade un nuevo elemento al array
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const emptyCart = () => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartItems');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};