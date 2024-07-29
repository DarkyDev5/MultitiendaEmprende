// app/components/ProductShowcase.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const productos = [
  {
    nombre: 'Máquina de Obleas',
    imagen: '/imagenes/maquina-obleas.jpg',
    descripcion: 'Prepara deliciosas obleas caseras con nuestra máquina especializada.',
    precio: '299.900'
  },
  {
    nombre: 'Kit de Insumos para Obleas',
    imagen: '/imagenes/kit-insumos-obleas.jpg',
    descripcion: 'Todo lo necesario para iniciar tu negocio de obleas.',
    precio: '149.900'
  },
  {
    nombre: 'Curso Online de Elaboración de Obleas',
    imagen: '/imagenes/curso-obleas.jpg',
    descripcion: 'Aprende a crear obleas gourmet y gestiona tu negocio.',
    precio: '199.900'
  }
];

export default function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % productos.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (direction: number) => {
    setCurrentIndex((prev) => (prev + direction + productos.length) % productos.length);
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-indigo-900">
          Emprende con <span className="text-indigo-600">Obleas</span>
        </h1>
        <div className="relative flex flex-col md:flex-row items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 relative h-96 mb-8 md:mb-0"
            >
              <Image
                src={productos[currentIndex].imagen}
                alt={productos[currentIndex].nombre}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="md:w-1/2 md:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-semibold mb-4 text-indigo-900">{productos[currentIndex].nombre}</h2>
                <p className="mb-6 text-gray-700">{productos[currentIndex].descripcion}</p>
                <p className="text-2xl font-bold mb-6 text-indigo-600">${productos[currentIndex].precio} COP</p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg"
                  >
                    Comprar Ahora
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition duration-300"
                  >
                    Más Información
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {[ChevronLeftIcon, ChevronRightIcon].map((Icon, index) => (
            <button
              key={index}
              onClick={() => navigate(index === 0 ? -1 : 1)}
              className={`absolute top-1/2 -translate-y-1/2 ${index === 0 ? 'left-0' : 'right-0'} 
                         bg-white p-2 rounded-full shadow-lg hover:bg-indigo-100 transition-all duration-300`}
              aria-label={index === 0 ? "Producto anterior" : "Siguiente producto"}
            >
              <Icon className="h-6 w-6 text-indigo-600" />
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          {productos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-indigo-600 scale-125' : 'bg-indigo-200 hover:bg-indigo-300'
              }`}
              aria-label={`Ir al producto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}