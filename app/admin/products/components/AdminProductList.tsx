'use client';

import React, { useState, useEffect } from 'react';
import { ProductData } from '@/src/types/product';
import Image from 'next/image';
import Link from 'next/link';

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
        <div key={product.id} className="border p-4 rounded-lg shadow-md">
          <div className="relative h-40 w-full mb-2">
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-1">ID: {product.id}</p>
          <p className="font-medium mb-1">Marca: {product.brand || 'N/A'}</p>
          <p className="mb-1">Precio: ${product.price.toFixed(2)}</p>
          <p className="mb-1">Categoría: {product.category}</p>
          <p className="mb-1">Subcategoría: {product.subcategory}</p>
          <div className="text-sm text-gray-600"> {product.hasStock ? `Stock: ${product.stock}` : 'Sin stock'} </div>
          <p className="mb-1">Vendedor: {product.seller || 'N/A'}</p>
          <p className="text-sm mb-2">{product.shortDescription}</p>
          <div className="flex justify-between mt-4">
            <Link href={`/admin/products/edit/${product.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Editar
              </button>
            </Link>
            <button
              onClick={() => deleteProduct(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}