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
  const pageTitle = "Tecnologia";
  const handleFilterClick = (filterName: string | null) => {
    setSelectedFilter(filterName);
  };
  // Aquí podrías obtener los productos de tecnología, ya sea de una API, base de datos o definirlos directamente
  const accesoriosSubCategories = [
    { name: "Monitores", href: "#" },
    { name: "Audífonos", href: "#" },
    { name: "Computadores", href: "#" },
    { name: "Accesorios", href: "#" },
  ];

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
                subCategories={accesoriosSubCategories}
              >
                {/* Cards ahora recibe la categoría y los productos de tecnología */}
                <Cards
                  selectedFilter={selectedFilter}
                  products={accesoriosProducts}
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
