// app/components/InteractiveProductSection.tsx
'use client'

import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import ProductList from './ProductList';
import { ProductData } from '@/types/product';

interface InteractiveProductSectionProps {
  category: string;
  subcategory?: string;
  initialProducts: ProductData[];
}

const InteractiveProductSection: React.FC<InteractiveProductSectionProps> = ({ 
  category, 
  subcategory, 
  initialProducts 
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    let filteredAndSortedProducts = [...initialProducts];

    // Aplicar filtro de precio
    if (priceRange.min !== '' || priceRange.max !== '') {
      filteredAndSortedProducts = filteredAndSortedProducts.filter(product => {
        const min = priceRange.min === '' ? 0 : parseInt(priceRange.min);
        const max = priceRange.max === '' ? Infinity : parseInt(priceRange.max);
        return product.price >= min && product.price <= max;
      });
    }

    // Aplicar ordenación
    switch (sortBy) {
      case 'priceLowToHigh':
        filteredAndSortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        filteredAndSortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredAndSortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Usamos el ID como aproximación para la novedad
        // Asumiendo que los IDs más recientes son mayores
        filteredAndSortedProducts.sort((a, b) => {
          // Si los IDs son numéricos
          if (!isNaN(Number(a.id)) && !isNaN(Number(b.id))) {
            return Number(b.id) - Number(a.id);
          }
          // Si los IDs son strings, comparamos lexicográficamente
          return b.id.localeCompare(a.id);
        });
        break;
      // Puedes añadir más casos de ordenación según necesites
    }

    setProducts(filteredAndSortedProducts);
  }, [initialProducts, sortBy, priceRange]);

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const handlePriceFilter = (min: string, max: string) => {
    setPriceRange({ min, max });
  };

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8">
      <div className="w-full lg:w-64 mb-6 lg:mb-0">
        <Filter 
          category={category}
          subcategory={subcategory}
          onSortChange={handleSortChange}
          onPriceFilter={handlePriceFilter}
        />
      </div>
      <div className="flex-1">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default InteractiveProductSection;