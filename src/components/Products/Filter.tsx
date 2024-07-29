'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface FilterProps {
  category: string;
  subcategory?: string;
  onSortChange: (sortBy: string) => void;
  onPriceFilter: (minPrice: string, maxPrice: string) => void;
}

export const Filter: React.FC<FilterProps> = ({ category, subcategory, onSortChange, onPriceFilter }) => {
  const [sortBy, setSortBy] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false);

  const handleSortClick = (filter: string) => {
    setSortBy(filter);
    onSortChange(filter);
  };

  const handleFilterClick = () => {
    onPriceFilter(minPrice, maxPrice);
    setIsPriceFilterActive(true);
  };

  const clearPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    onPriceFilter('', '');
    setIsPriceFilterActive(false);
  };

  return (
    <div className="w-full md:w-64 bg-white shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">{category}</h1>
      {subcategory && <h2 className="text-xl font-semibold text-blue-600 mb-4">{subcategory}</h2>}
      
      <div className="space-y-2">
        <button 
          onClick={() => handleSortClick('rating')} 
          className={clsx('w-full text-left p-2 rounded text-blue-600 hover:bg-blue-50 transition-colors duration-300', 
            sortBy === 'rating' ? 'font-semibold' : 'font-normal')}
        >
          Mejor Calificados
        </button>
        <button 
          onClick={() => handleSortClick('newest')} 
          className={clsx('w-full text-left p-2 rounded text-blue-600 hover:bg-blue-50 transition-colors duration-300', 
            sortBy === 'newest' ? 'font-semibold' : 'font-normal')}
        >
          Más Recientes
        </button>
        <button 
          onClick={() => handleSortClick('priceLowToHigh')} 
          className={clsx('w-full text-left p-2 rounded text-blue-600 hover:bg-blue-50 transition-colors duration-300', 
            sortBy === 'priceLowToHigh' ? 'font-semibold' : 'font-normal')}
        >
          Precio: Bajo a Alto
        </button>
        <button 
          onClick={() => handleSortClick('priceHighToLow')} 
          className={clsx('w-full text-left p-2 rounded text-blue-600 hover:bg-blue-50 transition-colors duration-300', 
            sortBy === 'priceHighToLow' ? 'font-semibold' : 'font-normal')}
        >
          Precio: Alto a Bajo
        </button>
      </div>
  
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Precio:</label>
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Mín" 
            value={minPrice} 
            onChange={e => setMinPrice(e.target.value)} 
            className="p-2 border border-gray-300 rounded w-full text-sm"
          />
          <input 
            type="text" 
            placeholder="Máx" 
            value={maxPrice} 
            onChange={e => setMaxPrice(e.target.value)} 
            className="p-2 border border-gray-300 rounded w-full text-sm"
          />
        </div>
        <button 
          onClick={handleFilterClick} 
          className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded text-sm hover:bg-blue-700 transition-colors duration-300"
        >
          Aplicar Filtro
        </button>
        {isPriceFilterActive && (
          <button 
            onClick={clearPriceFilter} 
            className="mt-2 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded text-sm hover:bg-gray-300 transition-colors duration-300"
          >
            Limpiar Filtro
          </button>
        )}
      </div>
    </div>
  );
};

export default Filter;