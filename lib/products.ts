import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function getProducts(category: string) {
  await dbConnect();
  const products = await Product.find({ category });
  return JSON.parse(JSON.stringify(products));
}