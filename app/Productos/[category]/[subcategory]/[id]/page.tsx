// pages/Productos/[id]/page.tsx
"use client"
import React, { useState } from 'react';
import ProductDetails from '../../../ProductDetails';
import Navbar from '../../../../MainPage/Navbar';
import { CartProvider, useCart } from '../../../CartContext';
import Cart from '../../../Cart'; // Asegúrate de importar tu componente Cart

export default function ProductPage() {


  return (
    
      <CartProvider>
        <Navbar/>
        <ProductDetails />
    
      </CartProvider>

  );
}
