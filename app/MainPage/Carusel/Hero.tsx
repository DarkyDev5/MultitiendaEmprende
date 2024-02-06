"use client"

// Importa la librería 'next/image'
import Image from 'next/image';
import { useState } from 'react';

const Hero = () => {
  const products = [
    {
      name: 'Bar Stool',
      image: '/Mini_PC.png',  // Asegúrate de tener la imagen en la carpeta /public/Mi_PC_png
      description: 'You just want to be comfortable sitting in a bar stool—you want to be comfortable shimmying it up to the bar, closer to your lover, or back slightly to include a third person in the conversation.',
    },
    {
      name: 'Wireless Headphones',
      image: '/Audifonos.png',
      description: 'Immerse yourself in the world of music with our premium wireless headphones. Experience crystal-clear sound and comfortable design.',
    },
    {
      name: 'Product 3',
      image: '/Audifonos.png',
      description: 'Highlight the features and benefits of your amazing product. Convince customers why they need it.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <div className="lg:p-10 md:p-6 p-4 bg-white dark:bg-gray-900">
        <div className="flex md:flex-row flex-col">
          {/* Flecha izquierda */}
          <div className="hidden md:flex items-center">
            <button
              onClick={goPrev}
              aria-label="slide back"
              className="focus:outline-none focus:ring-2 focus:ring-gray-800 hover:bg-gray-100"
            >
              <svg
                className="w-10 h-10 lg:w-16 lg:h-16"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 16L24 32L40 48"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* Carrusel de imágenes */}
          <div className="md:w-1/2 h-96 overflow-hidden">
            {/* Utiliza el componente Image de Next.js */}
            <Image
              src={currentProduct.image}
              alt={`Slide ${currentIndex + 1}`}
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Flecha derecha */}
          <div className="hidden md:flex items-center">
            <button
              onClick={goNext}
              aria-label="slide forward"
              className="focus:outline-none focus:ring-2 focus:ring-gray-800 hover:bg-gray-100"
            >
              <svg
                className="w-10 h-10 lg:w-16 lg:h-16"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 16L40 32L24 48"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {/* Información del producto */}
          <div className="md:w-1/2 bg-gray-50 px-4 md:py-20 py-6 md:px-6 lg:py-24">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">{currentProduct.name}</h1>
            <p className="text-base leading-normal text-gray-600 dark:text-white mt-2">
              {currentProduct.description}
            </p>
            <div className="flex items-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 mt-8 md:mt-16">
              <button className="w-full md:w-3/5 border border-gray-800 text-base font-medium leading-none text-white uppercase py-6 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-gray-700">Add to Cart</button>
              <button className="w-full md:w-2/5 border border-gray-800 text-base font-medium leading-none text-gray-800 dark:text-white uppercase py-6 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-transparent dark:border-white dark:text-white focus:ring-gray-800 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-800 ">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;





