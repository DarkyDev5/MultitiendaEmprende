import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { useCart } from "./CartContext";
import { Product } from "./types";

interface CardsProps {
  category: string;
  products: Product[];

  
}

function Cards({
  category,
  products,
}: CardsProps) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);

  // Detiene la propagación del evento clic para evitar el cierre cuando se hace clic dentro del carrito
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {products.map((product: Product) => (
          <div key={product.id} className="mb-6">
            <ProductCard
              product={product}
              category={category}
              subcategory={product.filter}
              onAddToCart={() => {
                addToCart(product);
                setCartOpen(true);
              }}
            />
          </div>
        ))}
      </div>

      {isCartOpen && (
        // Contenedor para detectar clics fuera del carrito
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

export default Cards;
