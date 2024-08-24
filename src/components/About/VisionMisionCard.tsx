"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Target, Heart, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const cn = (...inputs: (string | undefined)[]) => {
  return twMerge(clsx(inputs));
};

interface SectionProps {
  title: string;
  icon: React.ElementType;
  content: string;
  index: number;
}

const Section = ({ title, icon: Icon, content, index }: SectionProps) => {
  return (
    <MotionCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.2 }}
      className={cn(
        "w-full bg-white border-2 border-blue-100 text-gray-800",
        "shadow-lg hover:shadow-2xl transition-all duration-300",
        "rounded-2xl overflow-hidden group"
      )}
    >
      <CardHeader className="flex flex-col items-center pb-4 bg-blue-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "p-4 rounded-full bg-blue-500 group-hover:bg-blue-600",
            "transition-colors duration-300 shadow-md"
          )}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>
        <CardTitle className="text-2xl font-bold mt-4 text-blue-700">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center px-6 py-6">
        <AnimatePresence>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="text-lg leading-relaxed text-gray-700"
          >
            {content.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </motion.p>
        </AnimatePresence>
      </CardContent>
    </MotionCard>
  );
};

interface Section {
  title: string;
  icon: React.ElementType;
  content: string;
}

export default function TiendaOnlineInfo2024() {
  const sections: Section[] = [
    { title: "Visión", icon: Target, content: "Ser la tienda online líder, ofreciendo una experiencia de compra excepcional que inspire y satisfaga a nuestros clientes en cada clic." },
    { title: "Misión", icon: ShoppingBag, content: "Proporcionar productos de alta calidad y un servicio excepcional, creando una plataforma online intuitiva y segura que haga de cada compra una experiencia gratificante." },
    { title: "Valores", icon: Heart, content: "• Satisfacción del cliente\n• Calidad e innovación\n• Transparencia y confianza\n• Responsabilidad ambiental\n• Mejora continua" }
  ];

  const handleExplore = () => {
    // Aquí puedes añadir la lógica para navegar a la tienda o mostrar más información
    console.log("Explorando la tienda...");
    // Por ejemplo, podrías usar router.push('/tienda') si estás usando Next.js
  };

  return (
    <div className={cn(
      "min-h-screen bg-white",
      "flex flex-col items-center justify-center p-4 sm:p-8 relative"
    )}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-16 tracking-tight z-10 text-center"
      >
        Nuestra Esencia
      </motion.h1>
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full z-10">
        {sections.map((section, index) => (
          <Section key={section.title} {...section} index={index} />
        ))}
      </div>
     
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={cn(
          "mt-16 px-10 py-4 bg-blue-600 text-white text-xl rounded-full font-semibold",
          "hover:bg-blue-700 transition-all duration-300",
          "shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50",
          "flex items-center space-x-2"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExplore}
      >
        <span>Explora Nuestra Tienda</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>
    </div>
  );
}