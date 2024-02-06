"use client";
// pages/cocina.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../MainPage/Navbar";
import Footer from "../../MainPage/Footer";
import Filter from "../Filter";
import Cards from "../Cards";
import { CartProvider } from "../CartContext";

export default function CocinaPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const pageTitle = "Cocina";

  const handleFilterClick = (filterName: string | null) => {
    setSelectedFilter(filterName);
  };

  // Subcategorías específicas para la página de cocina
  const cocinaSubCategories = [
    { name: "Maquinas de Obleas", href: "#" },
    { name: "Electrodomésticos", href: "#" },
    { name: "Licuadoras", href: "#" },
    { name: "Accesorios", href: "#" },
  ];

  // Productos de cocina
  const cocinaProducts = [
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
      name: "Maquinas De Obleas Lisa 16CM",
      price: 200.0,
      image: "/Cocina/MO lisa 16 cm.png",
      rating: 5,
      filter: "Electrodomésticos",
    },
    // Otros productos de cocina...
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
                subCategories={cocinaSubCategories}
              >
                {/* Cards ahora recibe la categoría y los productos de cocina */}
                <Cards
                  selectedFilter={selectedFilter}
                  products={cocinaProducts}
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
