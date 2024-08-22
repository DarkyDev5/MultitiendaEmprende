'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCartContext } from '@/src/components/Cart/CartContext'
import { ProductData } from '@/src/types/product'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, FileText, Truck, Package, Clock } from 'lucide-react'
import { formatPrice } from '@/src/utils/formatUtils'

interface PurchaseOptionsProps {
  product: ProductData
  onAddToCart: () => void
  onRequestQuote: () => void
}

const PurchaseOptions = ({
  product,
  onAddToCart,
  onRequestQuote
}: PurchaseOptionsProps) => {
  const [quantity, setQuantity] = useState(1)
  const { isInCart } = useCartContext()

  const handleQuantityChange = (value: number) => {
    const maxQuantity = typeof product.stock === 'number' ? product.stock : Infinity;
    setQuantity(Math.max(1, Math.min(value, maxQuantity)))
  }

  const savings = product.originalPrice - product.price
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100)

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="relative">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 mr-2">{formatPrice(product.price)}</span>
            <div className="absolute right-0 top-0 bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
              {savingsPercentage}% OFF
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 line-through mr-2">{formatPrice(product.originalPrice)}</span>
            <span className="text-green-600 font-medium">Ahorras {formatPrice(savings)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Cantidad:</span>
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="px-2"
            >
              -
            </Button>
            <Input
              type="number"
              min="1"
              max={typeof product.stock === 'number' ? product.stock : undefined}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-12 text-center border-0"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={typeof product.stock === 'number' && quantity >= product.stock}
              className="px-2"
            >
              +
            </Button> 
          </div>
        </div>

        <Button 
          variant="default" 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 text-lg"
          onClick={onAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isInCart(product.id) ? 'Actualizar carrito' : 'Agregar al Carrito'}
        </Button>

        <Button 
          variant="outline" 
          className="w-full border hover:bg-gray-50"
          onClick={onRequestQuote}
        >
          <FileText className="mr-2 h-4 w-4" />
          Solicitar cotización
        </Button>

        <div className="space-y-2 text-sm">
          <div className="flex items-center text-blue-600">
            <Truck className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Envío GRATIS disponible</span>
          </div>
          <div className="flex items-center text-green-600">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>Entrega estimada: 3-5 días hábiles</span>
          </div>
          <div className="flex items-center text-orange-600">
            <Package className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{typeof product.stock === 'number' ? `Stock: ${product.stock} unidades` : 'Stock sujeto a disponibilidad'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PurchaseOptions