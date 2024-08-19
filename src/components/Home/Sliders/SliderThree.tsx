// app/components/InspirationCarousel.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const carouselContent = [
  {
    title: "GANANDO EL JUEGO",
    quote: "Nunca veo el fracaso como un fracaso, sino solo como el juego que debo jugar y ganar.",
    author: "Tom Hopkins",
  },
  {
    title: "ATRAYENDO ÉXITO",
    quote: "Conviértete en la persona que atraiga los resultados que buscas.",
    author: "Jim Cathcart",
  },
  {
    title: "LOGRA TUS SUEÑOS",
    quote: "Puedes lograr lo que quieras en la vida con disciplina, imaginación y la confianza de saber que todo es posible.",
    author: "Carolina Herrera",
  },
];

export default function InspirationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => 
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselContent.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (direction: number) => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + direction + carouselContent.length) % carouselContent.length
    );
  };

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-gray-900 text-white">
      <Image
        src="/mujercorriendo.jpg"
        alt="Fondo inspiracional"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {carouselContent[currentIndex].title}
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl italic mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {carouselContent[currentIndex].quote}
            </motion.p>
            <motion.p
              className="text-lg md:text-xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              - {carouselContent[currentIndex].author}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {[ChevronLeftIcon, ChevronRightIcon].map((Icon, index) => (
          <button
            key={index}
            onClick={() => navigate(index === 0 ? -1 : 1)}
            className={`absolute top-1/2 -translate-y-1/2 ${index === 0 ? 'left-4' : 'right-4'} 
                       bg-white bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition-all duration-300 
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50`}
            aria-label={index === 0 ? "Cita anterior" : "Siguiente cita"}
          >
            <Icon className="h-8 w-8 text-white" />
          </button>
        ))}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                         ${index === currentIndex ? "bg-white scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"}`}
              aria-label={`Ir a la cita ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}