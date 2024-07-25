'use client'

import { SessionProvider } from "next-auth/react"
import { CartProvider } from './components/Cart/CartContext'  // Asegúrate de que esta ruta de importación sea correcta

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  )
}