import React from "react";
import { Product } from "./types";
import { formatCurrency } from "./PrecioCards";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full transition-shadow duration-500 ease-in-out hover:shadow-2xl">
      <div className="h-[280px] relative overflow-hidden p-20">
        <Image
          src={product.image}
          alt={`Imagen del producto ${product.name}`}
          layout="fill"
          
          className="rounded-lg"
        />
      </div>

      <div className="flex-grow p-5 flex flex-col">
        <a href="#" className="flex-grow line-clamp-2">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white   ">
            {product.name}
          </h5>
        </a>
        <div className="flex items-center mt-3 mb-2">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5).keys()].map((index) => (
              <svg
                key={index}
                className={`w-4 h-4 text-${
                  index < product.rating ? "yellow" : "gray"
                }-500 `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
