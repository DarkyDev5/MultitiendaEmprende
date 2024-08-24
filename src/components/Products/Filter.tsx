'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '@/src/types/product';
import { formatPrice } from '@/src/utils/formatUtils';

interface FilterProps {
  category: string;
  subcategory?: string;
  onSortChange: (newSortBy: string) => void;
  onPriceFilter: (min: string, max: string) => void;
}

const Filter = ({
  category,
  subcategory,
  onSortChange,
  onPriceFilter
}: FilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]); 
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>(subcategory);
  const [sortBy, setSortBy] = useState<string>('default');
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const sortOptions = [
    { id: 'default', label: 'Relevancia' },
    { id: 'priceHighToLow', label: 'Precio: Mayor a menor' },
    { id: 'priceLowToHigh', label: 'Precio: Menor a mayor' },
    { id: 'newest', label: 'Más recientes' },
    { id: 'rating', label: 'Mejor valorados' }
  ];

  useEffect(() => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  }, [category, subcategory]);


  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = Number(event.target.value);
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = newValue;
    setPriceRange(newPriceRange);
    onPriceFilter(newPriceRange[0].toString(), newPriceRange[1].toString());
  };

  const handleCategoryChange = (newCategory: string, newSubcategory?: string) => {
    setSelectedCategory(newCategory);
    setSelectedSubcategory(newSubcategory);
    // Aquí podrías llamar a una función prop para notificar el cambio de categoría si es necesario
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    onSortChange(newSortBy);
  };

  const toggleCategory = (cat: string) => {
    setIsOpen(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-xl p-6 space-y-6 w-full lg:w-64"
    >
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filtros</h2>
        <p className="text-sm text-gray-600 mb-2">
          {category} {subcategory ? ` > ${subcategory}` : ''}
        </p>
        <ul className="space-y-2">
          {Object.entries(categories).map(([cat, subcats]) => (
            <li key={cat} className="border-b border-gray-200 pb-2">
              <button
                className="flex items-center justify-between w-full p-2 rounded-md transition-colors hover:bg-gray-100"
                onClick={() => toggleCategory(cat)}
              >
                <span className={selectedCategory === cat ? "font-semibold text-blue-600" : ""}>{cat}</span>
                {isOpen[cat] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {isOpen[cat] && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-4 mt-1 space-y-1"
                  >
                    {subcats.map((subcat) => (
                      <motion.li key={subcat}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <button
                          className={`w-full text-left p-1 text-sm rounded-md transition-colors ${
                            selectedSubcategory === subcat ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleCategoryChange(cat, subcat)}
                        >
                          {subcat}
                        </button>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Ordenar por</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Rango de Precio</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Mínimo</span>
            <span className="text-sm text-gray-600">Máximo</span>
          </div>
          <div className="flex justify-between">
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-24 p-1 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="number"
              min={priceRange[0]}
              max="1000000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-24 p-1 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000000"
            step="10000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        onClick={() => {
          // Aquí podrías añadir una acción para aplicar todos los filtros
          console.log("Aplicar filtros");
        }}
      >
        Aplicar Filtros
      </motion.button>
    </motion.div>
  );
};

export default Filter;