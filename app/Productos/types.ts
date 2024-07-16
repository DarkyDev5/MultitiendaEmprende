export interface Product {
    
    id: string;
    name: string;
    price: number;
    filter: string;
    image: string;
    rating: number;
    category: string;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }

  export interface DetailedProduct extends Product {
    fullDescription: string[];
    shortDescription: string;
    originalPrice: number;
    color: string;
    images: string[];
  }
  

