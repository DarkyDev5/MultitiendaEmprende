import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Product';

export async function getProducts(category: string) {
  await dbConnect();
  const products = await Product.find({ category });
  return JSON.parse(JSON.stringify(products));
}

// Añade esta función para verificar los productos existentes
export async function getAllProducts() {
  await dbConnect();
  const products = await Product.find({});
  return JSON.parse(JSON.stringify(products));
}