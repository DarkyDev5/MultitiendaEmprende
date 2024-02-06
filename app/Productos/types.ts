export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    filter: string; 
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }