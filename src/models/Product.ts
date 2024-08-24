import mongoose, { Schema, model, Model, Document } from 'mongoose';

interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  category: string;
  subcategory: string;
  fullDescription: string[];
  shortDescription: string;
  originalPrice: number;
  color?: string;
  seller: string;
  hasStock: boolean;
  stock: number | null;
}

const reviewSchema = new Schema<Review>({
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const productSchema = new Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: { type: [String], required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewCount: { type: Number, default: 0 },
  reviews: [reviewSchema],
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  fullDescription: { type: [String], required: true },
  shortDescription: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  color: { type: String, required: false },
  seller: { type: String, required: true },
  hasStock: { type: Boolean, default: false },
  stock: { type: Number, default: null },
}, {
  timestamps: true
});

productSchema.index({ id: 1 });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ name: 'text', brand: 'text' });

const Product: Model<IProduct> = mongoose.models.Product || model<IProduct>('Product', productSchema);

export default Product;