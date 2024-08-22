'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

interface FullDescriptionProps {
  description: string | string[];
}

const formatDescription = (description: string | string[]): string => {
  const text = Array.isArray(description) ? description.join('\n') : description;
  const points = text.split('\n').filter(point => point.trim());

  return points.map((point) => {
    // Eliminar el guión inicial si existe
    const cleanPoint = point.trim().replace(/^-\s*/, '');
    
    // Aplicar formato de negrita
    const formattedPoint = cleanPoint.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
    
    return `<p class="mt-2 flex items-start">
      <span class="text-blue-500 mr-2">•</span>
      <span>${formattedPoint}</span>
    </p>`;
  }).join('');
};

export default function FullDescription({ description }: FullDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mt-6 border-t border-gray-200 pt-6">
      <motion.button
        className="flex items-center justify-between w-full text-left"
        onClick={toggleOpen}
        initial={false}
        animate={{ backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-900">Descripción detallada</h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDownIcon className="h-6 w-6 text-blue-500" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-gray-700 space-y-2"
              dangerouslySetInnerHTML={{ __html: formatDescription(description) }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}