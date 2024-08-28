import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  shortDescription: string;
  originalPrice?: number;
  color?: string;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  fullDescription: string[];
  seller: string;
  hasStock: boolean;
  stock?: number;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  shortDescription: { type: String, required: true },
  originalPrice: { type: Number },
  color: { type: String },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  fullDescription: [{ type: String }],
  seller: { type: String, required: true },
  hasStock: { type: Boolean, required: true },
  stock: { type: Number },
}, { timestamps: true });


ProductSchema.index({ id: 1 }, { unique: true });

export default mongoose.models.Product as mongoose.Model<IProduct> || mongoose.model<IProduct>('Product', ProductSchema);