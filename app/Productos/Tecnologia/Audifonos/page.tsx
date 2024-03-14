"use client";
// pages/tecnologia.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../MainPage/Navbar";
import Footer from "../../../MainPage/Footer";
import Filter from "../../Filter";
import Cards from "../../Cards";
import { CartProvider } from "../../CartContext";
import { useFilter } from "../../Hook/useFilter";

const audífonosProducts = [
  {
    id: "1",
    name: "CCA CRA - Auriculares para monitor intraural IEM",
    price: 79.9,
    image: "/Audifonos.png",
    rating: 5,
    filter: "Audífonos",
  },

  {
    id: "7",
    name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
    price: 79.99,
    image: "/tecnologia/Audifonos2.jpg",
    rating: 5,
    filter: "Audífonos",
  },

  {
    id: "10",
    name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
    price: 79.99,
    image: "/tecnologia/Audifonos2.jpg",
    rating: 5,
    filter: "Audífonos",
  },

  {
    id: "12",
    name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
    price: 79.99,
    image: "/tecnologia/Audifonos2.jpg",
    rating: 5,
    filter: "Audífonos",
  },
  // Otros productos de tecnología...
];


export default function TecnologiaPage() {
  const {
    data: filteredProducts,
    filterData,
    sortData,
  } = useFilter(audífonosProducts);

  // Aquí podrías obtener los productos de tecnología, ya sea de una API, base de datos o definirlos directamente

  
  return (
    <CartProvider>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="relative">
            <Navbar />
            <main className="sandbox">
              {/* Usa Filter y coloca Cards como hijo */}
              <Filter
                pageTitle="Tecnologia"
                onFilter={filterData}
                onSort={sortData}
              >
                <Cards products={filteredProducts} category="tecnologia" />
              </Filter>
              <Footer />
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
}
