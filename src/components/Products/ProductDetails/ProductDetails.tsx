'use client'

import React, { useState, useEffect } from 'react';
import { ProductData } from '@/src/types/product';
import { useCartContext } from '@/src/components/Cart/CartContext';
import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import PurchaseOptions from './PurchaseOptions';
import FullDescription from './FullDescription';

interface ProductDetailsProps {
  product: ProductData;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { openCart } = useCartContext();
  const [allImages, setAllImages] = useState<string[]>([]);

  useEffect(() => {
    const validImages = [product.image, ...(product.images || [])].filter(img => img && img.trim() !== '');
    setAllImages(validImages);
  }, [product]);

  const handleAddToCart = () => {
    openCart();
  };

  const handleRequestQuote = () => {
    console.log("Solicitar cotización");
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Image Gallery */}
        <div className="w-full lg:w-2/5">
          {allImages.length > 0 && <ImageGallery images={allImages} />}
        </div>

        {/* Right Column - Product Information and Purchase Options */}
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Information */}
            <div className="w-full lg:w-2/3">
              <ProductInformation product={product} />
            </div>
            
            {/* Purchase Options */}
            <div className="w-full lg:w-1/3">
              <PurchaseOptions
                product={product}
                onAddToCart={handleAddToCart}
                onRequestQuote={handleRequestQuote}
              />
            </div>
          </div>

          {/* Full Description Section */}
          <div className="mt-8">
            <FullDescription description={product.fullDescription} />
          </div>
        </div>
      </div>
    </div>
  );
}