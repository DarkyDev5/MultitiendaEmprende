"use client";
// pages/tecnologia.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../MainPage/Navbar";
import Footer from "../../../MainPage/Footer";
import Filter from "../../Filter";
import { CartProvider } from "../../CartContext";
import Cards from "../../Cards";
import { useFilter } from "../../Hook/useFilter";


const computadoresProducts = [
  {
    id: "6",
    name: " TRIGKEY Mini PC Ryzen 7 W11 Pro Desktop",
    price: 1295400,
    image: "/Mini_PC.png",
    rating: 5,
    filter: "Computadores",
  },

  {
    id: "9",
    name: "Beelink Mini PC S12 Pro",
    price: 79990,
    image: "/tecnologia/Mini_PCINTEL.jpg",
    rating: 5,
    filter: "Computadores",
  },

  // Otros productos de tecnología...
];

export default function TecnologiaPage() {
  const {
    data: filteredProducts,
    filterData,
    sortData,
  } = useFilter(computadoresProducts);

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
                <Cards products={filteredProducts} selectedFilter={null} />
              </Filter>
              <Footer />
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
}
