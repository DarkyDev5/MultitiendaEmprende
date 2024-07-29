// app/components/ProductCategories.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { id: 1, title: "Tecnología", image: "/mujercompu.jpeg", link: "/categorias/tecnologia" },
  { id: 2, title: "Hogar", image: "/cocinamujer.jpg", link: "/categorias/hogar" }
];

export default function CategoriesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold text-center mb-4 text-gray-800"
        >
          Nuestras Categorías
        </motion.h2>
        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="text-lg text-center mb-12 text-gray-600"
        >
          Descubre nuestra selección de productos
        </motion.p>
        
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: index % 2 === 0 ? 0 : 30 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              whileHover={{ scale: 1.05, y: index % 2 === 0 ? -10 : 20 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative w-full md:w-2/5 aspect-[4/5] shadow-lg rounded-lg overflow-hidden cursor-pointer"
            >
              <Link href={category.link}>
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                  priority={index === 0}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center p-6"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-white text-xl font-bold"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {category.title}
                  </motion.h3>
                </motion.div>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      Ver más
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}