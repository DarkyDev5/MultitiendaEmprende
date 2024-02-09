import { useState, ReactNode } from 'react';
import clsx from 'clsx';

interface FilterProps {
  children: ReactNode;
  pageTitle: string;
  onFilter: (minPrice: number, maxPrice: number, selectedOption: string | null) => void;
  onSort: (direction: 'asc' | 'desc') => void;

}

export const Filter: React.FC<FilterProps> = ({ children, pageTitle, onFilter, onSort }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterClick = (filter: string) => {
    setSelectedOption(filter);
  
    if (filter === 'priceLowToHigh') {
      onSort('asc');
    } else if (filter === 'priceHighToLow') {
      onSort('desc');
    }
  };

  const handleGoClick = () => {
    onFilter(Number(minPrice), Number(maxPrice), selectedOption);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full bg-gradient-to-r from-blue-200 to-blue-100 p-5 rounded-lg shadow-lg">
    <div className="w-full md:w-1/4 flex flex-col space-y-2 bg-white shadow p-4 rounded-lg">
      <h1 className="text-4xl font-bold text-blue-700 mb-4 border-b border-blue-200 pb-2">{pageTitle}</h1>
      <h2 className="text-2xl font-semibold text-blue-700 mb-4 mt-4">Categoría</h2>
      <button onClick={() => handleFilterClick('mostPopular')} className={clsx('w-full text-left p-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300', selectedOption === 'mostPopular' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700')}>Más Populares</button>
      <button onClick={() => handleFilterClick('bestRating')} className={clsx('w-full text-left p-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300', selectedOption === 'bestRating' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700')}>Mejor Calificados</button>
      <button onClick={() => handleFilterClick('newest')} className={clsx('w-full text-left p-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300', selectedOption === 'newest' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700')}>Más Recientes</button>
      <button onClick={() => handleFilterClick('priceLowToHigh')} className={clsx('w-full text-left p-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300', selectedOption === 'priceLowToHigh' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700')}>Precio: Bajo a Alto</button>
      <button onClick={() => handleFilterClick('priceHighToLow')} className={clsx('w-full text-left p-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300', selectedOption === 'priceHighToLow' ? 'bg-blue-500 text-white' : 'bg-white text-blue-700')}>Precio: Alto a Bajo</button>
  
      <div className="mt-4 flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Precio:</label>
        <input type="text" placeholder="Mín" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="p-2 border border-gray-300 rounded w-20" />
        <input type="text" placeholder="Máx" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="p-2 border border-gray-300 rounded w-20" />
        <button onClick={handleGoClick} className="p-2 bg-blue-500 text-white rounded">Ir</button>
      </div>
    </div>
  
      
      <div className="w-full md:w-3/4 bg-white shadow p-4 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Filter;
