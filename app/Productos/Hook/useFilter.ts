// useFilter.ts
import { useState } from 'react';

export const useFilter = (initialData: any[]) => {

  const [data, setData] = useState(initialData);

  //Filtrado DE PRECIOS MIN MAX

  const filterData = (minPrice: number, maxPrice: number, selectedOption: string | null) => {
    let newData = initialData;

    // Filtrar por precio
    if (minPrice && maxPrice) {
      newData = newData.filter(item => item.price >= minPrice && item.price <= maxPrice);
    }

    // Filtrar por opción seleccionada
    if (selectedOption) {
      newData = newData.filter(item => item.filter === selectedOption);
    }

    setData(newData);
  };

// FILTRADO DE MAYOR A MENIR Y DE MENOR A MAYOR
  const sortData = (direction: 'asc' | 'desc') => {
    const sortedData = [...data].sort((a, b) => {
      if (direction === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setData(sortedData);
  };

  return { data, filterData, sortData };
};

