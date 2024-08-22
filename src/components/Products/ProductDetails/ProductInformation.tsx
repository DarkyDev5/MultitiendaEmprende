'use client'

import React from 'react'
import Link from 'next/link'
import { ProductData } from '@/src/types/product'
import { Star, Share2, Heart, ShoppingCart, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPrice } from '@/src/utils/formatUtils'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductInformationProps {
  product: ProductData
}

export default function ProductInformation({ product }: ProductInformationProps) {
  const [quantity, setQuantity] = React.useState(1)

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => {
      const newQuantity = prev + change;
      const maxQuantity = typeof product.stock === 'number' ? product.stock : Infinity;
      return Math.max(1, Math.min(newQuantity, maxQuantity));
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
        <CardDescription>
          <Link href={`/categoria/${product.category}`} className="text-sm text-blue-600 hover:underline">
            {product.category} &gt; {product.subcategory}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-600">
            {product.rating.toFixed(1)} ({product.reviewCount || 0} calificaciones)
          </span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}% OFF
                </Badge>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger>Descripción</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-700">{product.shortDescription}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="specifications">
            <AccordionTrigger>Especificaciones</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="font-medium">Marca:</span> {product.brand}</li>
                <li><span className="font-medium">Color:</span> {product.color || 'No especificado'}</li>
                <li><span className="font-medium">Vendedor:</span> {product.seller}</li>
                <li><span className="font-medium">Stock:</span> {typeof product.stock === 'number' ? `${product.stock} unidades` : 'Sujeto a Disponibilidad'}</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter className="flex justify-between">
        <span className="text-sm text-gray-600">Compartir este producto:</span>
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compartir producto</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Añadir a favoritos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}