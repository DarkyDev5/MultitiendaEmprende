// @/src/components/Cart/CartCounter.tsx
import { useCartContext } from "@/src/components/Cart/CartContext";

export const CartCounter = () => {
  const { getItemCount } = useCartContext();
  return (
    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
      {getItemCount()}
    </span>
  );
};
