'use client';

import React, { useState, useEffect } from 'react';
import { ProductData } from '@/types/product';
import { SafeImage } from '../../components/Admin/SafeImage';

export default function AdminProductList() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching products...');
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('Products fetched:', data);
        setProducts(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const deleteProduct = async (productId: string) => {
    try {
      console.log('Deleting product with ID:', productId);
      const response = await fetch(`/api/admin/products/${productId}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Delete response:', response);
  
      if (response.ok) {
        console.log('Product deleted successfully');
        setProducts(prev => prev.filter(p => p.id !== productId));
      } else {
        const errorText = await response.text();
        console.error('Failed to delete product:', errorText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading) return <div>Cargando productos...</div>;
  if (!products.length) return <div>No se encontraron productos.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p>Precio: ${product.price.toFixed(2)}</p>
          <p>Categoría: {product.category}</p>
          <p>Subcategoría: {product.subcategory}</p>
          <div className="relative h-40 w-full mb-2">
            <SafeImage src={product.image} alt={product.name} />
          </div>
          <p className="text-sm mb-2">{product.shortDescription}</p>
          <button 
            onClick={() => deleteProduct(product.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}