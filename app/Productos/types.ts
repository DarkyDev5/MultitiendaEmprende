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
    description: string;
    additionalInfo: string;
  }


  export interface ProductInterface {
    id: string;
    category:string;
    name: string;
    price: number;
    image: string;
    rating: number;
    fullDescription: string;
    shortDescription: string;
    originalPrice: string;
    dimensions:string;
    weight:string;
    color:string;
    warranty:string
  }