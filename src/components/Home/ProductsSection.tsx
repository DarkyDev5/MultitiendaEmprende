// app/components/CategoryCards.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Card {
  title: string;
  imageSrc: string;
  link: string;
}

const cardData: Card[] = [
  { title: 'Monitores', imageSrc: '/SliderDown/monitores.png', link: '/Productos/Tecnologia/Monitores' },
  { title: 'Máquinas', imageSrc: '/SliderDown/maquinas.png', link: '/categoria/maquinas' },
  { title: 'Cremas', imageSrc: '/SliderDown/cremas.png', link: '/categoria/cremas' },
  { title: 'Proteínas', imageSrc: '/SliderDown/proteinas.png', link: '/categoria/proteinas' },
];

const CardComponent: React.FC<{ card: Card }> = ({ card }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative w-full sm:w-64 h-80 m-4 rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
  >
    <Link href={card.link} passHref>
      <div className="absolute inset-0">
        <Image
          src={card.imageSrc}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
        <p className="text-sm">Explorar productos</p>
      </div>
    </Link>
  </motion.div>
);

export default function ProductsSection() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card) => (
            <CardComponent key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}