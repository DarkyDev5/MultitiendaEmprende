"use client";
// pages/tecnologia.tsx
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

export default function TecnologiaPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const pageTitle = "Monitores";
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
              {/* ...resto de tu código */}
              <Filter
                selectedFilter={selectedFilter}
                onFilterClick={handleFilterClick}
                pageTitle={pageTitle}
                subCategories={tecnologiaSubCategories}
              >
                <Cards
                  selectedFilter={selectedFilter}
                  products={tecnologiaProducts}
                />
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
