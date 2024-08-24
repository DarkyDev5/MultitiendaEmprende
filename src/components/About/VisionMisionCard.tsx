"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { Target, ShoppingBag, Heart } from 'lucide-react';

const NuestraEsencia: React.FC = () => {
  const items = [
    {
      title: "Visión",
      description: "Ser la tienda online líder, ofreciendo una experiencia de compra excepcional que inspire y satisfaga a nuestros clientes en cada clic.",
      icon: Target,
      color: "bg-blue-600",
    },
    {
      title: "Misión",
      description: "Proporcionar productos de alta calidad y un servicio excepcional, creando una plataforma online intuitiva y segura que haga de cada compra una experiencia gratificante.",
      icon: ShoppingBag,
      color: "bg-green-600",
    },
    {
      title: "Valores",
      description: "• Satisfacción del cliente\n• Calidad e innovación\n• Transparencia y confianza\n• Responsabilidad ambiental\n• Mejora continua",
      icon: Heart,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
      <h1 className="text-4xl font-bold text-center text-black dark:text-white mb-10 lg:mb-0 lg:absolute lg:top-10">Nuestra Esencia</h1>
      {items.map((item, index) => (
        <Card key={index} title={item.title} icon={<item.icon className="w-10 h-10" />}>
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName={item.color}
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70 p-6 flex flex-col justify-center items-center text-white">
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            <p className="text-sm text-center">
              {item.description.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

const Card: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] overflow-hidden"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl text-black mt-4 font-bold group-hover/canvas-card:opacity-0 transition duration-200">
          {title}
        </h2>
      </div>
    </div>
  );
};

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default NuestraEsencia;