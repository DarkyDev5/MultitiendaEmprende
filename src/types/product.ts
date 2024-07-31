// types/product.ts

// Esta interfaz se usa para el formulario de ingreso de productos
export interface ProductFormData {
  id: string;
  name: string;
  price: number;
  rating: number;
  shortDescription: string;
  originalPrice: number;
  color: string;
  category: string;
  subcategory: string;
  image: FileList | null;
  images: FileList | null;
  fullDescription: string;
}
// Esta interfaz se usa para los productos que se muestran en la lista
export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;  // URL de la imagen como string
  rating: number;
  subcategory: string;
  category: string;
  fullDescription: string[];
  shortDescription: string;
  originalPrice: number;
  color: string;
  images: string[];  // Array de URLs de imágenes como strings
  createdAt?: string; 
}

// Definición de categorías (si la necesitas)
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