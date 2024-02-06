"use client";
// pages/tecnologia.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../../MainPage/Navbar";
import Footer from "../../../MainPage/Footer";
import Filter from "../../Filter";
import { CartProvider } from "../../CartContext";
import Cards from "../../Cards";

export default function TecnologiaPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const pageTitle = "Computadores";
  const handleFilterClick = (filterName: string | null) => {
    setSelectedFilter(filterName);
  };
  // Aquí podrías obtener los productos de tecnología, ya sea de una API, base de datos o definirlos directamente
  const tecnologiaSubCategories = [
    { name: "Monitores", href: "#" },
    { name: "Audífonos", href: "#" },
    { name: "Computadores", href: "#" },
    { name: "Accesorios", href: "#" },
  ];

  const tecnologiaProducts = [
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
                subCategories={tecnologiaSubCategories}
              >
                {/* Cards ahora recibe la categoría y los productos de tecnología */}
                <Cards
                  selectedFilter={selectedFilter}
                  products={tecnologiaProducts}
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
