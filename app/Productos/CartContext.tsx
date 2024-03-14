"use client"
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { CartItem, Product } from "./types";

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    emptyCart: () => void;
    updateQuantity: (productId: string, quantity: number) => void; 
}

export const CartContext = createContext<CartContextType>(null!);

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      console.log('Recuperando el carrito del localStorage:', JSON.parse(storedCart));
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      let updatedCart;
      if (existingIndex !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
        };
        console.log('Producto actualizado en el carrito:', updatedCart[existingIndex]);
      } else {
        console.log('Producto añadido al carrito:', { product, quantity: 1 });
        updatedCart = [...prevCart, { product, quantity: 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.product.id !== productId);
      console.log('Producto eliminado del carrito:', productId);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const emptyCart = () => {
    console.log('Carrito vaciado');
    setCart([]);
    localStorage.removeItem('cartItems');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === productId);
      let updatedCart;
      if (existingIndex !== -1) {
        updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: quantity,
        };
        console.log('Cantidad actualizada en el carrito:', updatedCart[existingIndex]);
      } else {
        updatedCart = prevCart;
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart, updateQuantity  }}>
      {children}
    </CartContext.Provider>
  );
};

