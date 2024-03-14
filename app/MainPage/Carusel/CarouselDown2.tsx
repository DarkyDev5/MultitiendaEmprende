import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselContent = [
    {
      title: "GANANDO EL JUEGO",
      paragraph: '" Nunca veo el fracaso como un fracaso, sino solo como el juego que debo jugar y ganar "',
      subtitle: "Tom Hopkins ",
    },
    {
      title: "ATRAYENDO ÉXITO",
      paragraph: '" Conviértete en la persona que atraiga los resultados que buscas "',
      subtitle: "Jim Cathcart",
    },
    {
      title: "LOGRA TUS SUEÑOS",
      paragraph: '" Puedes lograr lo que quieras en la vida con disciplina, imaginación y la confianza de saber que todo es posible "',
      subtitle: "Carolina Herrera",
    },
  ];

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? carouselContent.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % carouselContent.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % carouselContent.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, carouselContent.length]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto py-16 px-4 relative">
        <div className="relative text-center mb-8">
          <h1 className="text-3xl font-bold">{carouselContent[currentIndex].title}</h1>
          <p className="text-lg font-medium my-4">{carouselContent[currentIndex].paragraph}</p>
          <h3 className="text-md font-thin">{carouselContent[currentIndex].subtitle}</h3>
        </div>

        <BsChevronCompactLeft onClick={goToPrevious} className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-20" size={40} />
        <BsChevronCompactRight onClick={goToNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-20" size={40} />
      </div>

      <div className="relative w-full h-[800px]">
        <Image src="/mujercorriendo.jpg" alt="Imagen de fondo completa" layout="fill" objectFit="cover" quality={100} />
      </div>
    </>
  );
};

export default CarouselComponent;
