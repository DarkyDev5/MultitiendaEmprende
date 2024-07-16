
"use client"
// pages/cocina.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../MainPage/Navbar";
import Footer from "../../../MainPage/Footer";
import Filter from "../../Filter";
import Cards from "../../Cards";
import { CartProvider } from "../../CartContext";
import { useFilter } from "../../Hook/useFilter";

const maquinasObleasProducts = [
  {
    id: "1",
    name: "Maquinas De Obleas Lisa 16CM",
    price: 150.0,
    image: "/Cocina/MO lisa 16 cm.png",
    rating: 4,
    filter: "Maquinas de Obleas",
  },
  {
    id: "2",
    name: "Maquinas De",
    price: 200.0,
    image: "/Cocina/MO lisa 16 cm.png",
    rating: 5,
    filter: "Electrodomésticos",
  },
  // Otros productos de cocina...
];

export default function MaquinasObleasPage() {
  const {
    data: filteredProducts,
    filterData,
    sortData,
  } = useFilter(maquinasObleasProducts);


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
          <Filter
                pageTitle="Tecnologia"
                onFilter={filterData}
                onSort={sortData}
              >
                <Cards products={filteredProducts} category="cocina" />
              </Filter>
            <Footer />
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
   </CartProvider>
   
  );
}
