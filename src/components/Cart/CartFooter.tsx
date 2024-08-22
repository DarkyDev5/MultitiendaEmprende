'use client';

import { useCartContext } from '@/src/components/Cart/CartContext';
import Link from 'next/link';
import { Clock, Truck, Shield, Gift, Info, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/src/utils/formatUtils';

export default function CartFooter() {
  const { getTotal } = useCartContext();
  const total = getTotal();
  const freeShippingThreshold = 135000;
  const isCartEmpty = total === 0;

  if (isCartEmpty) {
    return (
      <div className="p-6 bg-white border-t border-gray-200 text-center">
        <ShoppingBag className="mx-auto mb-3 text-gray-400" size={48} />
        <h2 className="text-xl font-semibold mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-4">Agrega productos para solicitar una cotización</p>
        <Link href="/productos" className="inline-block py-2 px-4 bg-blue-600 text-white rounded text-sm font-semibold hover:bg-blue-700 transition-colors">
          Explorar productos
        </Link>
      </div>
    );
  }

  return (
    <div className="p-3 bg-white border-t border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold">Total estimado:</span>
        <span className="text-lg font-bold text-blue-600">{formatPrice(total)}</span>
      </div>
      
      <Link href="/cotizacion" className="block w-full py-2 px-3 bg-blue-600 text-white text-center rounded text-sm font-semibold mb-2 hover:bg-blue-700 transition-colors">
        Solicitar cotización personalizada
      </Link>
      
      {total >= freeShippingThreshold && (
        <div className="mb-2 p-1 bg-green-100 border border-green-300 rounded text-green-700 text-xs text-center">
          ¡Felicidades! Envío gratuito disponible
        </div>
      )}

      <div className="mb-2 text-xs">
        <h4 className="font-semibold mb-1">Beneficios:</h4>
        <ul className="space-y-1">
          {[
            { icon: Clock, text: 'Cotización válida por 7 días' },
            { icon: Truck, text: `Envío gratis +${formatPrice(freeShippingThreshold)}` },
            { icon: Shield, text: 'Garantía de 30 días' },
            { icon: Gift, text: 'Embalaje premium' },
          ].map((item, index) => (
            <li key={index} className="flex items-center">
              <item.icon size={12} className="mr-1 text-blue-500" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xxs text-gray-500 flex items-center justify-center mb-1">
        <Info size={10} className="mr-1" />
        <span>Cotización sujeta a disponibilidad.</span>
      </div>

      <div className="text-center">
        <Link href="/ayuda" className="text-xs text-blue-600 hover:underline">
          ¿Necesitas ayuda? Contáctanos
        </Link>
      </div>
    </div>
  );
}