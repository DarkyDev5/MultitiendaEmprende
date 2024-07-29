import mongoose, { Schema, model, Model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
  rating: number;
  subcategory: string;
  category: string;
  fullDescription: string[];
  shortDescription: string;
  originalPrice: number;
  color: string;
  images: string[];
}

const productSchema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  subcategory: { type: String, required: true },
  category: { type: String, required: true },
  fullDescription: { type: [String], required: true },
  shortDescription: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  color: { type: String, required: true },
  images: { type: [String], required: true }
}, {
  timestamps: true
});

// Índices para mejorar el rendimiento de las consultas
productSchema.index({ id: 1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ name: 'text' });
const Product: Model<IProduct> = mongoose.models.Product || model<IProduct>('Product', productSchema);

export default Product;