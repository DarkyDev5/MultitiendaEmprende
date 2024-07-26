// app/[category]/[subcategory]/page.tsx

import React from 'react';
import { ProductData } from '@/types/product';
import Navbar from '../../../../components/MainPage/Navbar';
import Footer from '../../../../components/MainPage/Footer';
import InteractiveProductSection from '../../../../components/Products/InteractiveProductSection';
async function getProducts(category: string, subcategory: string): Promise<ProductData[]> {
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?category=${category}&subcategory=${subcategory}&t=${Date.now()}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function SubcategoryPage({ params }: { params: { category: string, subcategory: string } }) {
  const products = await getProducts(params.category, params.subcategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <InteractiveProductSection 
            category={params.category}
            subcategory={params.subcategory}
            initialProducts={products}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}