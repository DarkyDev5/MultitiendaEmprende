import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/src/components/Layout/Navbar'
import Footer from '@/src/components/Layout/Footer'
import CartModal from '@/src/components/Cart/CartModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tu Tienda Online',
  description: 'La mejor tienda para tus compras en línea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow w-full py-8"> 
              {children}
            </main>
            <Footer />
          </div>
          <CartModal />
        </Providers>
      </body>
    </html>
  )
}
