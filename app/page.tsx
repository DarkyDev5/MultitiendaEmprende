import React from 'react';
import SliderOne from "@/src/components/Home/Sliders/SliderOne";
import SliderTwo from "@/src/components/Home/Sliders/SliderTwo";
import ProductsSection from "@/src/components/Home/ProductsSection";
import CategoriesSection from "@/src/components/Home/CategoriesSection";
import SliderThree from "@/src/components/Home/Sliders/SliderThree";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página de Inicio - Tu Tienda Online',
  description: 'Bienvenido a nuestra tienda en línea. Encuentra los mejores productos a los mejores precios.',
};

export default function Home() {
  return (
    <div className="flex flex-col ">
      <SliderOne />

      <div className='my-10'>
      <SliderTwo  />
      </div>
      
      <ProductsSection />
      <CategoriesSection />
      <SliderThree />
    </div>
  );
}
