"use client";
// pages/tecnologia.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../MainPage/Navbar";
import Footer from "../../MainPage/Footer";
import Filter from "../Filter";
import Cards from "../Cards";

export default function TecnologiaPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const pageTitle = "Tecnologia"; 
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
      id: "1",
      name: "CCA CRA - Auriculares para monitor intraural IEM",
      price: 79900,
      image: "/Audifonos.png",
      rating: 5,
      filter: "Audífonos",
    },

    {
      id: "2",
      name: "Sceptre IPS - Monitor de 22 pulgadas 1080p 75Hz",
      price: 354500,
      image: "/Monitor1.png",
      rating: 5,
      filter: "Monitores",
    },


    {
      id: "3",
      name: "Acer Hub USB C, divisor USB C a HDMI",
      price: 75550,
      image: "/tecnologia/AcerHub.jpg",
      rating: 5,
      filter: "Accesorios",
    },

    {
      id: "4",
      name: "[Certificado Apple MFi] Paquete de 6 cargadores de iPhone (3/3/6/6/6/10 pies)",
      price: 41904,
      image: "/tecnologia/CablesCargadores.jpg",
      rating: 5,
      filter: "Accesorios",
    },

    {
      id: "5",
      name: "Sceptre LED - Monitor de 22 pulgadas 1080p 75Hz",
      price: 75550,
      image: "/tecnologia/MonitorLED.jpg",
      rating: 5,
      filter: "Monitores",
    },

    {
      id: "6",
      name: " TRIGKEY Mini PC Ryzen 7 W11 Pro Desktop",
      price: 1295400,
      image: "/Mini_PC.png",
      rating: 5,
      filter: "Computadores",
    },


    {
      id: "7",
      name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
      price: 79990,
      image: "/tecnologia/Audifonos2.jpg",
      rating: 5,
      filter: "Audífonos",
    },

    {
      id: "8",
      name: "UGREEN Revodok USB C Hub 5 en 1 ",
      price: 79990,
      image: "/tecnologia/USBHUB.jpg",
      rating: 5,
      filter: "Accesorios",
    },

    {
      id: "9",
      name: "Beelink Mini PC S12 Pro",
      price: 79990,
      image: "/tecnologia/Mini_PCINTEL.jpg",
      rating: 5,
      filter: "Computadores",
    },

    {
      id: "10",
      name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
      price: 79990,
      image: "/tecnologia/Audifonos2.jpg",
      rating: 5,
      filter: "Audífonos",
    },

    {
      id: "11",
      name: "Spray limpiador de pantalla (16 onzas)",
      price: 47990,
      image: "/tecnologia/limpiadorpantalla.jpg",
      rating: 5,
      filter: "Audífonos",
    },

    {
      id: "12",
      name: "Auriculares inalámbricos Bluetooth V5.3, reproducción de 50 horas",
      price: 79990,
      image: "/tecnologia/Audifonos2.jpg",
      rating: 5,
      filter: "Audífonos",
    },
    // Otros productos de tecnología...
  ];

  return (
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
            <Filter selectedFilter={selectedFilter} onFilterClick={handleFilterClick} pageTitle={pageTitle} subCategories={tecnologiaSubCategories}>
              {/* Cards ahora recibe la categoría y los productos de tecnología */}
              <Cards selectedFilter={selectedFilter} products={tecnologiaProducts} />
            </Filter>
            <Footer />
          </main>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
