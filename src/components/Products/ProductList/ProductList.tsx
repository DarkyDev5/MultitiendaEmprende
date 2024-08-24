import React from 'react';
import { ProductData } from "@/src/types/product";
import ProductCard from './ProductCard';

interface ProductListProps {
  products: ProductData[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;