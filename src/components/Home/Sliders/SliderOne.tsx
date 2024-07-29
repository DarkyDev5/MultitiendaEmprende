// app/components/SliderOne.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/Slider/slide-1.png",
    route: "/Productos/Tecnologia",
    title: "Tecnología de Vanguardia",
    description: "Descubre los últimos avances en tecnología para tu hogar y oficina."
  },
  {
    image: "/Slider/slide-2.png",
    route: "/Productos/Belleza",
    title: "Belleza y Cuidado Personal",
    description: "Productos premium para realzar tu belleza natural."
  },
  {
    image: "/Slider/slide-3.png",
    route: "/Productos/Cocina",
    title: "Innovación en la Cocina",
    description: "Transforma tu cocina con nuestros electrodomésticos de última generación."
  },
  {
    image: "/Slider/slide-4.png",
    route: "/Productos/Belleza",
    title: "Estilo y Confort",
    description: "Eleva tu estilo de vida con nuestros productos de lujo."
  },
];
export default function SliderOne() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => 
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-gray-900">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-12 lg:p-16 xl:p-24">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg lg:max-w-xl xl:max-w-2xl text-white"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3">
            {slides[currentIndex].title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 text-gray-300">
            {slides[currentIndex].description}
          </p>
          <Link href={slides[currentIndex].route}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-6 py-2 lg:px-8 lg:py-3 rounded-full font-semibold text-base lg:text-lg hover:bg-opacity-90 transition duration-300"
            >
              Explorar Ahora
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}