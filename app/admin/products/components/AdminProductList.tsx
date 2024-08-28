import React, { useState, useEffect } from 'react';
import { ProductData } from '@/src/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminProductList() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getImageSrc = (image: string | File | null): string => {
    if (!image) return '/placeholder.jpg';
    if (typeof image === 'string' && image.startsWith('http')) return image;
    return '/placeholder.jpg';
  };

  if (isLoading) return <div>Cargando productos...</div>;
  if (!products.length) return <div>No se encontraron productos.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-md">
          <div className="relative h-40 w-full mb-2">
            <Image
              src={getImageSrc(product.image)}
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
          <div className="text-sm text-gray-600">
            {product.hasStock ? `Stock: ${product.stock}` : 'Sin stock'}
          </div>
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