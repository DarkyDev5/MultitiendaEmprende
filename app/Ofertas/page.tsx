import React from 'react';
import ProductList from '../components/Products/ProductList';

async function getOfferProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?category=Ofertas`);
  if (!res.ok) throw new Error('Failed to fetch offer products');
  return res.json();
}

export default async function OfertasPage() {
  const products = await getOfferProducts();

  return (
    <div>
      <h1>Ofertas</h1>
      <ProductList products={products} />
    </div>
  );
}