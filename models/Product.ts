import mongoose, { Schema, model, Model, Document } from 'mongoose';

// Interfaz que extiende Document para incluir los campos de ProductFormData
export interface IProduct extends Document {
  id?: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  subcategory: string; // Cambiado de filter a subcategory
  category: string;
  fullDescription: string[];
  shortDescription: string;
  originalPrice: number;
  color: string;
  images: string[];
}

// Esquema de MongoDB que coincide con la interfaz IProduct
const productSchema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  subcategory: { type: String, required: true }, // Cambiado de filter a subcategory
  category: { type: String, required: true },
  fullDescription: { type: [String], required: true },
  shortDescription: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  color: { type: String, required: true },
  images: { type: [String], required: true }
}, {
  timestamps: true // Esto añadirá campos createdAt y updatedAt automáticamente
});

// Verificamos si el modelo ya existe para evitar recompilarlo
const Product: Model<IProduct> = mongoose.models.Product || model<IProduct>('Product', productSchema);

export default Product;