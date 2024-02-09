"use client";
// pages/tecnologia.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../MainPage/Navbar";
import Footer from "../../../MainPage/Footer";
import Filter from "../../Filter";
import Cards from "../../Cards";
import { CartProvider } from "../../CartContext";
import Cart from "../../Cart";
import { useCart } from "../../CartContext";
import { useFilter } from "../../Hook/useFilter";


const MonitoresProducts = [
  {
    id: "2",
    name: "Sceptre IPS - Monitor de 22 pulgadas 1080p 75Hz",
    price: 354.5,
    image: "/Monitor1.png",
    rating: 5,
    filter: "Monitores",
  },

  {
    id: "5",
    name: "Sceptre LED - Monitor de 22 pulgadas 1080p 75Hz",
    price: 75.55,
    image: "/tecnologia/MonitorLED.jpg",
    rating: 5,
    filter: "Monitores",
  },

  // Otros productos de tecnología...
];

export default function MonitoresPage() {
  const {
    data: filteredProducts,
    filterData,
    sortData,
  } = useFilter(MonitoresProducts);


 

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
                <Cards products={filteredProducts} selectedFilter={null} />
              </Filter>
              <Footer />
            </main>
            {/* Asegúrate de que el Cart se renderice aquí y no dentro de Cards si quieres que esté por encima de todo */}
          </div>
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
}
