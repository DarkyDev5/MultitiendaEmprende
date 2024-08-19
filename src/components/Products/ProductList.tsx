"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductData } from "@/src/types/product";
import {
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { useCartContext } from "@/src/components/Cart/CartContext";

interface ProductListProps {
  products: ProductData[];
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function ProductList({ products }: ProductListProps) {
  const { addToCart, isInCart, openCart } = useCartContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (product: ProductData) => {
    addToCart(product);
    openCart();
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl w-full max-w-sm mx-auto"
          >
            <Link
              href={`/Productos/${product.category}/${product.subcategory}/${product.id}`}
              className="block"
            >
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                {product.originalPrice > product.price && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {(
                      (1 - product.price / product.originalPrice) *
                      100
                    ).toFixed(0)}
                    % OFF
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 h-14 line-clamp-2">
                {product.name}
              </h2>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-600">
                  ({product.rating.toFixed(1)})
                </span>
              </div>
              <div className="flex items-end space-x-2 mb-4">
                <span className="text-2xl font-bold text-gray-800">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Link
                  href={`/Productos/${product.category}/${product.subcategory}/${product.id}`}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Ver detalles
                </Link>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
                    <HeartIcon className="h-6 w-6 text-gray-600" />
                  </button>
                  <button
                    className={`p-2 rounded-full ${
                      isClient && isInCart(product.id)
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-600"
                    } hover:bg-green-600 hover:text-white transition-colors duration-200`}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;