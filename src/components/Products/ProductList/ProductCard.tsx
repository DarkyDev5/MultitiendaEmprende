'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useCartContext } from '@/src/components/Cart/CartContext';
import { ProductData } from '@/src/types/product';
import { useState } from 'react';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { formatPrice } from '@/src/utils/formatUtils';

interface ProductCardProps {
  product: ProductData;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, openCart } = useCartContext();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    openCart();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <CardContainer className="w-full max-w-sm mx-auto">
      <CardBody className="bg-white rounded-lg shadow-md overflow-hidden">
        <CardItem translateZ="50" className="w-full relative">
          <Link href={`/Productos/${product.category}/${product.subcategory}/${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              layout="responsive"
              objectFit="cover"
            />
          </Link>
          <button
            className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md"
            onClick={handleLike}
          >
            <Heart size={20} className={isLiked ? 'text-red-500' : 'text-gray-400'} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </CardItem>
        <div className="p-4">
          <CardItem translateZ="60" className="w-full">
            <Link href={`/Productos/${product.category}/${product.subcategory}/${product.id}`}>
              <h2 className="text-lg font-semibold text-gray-800 truncate hover:underline">
                {product.name}
              </h2>
            </Link>
          </CardItem>
          <CardItem translateZ="70" className="w-full mt-1">
            <p className="text-sm text-gray-500">
              Tecnología - Monitores
            </p>
          </CardItem>
          <CardItem translateZ="80" className="w-full mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} fill="currentColor" />
              ))}
              <span className="ml-1 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
            </div>
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
            </button>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}