import React from 'react';
import { ProductData } from '@/src/types/product';
import { notFound } from 'next/navigation';
import ProductDetails from '@/src/components/Products/ProductDetails/ProductDetails';
import { encodeUrlParam } from '@/src/utils/urlUtils';


async function getProductDetails(category: string, subcategory: string, id: string): Promise<ProductData | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?category=${encodeUrlParam(category)}&subcategory=${encodeUrlParam(subcategory)}&id=${encodeUrlParam(id)}`;
 
  console.log('Fetching product from:', url);
  try {
    const res = await fetch(url, { next: { revalidate: 0 } });
   
    if (!res.ok) {
      console.error('API response not ok:', res.status, res.statusText);
      throw new Error(`API responded with status: ${res.status}`);
    }
    const products = await res.json();
    console.log('API response:', products);
    if (!Array.isArray(products) || products.length === 0) {
      console.log('No products found');
      return null;
    }
    return products[0];
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
}

export default async function ProductDetailsPage({
  params
}: {
  params: { category: string; subcategory: string; id: string }
}) {
  try {
    const product = await getProductDetails(params.category, params.subcategory, params.id);
    if (!product) {
      notFound();
    }
    return (
      <div className="w-full">
        <ProductDetails product={product} />
      </div>
    );
  } catch (error) {
    console.error('Error in ProductDetailsPage:', error);
    return <div>Error: Unable to load product details. Please try again later.</div>;
  }
}