// CartInterface.tsx
import React from 'react';
import Cart, { CartProps } from './Cart'; // Ajusta la ruta según la ubicación de tu componente Cart

interface CartInterfaceProps extends CartProps {
  onClose: () => void;
  // Puedes agregar otras props según sea necesario
}

const CartInterface: React.FC<CartInterfaceProps> = ({ onClose, cartItems, removeFromCart }) => {
  return (
    <div className="fixed top-0 bottom-0 right-0 z-10 w-full max-w-xl overflow-y-scroll bg-white dark:bg-gray-800">
      {/* Aquí puedes personalizar la interfaz del carrito */}
      <div className="p-6 bg-white md:pt-12 md:pb-6 md:px-12 dark:bg-gray-800">
        <Cart cartItems={cartItems} onClose={onClose} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
};

export default CartInterface;
