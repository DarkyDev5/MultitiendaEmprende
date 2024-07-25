// pages/Productos/[id]/page.tsx

import { useSearchParams, usePathname } from "next/navigation";
import { categories } from "./allProducts"; // Asegúrate de importar correctamente tus productos
import { CartContext, useCart } from "./CartContext";
import { useContext, useState } from "react";
import { Product, DetailedProduct } from "../components/Products/types";
import Cart from "./Cart"; // Asegúrate de importar el componente Cart

interface ProductPageProps {
  setCartOpen: (isOpen: boolean) => void;
}

export default function ProductPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [isCartOpen, setCartOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Obtenemos el ID del producto de la URL
  const id = pathname.split("/").pop();

  // Buscamos el producto en todas las categorías
  let product: Product | DetailedProduct | null = null;
  for (const category in categories) {
    const foundProduct = categories[category].find((p) => p.id === id);
    if (foundProduct) {
      product = foundProduct;
      break;
    }
  }

  // Si no encontramos el producto, mostramos un mensaje de error
  if (!product) {
    return <div>No se encontró el producto.</div>;
  }
  const stopPropagation = (event: { stopPropagation: () => any }) =>
    event.stopPropagation();

  // Si encontramos el producto, lo mostramos
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-12 rounded-2xl shadow-xl mx-auto mt-12 max-w-8xl overflow-hidden">
      <div className="flex flex-col lg:flex-row-reverse lg:items-start lg:space-x-reverse lg:space-x-14">
        <div className="w-full lg:w-1/2 xl:w-3/5 mt-8 lg:mt-0">
          <h1 className="text-5xl font-semibold text-gray-900 mb-6">
            {product.name}
          </h1>
          <p className="text-3xl text-blue-600">Precio: ${product.price}</p>
          {"originalPrice" in product && (
            <div className="mt-4">
              <p className="text-2xl">
                <span className="line-through text-gray-400">
                  Precio original: ${product.originalPrice}
                </span>
              </p>
            </div>
          )}
          {"color" in product && (
            <p className="mt-6 text-2xl">
              Color: <span className="text-gray-700">{product.color}</span>
            </p>
          )}
          {"shortDescription" in product && (
            <p className="mt-6 text-gray-700 text-2xl">
              {product.shortDescription}
            </p>
          )}
          <div className="mt-10">
            <button
              onClick={() => {
                if (product) {
                  addToCart(product);
                }
                setCartOpen(true); // Abre el carrito
              }}
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-4 px-10 rounded-full text-3xl transition-all duration-300 ease-in-out shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col items-center lg:items-end">
          {"images" in product && (
            <img
              src={product.images[0]}
              alt={`Imagen principal de ${product.name}`}
              className="w-full h-auto object-contain rounded-lg shadow-lg mb-4"
              style={{ maxHeight: "600px" }}
            />
          )}
          {"images" in product && (
            <div className="flex overflow-x-auto no-scrollbar space-x-4 mt-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagen ${index}`}
                  className="w-28 h-28 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {("fullDescription" in product) && (
  <div className="mt-12 text-gray-600 text-2xl">
    <h2 className="text-4xl font-semibold text-gray-900 mb-4">
      Descripción completa:
    </h2>
    <ul>
      {product.fullDescription.map((item, index) => (
        item && (
          <li key={index} className="mb-2">
            {item.trim().length > 0 ? (item.startsWith("- ") ? item : `• ${item}`) : null}
          </li>
        )
      ))}
    </ul>
  </div>
)}





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
