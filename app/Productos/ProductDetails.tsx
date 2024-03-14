// pages/Productos/[id]/page.tsx

import { useSearchParams, usePathname } from 'next/navigation'
import { categories, subcategories } from './allProducts'; // Asegúrate de importar correctamente tus productos
import { CartContext, useCart } from './CartContext';
import { useContext, useState } from 'react';
import { Product, DetailedProduct } from './types'
import Cart from './Cart'; // Asegúrate de importar el componente Cart

interface ProductPageProps {
  setCartOpen: (isOpen: boolean) => void;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [isCartOpen, setCartOpen] = useState(false);

  // Obtenemos el ID del producto de la URL
  const id = pathname.split("/").pop();



  // Buscamos el producto en todas las categorías y subcategorías
  let product: Product | DetailedProduct | null = null;
  for (const category in categories) {
    const foundProduct = categories[category].find((p) => p.id === id);
    if (foundProduct) {
      product = foundProduct;
      break;
    }
  }

  if (!product) {
    for (const category in subcategories) {
      for (const subcategory in subcategories[category]) {
        const foundProduct = subcategories[category][subcategory].find((p) => p.id === id);
        if (foundProduct) {
          product = foundProduct;
          break;
        }
      }
      if (product) break;
    }
  }

  // Si no encontramos el producto, mostramos un mensaje de error
  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  const stopPropagation = (event: { stopPropagation: () => any; }) => event.stopPropagation();

  // Si encontramos el producto, lo mostramos
  return (
    <div>
    <h1>{product.name}</h1>
    <p>Precio: ${product.price}</p>

    {'description' in product && <p>Descripción: {product.description}</p>}
    {'additionalInfo' in product && <p>Información adicional: {product.additionalInfo}</p>}
  

      <button
        onClick={() => {
          if (product) {
            addToCart(product);
            setCartOpen(true); // Esto abrirá el carrito
          }
        }}
        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Cotizar
      </button>
  
      {isCartOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setCartOpen(false)}>
          <div
            className="fixed top-0 right-0 p-4 z-50"
            onClick={stopPropagation}
          >
            <div className="bg-white border p-4 shadow-lg rounded-md">
              <Cart
                cartItems={cart}
                onClose={() => setCartOpen(false)}
                removeFromCart={removeFromCart}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
