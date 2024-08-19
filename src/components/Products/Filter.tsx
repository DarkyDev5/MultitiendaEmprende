'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterProps {
  category: string;
  subcategory?: string;
  onSortChange: (sortBy: string) => void;
  onPriceFilter: (minPrice: string, maxPrice: string) => void;
}

export default function Filter({ category, subcategory, onSortChange, onPriceFilter }: FilterProps) {
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const sortOptions = [
    { id: 'rating', label: 'Mejor Calificados', icon: '⭐' },
    { id: 'newest', label: 'Más Recientes', icon: '🆕' },
    { id: 'priceLowToHigh', label: 'Precio: Bajo a Alto', icon: '↗️' },
    { id: 'priceHighToLow', label: 'Precio: Alto a Bajo', icon: '↘️' },
  ];

  const handleSortClick = (filter: string) => {
    setSortBy(filter);
    onSortChange(filter);
    if (!activeFilters.includes('sort')) {
      setActiveFilters([...activeFilters, 'sort']);
    }
  };

  const handleFilterClick = () => {
    onPriceFilter(minPrice, maxPrice);
    if (!activeFilters.includes('price')) {
      setActiveFilters([...activeFilters, 'price']);
    }
  };

  const clearFilter = (filterType: string) => {
    if (filterType === 'sort') {
      setSortBy('default');
      onSortChange('default');
    } else if (filterType === 'price') {
      setMinPrice('');
      setMaxPrice('');
      onPriceFilter('', '');
    }
    setActiveFilters(activeFilters.filter(f => f !== filterType));
  };

  const formatName = (name: string) => decodeURIComponent(name).replace(/-/g, ' ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white shadow-lg rounded-xl p-4 space-y-4 sticky top-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{formatName(category)}</h1>
        {subcategory && <h2 className="text-lg font-medium text-gray-600 mt-1">{formatName(subcategory)}</h2>}
      </div>
      
      <AnimatePresence>
        {activeFilters.includes('sort') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-100 p-2 rounded-md flex justify-between items-center"
          >
            <span>Ordenando por: {sortOptions.find(o => o.id === sortBy)?.label}</span>
            <button onClick={() => clearFilter('sort')} className="text-blue-700 hover:text-blue-900">✖</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <h3 className="text-md font-semibold text-gray-700">Ordenar por:</h3>
        {sortOptions.map((option) => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSortClick(option.id)}
            className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 ${
              sortBy === option.id 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">{option.icon}</span>
            {option.label}
          </motion.button>
        ))}
      </div>
  
      <div className="space-y-4">
        <h3 className="text-md font-semibold text-gray-700">Rango de Precio:</h3>
        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Min" 
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input 
            type="text" 
            placeholder="Max" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFilterClick} 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Aplicar Filtro
        </motion.button>
      </div>

      <AnimatePresence>
        {activeFilters.includes('price') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-100 p-2 rounded-md flex justify-between items-center"
          >
            <span>Precio: ${minPrice} - ${maxPrice}</span>
            <button onClick={() => clearFilter('price')} className="text-blue-700 hover:text-blue-900">✖</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}