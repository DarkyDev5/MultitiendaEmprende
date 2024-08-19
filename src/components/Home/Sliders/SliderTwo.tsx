"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const entrepreneurshipItems = [
  {
    title: "Maquina de Obleas",
    description: "Maquinas de Obleas, de diferentes diseños.",
    price: "220.000 COP",
    image: "/slidetwo2.png" // Asegúrate de que esta ruta sea correcta
  },
  // Puedes agregar más items aquí
];

const EntrepreneurshipShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = (direction: number) => {
    setCurrentIndex((prev) => 
      (prev + direction + entrepreneurshipItems.length) % entrepreneurshipItems.length
    );
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-5xl font-bold text-center mb-12">
          Emprende con <span className="text-indigo-600">Innovación</span>
        </h1>
        <div className="relative flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="w-full md:w-3/5 relative">
            <div className="aspect-[16/9] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={entrepreneurshipItems[currentIndex].image}
                    alt={entrepreneurshipItems[currentIndex].title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full md:w-2/5 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">{entrepreneurshipItems[currentIndex].title}</h2>
                <p className="mb-6 text-gray-600">{entrepreneurshipItems[currentIndex].description}</p>
                <p className="text-2xl font-bold mb-6 text-indigo-600">{entrepreneurshipItems[currentIndex].price}</p>
                <div className="flex flex-col space-y-4">
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg">
                    Comprar Ahora
                  </button>
                  <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-50 transition duration-300">
                    Más Información
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeftIcon className="h-6 w-6 text-indigo-600" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all duration-300"
            aria-label="Siguiente"
          >
            <ChevronRightIcon className="h-6 w-6 text-indigo-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneurshipShowcase;