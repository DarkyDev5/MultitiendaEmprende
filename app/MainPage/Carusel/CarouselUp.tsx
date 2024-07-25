import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { image: "/Slider/slide-1.png", route: "/Productos/Tecnologia" },
  { image: "/Slider/slide-2.png", route: "/Productos/Belleza" },
  { image: "/Slider/slide-3.png", route: "/Productos/Cocina" },
  { image: "/Slider/slide-4.png", route: "/Productos/Belleza" },
];

const CarouselUp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const updateIndex = useCallback((newIndex: number) => {
    setCurrentIndex((prevIndex) => 
      newIndex < 0 ? slides.length - 1 : newIndex >= slides.length ? 0 : newIndex
    );
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => updateIndex(currentIndex + 1), 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, updateIndex]);

  return (
    <div className="relative w-full bg-cover bg-center py-8 sm:py-12 md:py-16 lg:py-20"
         style={{ backgroundImage: "url('/Fondonav.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <Link href={slides[currentIndex].route} passHref>
              <div
                className="relative w-full aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src={slides[currentIndex].image}
                  alt="Imagen del carrusel"
                  layout="fill"
                  objectFit="contain"
                  className={`transition-transform duration-500 ${isHovered ? "scale-105" : "scale-100"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() => updateIndex(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
        >
          <BsChevronCompactLeft size={24} />
        </button>
        <button
          onClick={() => updateIndex(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all z-10"
        >
          <BsChevronCompactRight size={24} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white scale-125" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselUp;