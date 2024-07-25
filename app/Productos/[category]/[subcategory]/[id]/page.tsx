import React from 'react';
import { ProductData } from '@/types/product';
import { notFound } from 'next/navigation';
import ProductDetails from '../../../../components/Products/ProductDetails';

async function getProductDetails(category: string, subcategory: string, id: string): Promise<ProductData | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?category=${category}&filter=${subcategory}&id=${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    const products = await res.json();
    return products.find((product: ProductData) => product.id === id) || null;
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
}

export default async function ProductDetailsPage({ 
  params 
}: { 
  params: { category: string; subcategory: string; id: string } 
}) {
  const product = await getProductDetails(params.category, params.subcategory, params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{params.category} - {params.subcategory}</h1>
      <ProductDetails product={product} />
    </div>
  );
}