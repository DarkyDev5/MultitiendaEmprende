// types/product.ts
export interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ProductFormData {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  shortDescription: string;
  originalPrice: number;
  color?: string;
  category: string;
  subcategory: string;
  image: FileList | string | null;
  images?: FileList | string[] | null;
  fullDescription: string[];
  seller: string;
  hasStock: boolean;
  stock?: number | null;
}

export interface ProductData {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  subcategory: string;
  category: string;
  fullDescription: string[];
  shortDescription: string;
  originalPrice: number;
  color?: string;
  images: string[];
  seller: string;
  hasStock: boolean;
  stock?: number | null;
  createdAt?: string;
}

// Definición de categorías
export interface Category {
  [key: string]: string[];
}

export const categories: Category = {
  Tecnologia: ['Computadores', 'Monitores', 'Discos-Duros', 'Accesorios'],
  Cocina: ['Maquinas Obleas Trabajo Liviano', 'Maquinas Obleas Semi Industrial', 'Maquinas Pela Mangos', 'Electrodomésticos de Cocina'],
  Belleza: ['Maquillaje', 'Cremas'],
  Deportes: ['Proteinas'],
  Ofertas: ['']
};

// Cart Context
export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    subcategory: string;
    brand: string;
    seller: string;
  };
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;  
  addToCart: (product: ProductData, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  isInCart: (productId: string) => boolean;
  openCart: () => void;  
  closeCart: () => void;
  getTotal: () => number;
}