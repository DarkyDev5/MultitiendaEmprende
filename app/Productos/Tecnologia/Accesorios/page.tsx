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

const accesoriosProducts = [
  {
    id: "3",
    name: "Acer Hub USB C, divisor USB C a HDMI",
    price: 75.55,
    image: "/tecnologia/AcerHub.jpg",
    rating: 5,
    filter: "Accesorios",
  },

  {
    id: "4",
    name: "[Certificado Apple MFi] Paquete de 6 cargadores de iPhone (3/3/6/6/6/10 pies)",
    price: 41.904,
    image: "/tecnologia/CablesCargadores.jpg",
    rating: 5,
    filter: "Accesorios",
  },

  {
    id: "8",
    name: "UGREEN Revodok USB C Hub 5 en 1 ",
    price: 79.99,
    image: "/tecnologia/USBHUB.jpg",
    rating: 5,
    filter: "Accesorios",
  },

  {
    id: "11",
    name: "Spray limpiador de pantalla (16 onzas)",
    price: 47.99,
    image: "/tecnologia/limpiadorpantalla.jpg",
    rating: 5,
    filter: "Accesorios",
  },

  // Otros productos de tecnología...
];


export default function TecnologiaPage() {
  const {
    data: filteredProducts,
    filterData,
    sortData,
  } = useFilter(accesoriosProducts);

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
