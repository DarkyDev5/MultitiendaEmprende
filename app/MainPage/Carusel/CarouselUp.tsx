import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/app.module.css";

const slides = [
  "/Slider/slide-1.png",
  "/Slider/slide-2.png",
  "/Slider/slide-3.png",
  "/Slider/slide-4.png",
];
const slideRoutes = [
  "/Productos/Tecnologia",
  "/Productos/Belleza",
  "/Productos/Cocina",
  "/Productos/Belleza",
];

const CarouselUp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = slides.length - 1;
    } else if (newIndex >= slides.length) {
      newIndex = 0;
    }
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(() => updateIndex(currentIndex + 1), 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <AnimatePresence exitBeforeEnter={false} mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-image"
      >
        <div
          className="flex justify-center items-center"
          style={{
            backgroundImage: "url('/Fondonav.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: '100vh'
          }}
        >
        <div className="max-w-screen-2xl w-full mx-auto py-16 px-4 my-8">
            <Link href={slideRoutes[currentIndex]} passHref>
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src={slides[currentIndex]}
                  alt="Imagen del carrusel"
                  layout="responsive"
                  objectFit="cover"
                  className={`rounded-2xl duration-500 ${
                    isHovered ? "scale-105" : "scale-100"
                  }`}
                  width={80}
                  height={80}
                />
              </div>
            </Link>
            <BsChevronCompactLeft
              onClick={() => updateIndex(currentIndex - 1)}
              className="absolute top-[50%] left-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer z-10"
              size={30}
            />
            <BsChevronCompactRight
              onClick={() => updateIndex(currentIndex + 1)}
              className="absolute top-[50%] right-5 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer z-10"
              size={30}
            />

            <div className="flex top-4 justify-center py-2">
              {slides.map((_, slideIndex) => (
                <RxDotFilled
                  key={slideIndex}
                  onClick={() => setCurrentIndex(slideIndex)}
                  className="text-2xl cursor-pointer"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarouselUp;
