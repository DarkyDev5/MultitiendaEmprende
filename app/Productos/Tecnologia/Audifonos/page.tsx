"use client";
// pages/tecnologia.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../MainPage/Navbar";
import Footer from "../../../MainPage/Footer";
import Filter from "../../Filter";
import Cards from "../../Cards";
import { CartProvider } from "../../CartContext";

export default function TecnologiaPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const pageTitle = "Audífonos";
  const handleFilterClick = (filterName: string | null) => {
    setSelectedFilter(filterName);
  };
  // Aquí podrías obtener los productos de tecnología, ya sea de una API, base de datos o definirlos directamente
  const audífonosSubCategories = [
    { name: "Monitores", href: "#" },
    { name: "Audífonos", href: "#" },
    { name: "Computadores", href: "#" },
    { name: "Audífonos", href: "#" },
  ];

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
                selectedFilter={selectedFilter}
                onFilterClick={handleFilterClick}
                pageTitle={pageTitle}
                subCategories={audífonosSubCategories}
              >
                {/* Cards ahora recibe la categoría y los productos de tecnología */}
                <Cards
                  selectedFilter={selectedFilter}
                  products={audífonosProducts}
                />
              </Filter>
              <Footer />
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </CartProvider>
  );
}
