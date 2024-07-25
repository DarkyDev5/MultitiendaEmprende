"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductData } from '@/types/product';
import { StarIcon, ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useCart } from '../Cart/CartContext';

interface ProductDetailsProps {
  product: ProductData;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { addToCart, isInCart, openCart } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = () => {
    addToCart(product);
    openCart();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Imágenes del producto */}
            <div className="space-y-4">
              <div 
                className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg cursor-zoom-in"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className={`transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[product.image, ...product.images].map((img, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-w-1 aspect-h-1 cursor-pointer group"
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - imagen ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Detalles del producto */}
            <div className="space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>
              </div>
              <div className="border-t border-b py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                {product.originalPrice > product.price && (
                  <p className="text-sm text-green-600 mt-1">
                    Ahorras {formatPrice(product.originalPrice - product.price)} ({((1 - product.price / product.originalPrice) * 100).toFixed(0)}%)
                  </p>
                )}
              </div>
              <p className="text-gray-700">{product.shortDescription}</p>
              <div>
                <h2 className="text-xl font-semibold mb-2">Características principales</h2>
                <ul className="list-disc list-inside space-y-1">
                  {product.fullDescription.map((desc, index) => (
                    <li key={index} className="text-gray-700">{desc}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p className="text-gray-700"><span className="font-semibold">Color:</span> {product.color}</p>
                <p className="text-gray-700">
                  <span className="font-semibold">Categoría:</span>{' '}
                  <Link href={`/Productos/${product.category}`} className="text-blue-600 hover:underline">
                    {product.category}
                  </Link>
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Subcategoría:</span>{' '}
                  <Link href={`/Productos/${product.category}/${product.subcategory}`} className="text-blue-600 hover:underline">
                    {product.subcategory}
                  </Link>
                </p>
              </div>
              <div className="space-y-3">
                <button 
                  className={`w-full py-3 px-6 rounded-full font-semibold flex items-center justify-center transition duration-300 transform hover:scale-105 ${
                    isClient && isInCart(product.id)
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  {isClient && isInCart(product.id) ? "Añadir otro al carrito" : "Añadir al carrito"}
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 rounded-full font-semibold flex items-center justify-center transition duration-300 hover:bg-gray-50 transform hover:scale-105">
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Añadir a la lista de deseos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}